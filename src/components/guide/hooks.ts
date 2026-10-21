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

type Cmd = "next" | "back" | "repeat" | "help" | "stop";

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
}

export function speechSupported() {
  if (typeof window === "undefined") return false;
  const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

/** Voice commands ("next", "back", "repeat", "help") and spoken step instructions. */
export function useHandsFree(enabled: boolean, onCmd: (c: Cmd) => void) {
  const cb = useRef(onCmd);
  useEffect(() => {
    cb.current = onCmd;
  });
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");

  useEffect(() => {
    if (!enabled) return;
    const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    let stop = false;
    let rec: SR | null = null;
    const start = () => {
      if (stop) return;
      rec = new Ctor();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = "en-US";
      rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const text = e.results[i][0].transcript.toLowerCase().trim();
          setHeard(text);
          if (/\b(next|done|continue|forward|okay next)\b/.test(text)) cb.current("next");
          else if (/\b(back|previous|go back)\b/.test(text)) cb.current("back");
          else if (/\b(repeat|again|replay|show me)\b/.test(text)) cb.current("repeat");
          else if (/\b(help|stuck)\b/.test(text)) cb.current("help");
        }
      };
      rec.onend = () => {
        setListening(false);
        if (!stop) setTimeout(start, 250);
      };
      rec.onerror = (e) => {
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          stop = true;
          cb.current("stop");
        }
      };
      try {
        rec.start();
        setListening(true);
      } catch {
        /* already started */
      }
    };
    start();
    return () => {
      stop = true;
      rec?.abort();
      setListening(false);
    };
  }, [enabled]);

  return { listening, heard };
}

export function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1;
  u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find((x) => /en[-_](GB|US)/i.test(x.lang) && /natural|premium|enhanced|samantha|daniel/i.test(x.name)) ?? voices.find((x) => /^en/i.test(x.lang));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

export function haptic(ms = 8) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}
