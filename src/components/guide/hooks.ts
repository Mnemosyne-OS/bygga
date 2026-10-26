"use client";

import { useEffect, useRef, useState } from "react";

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
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>; resultIndex: number }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onstart: (() => void) | null;
}

export function speechSupported() {
  if (typeof window === "undefined") return false;
  const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

export type Mic = "off" | "starting" | "on" | "denied" | "unsupported";

/**
 * Keeps the mic listening while voice mode is on. Phrases go to onPhrase while
 * they are still being spoken and again when complete; once onPhrase returns
 * true it has acted, and the rest of that phrase is ignored.
 */
export function useListener(enabled: boolean, onPhrase: (text: string, final: boolean) => boolean) {
  const cb = useRef(onPhrase);
  useEffect(() => {
    cb.current = onPhrase;
  });
  const [mic, setMic] = useState<Mic>("off");
  const [heard, setHeard] = useState("");

  useEffect(() => {
    if (!enabled) return;
    const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    let stop = false;
    let rec: SR | null = null;
    let fails = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let clear: ReturnType<typeof setTimeout> | undefined;
    const handled = new Set<number>();
    const start = () => {
      if (stop || document.visibilityState === "hidden") return;
      handled.clear();
      rec = new Ctor();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";
      rec.onstart = () => {
        fails = 0;
        setMic("on");
      };
      rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (handled.has(i)) continue;
          const r = e.results[i];
          const text = r[0].transcript.trim();
          if (!text) continue;
          if (cb.current(text, r.isFinal)) {
            handled.add(i);
            setHeard(text);
            clearTimeout(clear);
            clear = setTimeout(() => setHeard(""), 2400);
          } else if (r.isFinal) handled.add(i);
        }
      };
      rec.onend = () => {
        rec = null;
        if (stop) return;
        // quick restarts are normal; back off if it keeps failing
        timer = setTimeout(start, Math.min(4000, 250 * 2 ** fails));
      };
      rec.onerror = (e) => {
        // a busy mic (a call, another app) is temporary: only a refusal, or a mic that stays busy, ends listening
        if (e.error === "not-allowed" || e.error === "service-not-allowed" || (e.error === "audio-capture" && fails >= 4)) {
          stop = true;
          setMic("denied");
        } else if (e.error !== "no-speech" && e.error !== "aborted") fails++;
      };
      try {
        setMic((m) => (m === "on" ? m : "starting"));
        rec.start();
      } catch {
        /* already started */
      }
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") rec?.abort();
      else if (!rec) start();
    };
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => {
      stop = true;
      clearTimeout(timer);
      clearTimeout(clear);
      document.removeEventListener("visibilitychange", onVis);
      rec?.abort();
    };
  }, [enabled]);

  if (!enabled) return { mic: "off" as Mic, heard: "" };
  return { mic: speechSupported() ? mic : ("unsupported" as Mic), heard };
}

export function haptic(ms = 8) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}
