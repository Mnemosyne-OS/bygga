"use client";

import { VOICE_DIR, clipId, numWords } from "@/lib/voice/script";

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

// how a recognizer may write back what the voice said: digits and sound-alikes
const ALIKE: Record<string, string> = { won: "one", to: "two", too: "two", for: "four", fore: "four", ate: "eight" };

function canon(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .flatMap((w) => (/^\d+$/.test(w) ? numWords(Number(w)).split("-") : [ALIKE[w] ?? w]));
}

class Voice {
  private el: HTMLAudioElement | null = null;
  private clips: Record<string, number> | null = null;
  private manifest: Promise<void> | null = null;
  private token = 0;
  private settle: ((ok: boolean) => void) | null = null;
  private listeners = new Set<Listener>();
  /** Text being said right now, and the line before it, for the echo check. */
  private now = "";
  private recent = { text: "", at: 0 };
  /** Live lines, fetched whole so they can load ahead and play without gaps. */
  private fetched = new Map<string, Promise<string | null>>();
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
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j) => void (this.clips = j.clips ?? {}))
      .catch(() => {
        // a flaky first tap shouldn't cost the clips for the whole visit
        this.clips ??= {};
        this.manifest = null;
      });
    return this.manifest;
  }

  private clip(text: string) {
    const id = clipId(text);
    return this.clips?.[id] ? { src: `${VOICE_DIR}/${id}.mp3`, ms: this.clips[id] } : null;
  }

  private has(text: string) {
    return !!this.clip(text) || this.live;
  }

  private liveSrc(text: string) {
    const t = text.trim();
    let p = this.fetched.get(t);
    if (!p) {
      p = fetch(`/api/voice?t=${encodeURIComponent(t)}`, { signal: AbortSignal.timeout(10_000) })
        .then((r) => (r.ok ? r.blob() : null))
        .then((b) => (b && b.size ? URL.createObjectURL(b) : null))
        .catch(() => null)
        .then((u) => {
          if (!u) this.fetched.delete(t);
          return u;
        });
      this.fetched.set(t, p);
      if (this.fetched.size > 120) {
        const [old, op] = this.fetched.entries().next().value!;
        this.fetched.delete(old);
        op.then((u) => u && URL.revokeObjectURL(u));
      }
    }
    return p;
  }

  private src(text: string): Promise<string | null> {
    const c = this.clip(text);
    return c ? Promise.resolve(c.src) : this.live ? this.liveSrc(text) : Promise.resolve(null);
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => void this.listeners.delete(fn);
  }

  private set(text: string) {
    if (this.now) this.recent = { text: this.now, at: Date.now() };
    this.now = text;
    this.listeners.forEach((fn) => fn(!!text));
  }

  get speaking() {
    return !!this.now;
  }

  /** True when every word heard is something the voice is saying or has just said, as a recognizer might write it. */
  echo(words: string[]) {
    const said = new Set(canon(this.now + " " + (Date.now() - this.recent.at < 1800 ? this.recent.text : "")));
    const heard = words.flatMap(canon);
    return heard.length > 0 && heard.every((w) => said.has(w));
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
    lines = lines.filter((l) => this.has(l) || !OPTIONAL.test(l));
    if (!this.el || lines.some((l) => !this.has(l))) return this.device(lines, my);
    // live lines all start loading now, so the next one is ready when this one ends
    const srcs = lines.map((l) => this.src(l));
    for (let i = 0; i < lines.length; i++) {
      const src = await srcs[i];
      if (my !== this.token) return false;
      if (!src) return this.device(lines.slice(i), my);
      this.set(lines[i]);
      const ok = await this.play(src, this.clip(lines[i])?.ms);
      if (my !== this.token) return false;
      if (!ok) return this.device(lines.slice(i), my);
      // a beat after "Step four." and between sentences, like a person would
      if (i < lines.length - 1) await wait(/^(Step \w+|Last step)\.$/.test(lines[i]) ? 320 : 240);
    }
    this.set("");
    return my === this.token;
  }

  private play(src: string, ms?: number) {
    const el = this.el!;
    return new Promise<boolean>((resolve) => {
      let settled = false;
      const onEnd = () => done(true);
      const onErr = () => done(false);
      // runs once; a late rejection from an interrupted play() must not touch the next clip's handlers
      const done = (ok: boolean) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (el.onended === onEnd) el.onended = null;
        if (el.onerror === onErr) el.onerror = null;
        if (this.settle === done) this.settle = null;
        resolve(ok);
      };
      this.settle = done;
      el.onended = onEnd;
      el.onerror = onErr;
      el.src = src;
      el.defaultPlaybackRate = this.rate;
      el.playbackRate = this.rate;
      // a stalled network or a phone call can leave a clip hanging: move on once it should have ended
      const timer = setTimeout(() => done(el.currentTime > 0), (ms ?? 8000) / this.rate + 5000);
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
        const c = this.clip(l);
        if (c) fetch(c.src, { priority: "low" } as RequestInit).catch(() => {});
        else if (this.live) this.liveSrc(l);
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
