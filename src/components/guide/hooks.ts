"use client";

import { useEffect, useRef, useState } from "react";
import { talkDetector } from "@/lib/voice/talk";

/** Keeps the screen on while building. */
export function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active || typeof navigator === "undefined" || !("wakeLock" in navigator)) return;
    let lock: WakeLockSentinel | null = null;
    let cancelled = false;
    const get = async () => {
      try {
        lock = await navigator.wakeLock.request("screen");
        if (cancelled) lock.release();
      } catch {
        /* denied or unsupported */
      }
    };
    get();
    const onVis = () => {
      if (document.visibilityState === "visible" && !cancelled) get();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVis);
      lock?.release().catch(() => {});
    };
  }, [active]);
}

interface SR {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(track?: MediaStreamTrack): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>; resultIndex: number }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onstart: (() => void) | null;
}

type SRCtor = (new () => SR) & { available?: unknown };

export function speechSupported() {
  if (typeof window === "undefined") return false;
  const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

/**
 * Desktop Chrome and Edge can listen through a mic the page opens itself, with
 * echo cancelling on, so the voice playing from the same speakers is taken out
 * before the recognizer hears it. `available` arrived alongside, so it marks
 * a browser new enough; Android's recognizer opens its own mic.
 */
function takesTrack(Ctor: SRCtor) {
  return typeof Ctor.available === "function" && !!navigator.mediaDevices?.getUserMedia && !/Android/i.test(navigator.userAgent);
}

/** Calls onTalk when someone starts or stops talking into the stream. `her` says whether the voice is playing. */
function watchLevel(stream: MediaStream, her: () => boolean, onTalk: (on: boolean) => void) {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return () => {};
  const ac = new Ctx();
  const an = ac.createAnalyser();
  an.fftSize = 2048;
  ac.createMediaStreamSource(stream).connect(an);
  const buf = new Float32Array(an.fftSize);
  const talk = talkDetector();
  let on = false;
  const iv = setInterval(() => {
    if (ac.state === "suspended") ac.resume().catch(() => {});
    an.getFloatTimeDomainData(buf);
    let e = 0;
    for (const v of buf) e += v * v;
    const now = talk(10 * Math.log10(e / buf.length + 1e-10), her());
    if (now !== on) onTalk((on = now));
  }, 50);
  return () => {
    clearInterval(iv);
    ac.close().catch(() => {});
    if (on) onTalk(false);
  };
}

export type Mic = "off" | "starting" | "on" | "denied" | "unsupported";

/** What onPhrase made of the transcript: the words it acted on, a command it waits to hear settle, or nothing. */
export type PhraseResult = { act: string } | { wait: string } | null;

/**
 * Keeps the mic listening while voice mode is on. onPhrase sees the whole
 * transcript of the current session as it grows: "interim" while words are
 * still coming, "settled" when an interim stayed the same for a moment, and
 * "final". Once it acts, listening starts over, so nothing is acted on twice.
 * `from` is the first word it hasn't seen yet. `talking` is true while
 * someone speaks into the mic (only where the page opens the mic itself);
 * `her` says whether the voice is playing, so her echo isn't taken for them.
 */
export function useListener(enabled: boolean, onPhrase: (text: string, state: "interim" | "settled" | "final", from: number) => PhraseResult, her: () => boolean = () => false) {
  const cb = useRef(onPhrase);
  const herRef = useRef(her);
  useEffect(() => {
    cb.current = onPhrase;
    herRef.current = her;
  });
  const [mic, setMic] = useState<Mic>("off");
  const [heard, setHeard] = useState("");
  const [talking, setTalking] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    // on-device recognition (SpeechRecognition.available, processLocally) is left out on purpose:
    // asking the browser whether it has a local model crashed the whole tab in Chromium
    const w = window as unknown as { SpeechRecognition?: SRCtor; webkitSpeechRecognition?: SRCtor };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    let stop = false;
    let rec: SR | null = null;
    let fails = 0;
    let again = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let clear: ReturnType<typeof setTimeout> | undefined;
    let settle: ReturnType<typeof setTimeout> | undefined;
    let waiting = "";
    let useTrack = takesTrack(Ctor);
    let stream: MediaStream | null = null;
    let unwatch = () => {};
    let seen = 0;
    let opening = false;
    const hidden = () => document.visibilityState === "hidden";

    const release = () => {
      unwatch();
      unwatch = () => {};
      stream?.getTracks().forEach((t) => t.stop());
      stream = null;
    };

    const acted = (words: string) => {
      setHeard(words);
      clearTimeout(clear);
      clear = setTimeout(() => setHeard(""), 2400);
      // a clean slate: the recognizer can rewrite earlier words, which must not count twice
      again = true;
      rec?.abort();
    };

    const open = async () => {
      if (!useTrack || stream) return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false } });
        if (stop) return release();
        unwatch = watchLevel(stream, () => herRef.current(), setTalking);
      } catch (e) {
        if ((e as Error).name === "NotAllowedError" || (e as Error).name === "SecurityError") {
          stop = true;
          setMic("denied");
        } else useTrack = false;
      }
    };

    const start = async () => {
      if (stop || opening || hidden()) return;
      opening = true;
      await open();
      opening = false;
      if (stop || rec || hidden()) return;
      seen = 0;
      const r = new Ctor();
      rec = r;
      r.continuous = true;
      r.interimResults = true;
      r.lang = "en-US";
      r.onstart = () => {
        fails = 0;
        setMic("on");
      };
      r.onresult = (e) => {
        if (rec !== r) return;
        let text = "";
        for (let i = 0; i < e.results.length; i++) text += " " + e.results[i][0].transcript;
        text = text.trim();
        if (!text) return;
        const final = e.results[e.results.length - 1].isFinal;
        const from = Math.max(0, seen - 3);
        seen = Math.max(seen, text.split(/\s+/).length);
        const got = cb.current(text, final ? "final" : "interim", from);
        const settled = () => {
          clearTimeout(settle);
          waiting = "";
          const late = cb.current(text, "settled", from);
          if (late && "act" in late) acted(late.act);
        };
        if (got && "wait" in got) {
          // the same command twice in a row is settled; otherwise give it a moment for more words.
          // her echo can rewrite a word away within half a second, so the clock isn't restarted
          if (got.wait === waiting) settled();
          else {
            clearTimeout(settle);
            waiting = got.wait;
            settle = setTimeout(() => rec === r && settled(), 280);
          }
          return;
        }
        clearTimeout(settle);
        waiting = "";
        if (got) acted(got.act);
      };
      r.onend = () => {
        if (rec === r) rec = null;
        clearTimeout(settle);
        waiting = "";
        if (stop) return;
        // straight back after a command; quick restarts are normal too, but back off if it keeps failing
        timer = setTimeout(start, again ? 0 : Math.min(4000, 250 * 2 ** fails));
        again = false;
      };
      r.onerror = (e) => {
        // a busy mic (a call, another app) is temporary: only a refusal, or a mic that stays busy, ends listening
        if (e.error === "not-allowed" || e.error === "service-not-allowed" || (e.error === "audio-capture" && fails >= 4)) {
          stop = true;
          setMic("denied");
        } else if (e.error === "network" && fails >= 2) {
          // the speech service is out of reach (no signal, or a browser without one): stop, and say to tap instead
          stop = true;
          setMic("unsupported");
        } else if (e.error !== "no-speech" && e.error !== "aborted") {
          fails++;
          // a recognizer that won't take the page's mic opens its own instead
          if (useTrack && (e.error === "audio-capture" || e.error === "bad-grammar" || e.error === "language-not-supported")) {
            useTrack = false;
            release();
          }
        }
      };
      setMic((m) => (m === "on" ? m : "starting"));
      try {
        const track = stream?.getAudioTracks()[0];
        if (useTrack && track?.readyState === "live") r.start(track);
        else r.start();
      } catch {
        // already started; or a browser that can't listen to a track, which listens on its own mic instead
        if (useTrack) {
          useTrack = false;
          release();
          rec = null;
          timer = setTimeout(start, 0);
        }
      }
    };
    const onVis = () => {
      if (hidden()) {
        rec?.abort();
        release();
      } else if (!rec) start();
    };
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => {
      stop = true;
      clearTimeout(timer);
      clearTimeout(clear);
      clearTimeout(settle);
      document.removeEventListener("visibilitychange", onVis);
      rec?.abort();
      release();
      setTalking(false);
    };
  }, [enabled]);

  if (!enabled) return { mic: "off" as Mic, heard: "", talking: false };
  return { mic: speechSupported() ? mic : ("unsupported" as Mic), heard, talking };
}

export function haptic(ms = 8) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}
