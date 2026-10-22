"use client";

import { VOICE_DIR, clipId } from "@/lib/voice/script";

/**
 * Plays the hands-free voice. Lines with a pre-recorded clip play from
 * /voice; other lines (scanned guides, spoken answers) are recorded live
 * when the server allows it, otherwise the whole sequence falls back to the
 * device's own voice so one step never mixes two voices.
 *
 * One audio element is reused for everything: iOS only lets a page play
 * sound without a tap on an element that was started by a tap.
 */

// 0.1 s of silence, used to unlock audio inside the tap that turns voice on
const SILENT = "data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYyLjMuMTAwAAAAAAAAAAAAAAD/83DAAAAAAAAAAAAASW5mbwAAAA8AAAAGAAADKQBaWlpaWlpaWlpaWlpaWlpae3t7e3t7e3t7e3t7e3t7e3ucnJycnJycnJycnJycnJycvb29vb29vb29vb29vb29vb3e3t7e3t7e3t7e3t7e3t7e3v////////////////////8AAAAATGF2YzYyLjExAAAAAAAAAAAAAAAAJAKjAAAAAAAAAymyjyTgAAAAAAAAAAAAAAAAAP/zQMQAAAADSAAAAABMQU1FMy4xMDBVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxFsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NAxKQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80LEowAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80DEpAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsSjAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";

type Listener = (speaking: boolean) => void;

const OPTIONAL = /^(You'll need|Grab |Do this for all)/;

class Voice {
  private el: HTMLAudioElement | null = null;
  private clips: Record<string, number> | null = null;
  private manifest: Promise<void> | null = null;
  private token = 0;
  private settle: ((ok: boolean) => void) | null = null;
  private listeners = new Set<Listener>();
  /** Text being said right now, and when the last line ended, for the echo check. */
  private now = "";
  private recent = { text: "", at: 0 };
  /** The server can record lines that have no clip. */
  live = false;
  rate = 1;

  /** Call from a tap, before anything else is played. */
  unlock() {
    if (typeof window === "undefined") return;
    if (!this.el) {
      this.el = new Audio();
      this.el.preload = "auto";
    }
    this.el.src = SILENT;
    this.el.play().catch(() => {});
    this.load();
    // the device voice has to be woken inside a tap too
    try {
      window.speechSynthesis?.speak(new SpeechSynthesisUtterance(""));
    } catch {
      /* no speech synthesis */
    }
  }

  load() {
    this.manifest ??= fetch(`${VOICE_DIR}/manifest.json`)
      .then((r) => (r.ok ? r.json() : { clips: {} }))
      .then((j) => void (this.clips = j.clips ?? {}))
      .catch(() => void (this.clips = {}));
    return this.manifest;
  }

  private url(text: string) {
    const id = clipId(text);
    if (this.clips?.[id]) return `${VOICE_DIR}/${id}.mp3`;
    return this.live ? `/api/voice?t=${encodeURIComponent(text.trim())}` : null;
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => void this.listeners.delete(fn);
  }

  private set(text: string) {
    if (this.now && !text) this.recent = { text: this.now, at: Date.now() };
    this.now = text;
    this.listeners.forEach((fn) => fn(!!text));
  }

  get speaking() {
    return !!this.now;
  }

  /** True when every word heard is something the voice is saying or just said. */
  echo(words: string[]) {
    const said = (this.now + " " + (Date.now() - this.recent.at < 1500 ? this.recent.text : "")).toLowerCase().replace(/[’']/g, "");
    return words.length > 0 && words.every((w) => new RegExp(`\\b${w}\\b`).test(said));
  }

  stop() {
    this.token++;
    this.settle?.(false);
    this.el?.pause();
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* ignore */
    }
    this.set("");
  }

  /** Says the lines in order. Resolves false if something else interrupted it. */
  async say(lines: string[]): Promise<boolean> {
    this.stop();
    const my = this.token;
    await this.load();
    if (my !== this.token) return false;
    // counts and tools are on screen too, so skip them rather than change voice
    lines = lines.filter((l) => this.url(l) || !OPTIONAL.test(l));
    const urls = lines.map((l) => this.url(l));
    if (!this.el || urls.some((u) => !u)) return this.device(lines, my);
    for (let i = 0; i < lines.length; i++) {
      if (my !== this.token) return false;
      this.set(lines[i]);
      const ok = await this.play(urls[i]!);
      if (my !== this.token) return false;
      if (!ok) return this.device(lines.slice(i), my);
      // a beat after "Step four." and between sentences, like a person would
      if (i < lines.length - 1) await wait(/^(Step \w+|Last step)\.$/.test(lines[i]) ? 320 : 240);
    }
    this.set("");
    return my === this.token;
  }

  private play(url: string) {
    const el = this.el!;
    return new Promise<boolean>((resolve) => {
      const done = (ok: boolean) => {
        el.onended = el.onerror = null;
        if (this.settle === done) this.settle = null;
        resolve(ok);
      };
      this.settle = done;
      el.onended = () => done(true);
      el.onerror = () => done(false);
      el.src = url;
      el.defaultPlaybackRate = this.rate;
      el.playbackRate = this.rate;
      el.play().catch(() => done(false));
    });
  }

  private device(lines: string[], my: number) {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!synth) {
      this.set("");
      return Promise.resolve(false);
    }
    const text = lines.join(" ");
    this.set(text);
    return new Promise<boolean>((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95 * this.rate;
      const v = pickVoice(synth.getVoices());
      if (v) u.voice = v;
      const done = (ok: boolean) => {
        if (this.settle === done) this.settle = null;
        if (my === this.token) this.set("");
        resolve(ok && my === this.token);
      };
      this.settle = done;
      u.onend = () => done(true);
      u.onerror = () => done(false);
      synth.speak(u);
    });
  }

  /** Warms the cache for lines coming up next. */
  prefetch(lines: string[]) {
    this.load().then(() => {
      for (const l of lines) {
        const u = this.url(l);
        if (u?.startsWith(VOICE_DIR)) fetch(u, { priority: "low" } as RequestInit).catch(() => {});
      }
    });
  }
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** The calmest English voice the device has. */
function pickVoice(voices: SpeechSynthesisVoice[]) {
  const en = voices.filter((v) => /^en[-_]/i.test(v.lang));
  const score = (v: SpeechSynthesisVoice) =>
    (/natural|neural|premium|enhanced|online/i.test(v.name) ? 4 : 0) +
    (/samantha|ava|zoe|allison|serena|karen|moira|aria|jenny|libby|sonia|female/i.test(v.name) ? 2 : 0) +
    (/en[-_](US|GB)/i.test(v.lang) ? 1 : 0);
  return en.sort((a, b) => score(b) - score(a))[0];
}

export const voice = new Voice();

/** Headphone and lock-screen buttons: next track moves on, previous goes back. */
export function mediaSession(meta: { title: string; artist: string }, on: { next: () => void; back: () => void; play: () => void; pause: () => void }) {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return () => {};
  const ms = navigator.mediaSession;
  try {
    ms.metadata = new MediaMetadata({ title: meta.title, artist: meta.artist, album: "Bygga" });
  } catch {
    /* MediaMetadata missing */
  }
  const set = (a: MediaSessionAction, fn: (() => void) | null) => {
    try {
      ms.setActionHandler(a, fn);
    } catch {
      /* action not supported */
    }
  };
  set("nexttrack", on.next);
  set("previoustrack", on.back);
  set("play", on.play);
  set("pause", on.pause);
  return () => {
    for (const a of ["nexttrack", "previoustrack", "play", "pause"] as MediaSessionAction[]) set(a, null);
    ms.metadata = null;
  };
}
