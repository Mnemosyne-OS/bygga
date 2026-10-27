"use client";

import { VOICE_DIR, clipId } from "@/lib/voice/script";
import { canon } from "@/lib/voice/commands";

/**
 * Plays the hands-free voice. Lines with a pre-recorded clip play from
 * /voice; other lines (scanned guides, spoken answers) are recorded live in
 * the same voice when the server allows it. A line that can't be played in
 * that voice is skipped (it is on screen anyway): the device's own voice is
 * never used, so the guide only ever has one voice.
 *
 * One audio element is reused for everything: iOS only lets a page play
 * sound without a tap on an element that was started by a tap.
 */

// 0.1 s of silence, used to unlock audio inside the tap that turns voice on
const SILENT = "data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYyLjMuMTAwAAAAAAAAAAAAAAD/83DAAAAAAAAAAAAASW5mbwAAAA8AAAAGAAADKQBaWlpaWlpaWlpaWlpaWlpae3t7e3t7e3t7e3t7e3t7e3ucnJycnJycnJycnJycnJycvb29vb29vb29vb29vb29vb3e3t7e3t7e3t7e3t7e3t7e3v////////////////////8AAAAATGF2YzYyLjExAAAAAAAAAAAAAAAAJAKjAAAAAAAAAymyjyTgAAAAAAAAAAAAAAAAAP/zQMQAAAADSAAAAABMQU1FMy4xMDBVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxFsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NAxKQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80LEowAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80DEpAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsSjAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";

type Listener = (speaking: boolean) => void;

const OPTIONAL = /^(You'll need|Grab |Do this for all)/;

/** How long the mic may still be hearing a line after she said it: recognizers write words a second or more late. */
const ECHO_MS = 6000;

/**
 * One letter added, dropped or changed, how a recognizer mishears her ("bottom" as "bottoms"). Only for
 * longer words: short ones are too close to each other ("step" and "stop") and to the commands.
 */
function close(a: string, b: string) {
  if (a === b) return true;
  if (a.length < 5 || b.length < 5 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1);
  return a.length > b.length ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

class Voice {
  private el: HTMLAudioElement | null = null;
  private clips: Record<string, number> | null = null;
  private manifest: Promise<void> | null = null;
  private token = 0;
  private settle: ((ok: boolean) => void) | null = null;
  private listeners = new Set<Listener>();
  /** Text being said right now, and the lines before it, for telling her words from the person's. */
  private now = "";
  private said: { words: string[]; until: number }[] = [];
  private ended = 0;
  /** Volume while the person talks over her, so the mic hears them. */
  private gain = 1;
  private fade: ReturnType<typeof setInterval> | undefined;
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
    const now = Date.now();
    if (this.now) {
      this.said = this.said.filter((s) => s.until > now).concat({ words: canon(this.now), until: now + ECHO_MS });
      if (!text) this.ended = now;
    }
    this.now = text;
    this.listeners.forEach((fn) => fn(!!text));
  }

  get speaking() {
    return !!this.now;
  }

  /** Speaking, or only just stopped: what the mic hears may still be her. */
  get busy() {
    return !!this.now || Date.now() - this.ended < 1500;
  }

  /** True for a word she is saying or said a moment ago, as a recognizer might write it. */
  hers = (word: string) => {
    const now = Date.now();
    const lines = [canon(this.now), ...this.said.filter((s) => s.until > now).map((s) => s.words)];
    const parts = canon(word);
    return parts.length > 0 && parts.every((w) => lines.some((l) => l.some((h) => close(w, h))));
  };

  /** Quieter while the person talks over her, so the mic hears them, then back up. */
  duck(on: boolean) {
    const to = on ? 0.3 : 1;
    if (to === this.gain) return;
    this.gain = to;
    clearInterval(this.fade);
    const el = this.el;
    if (!el) return;
    // down fast, so the next word is heard; up slowly, so it doesn't jump
    const step = on ? -0.14 : 0.05;
    this.fade = setInterval(() => {
      const v = Math.min(1, Math.max(to, el.volume + step));
      el.volume = on ? Math.max(to, v) : Math.min(to, v);
      if (el.volume === to) clearInterval(this.fade);
    }, 20);
  }

  stop() {
    this.token++;
    this.settle?.(false);
    this.el?.pause();
    this.set("");
  }

  /** Says the lines in order. Resolves false if something else interrupted it. */
  async say(lines: string[]): Promise<boolean> {
    this.stop();
    const my = this.token;
    await this.load();
    if (my !== this.token) return false;
    // counts and tools are on screen too, so they're simply left out when there's no clip
    lines = lines.filter((l) => this.has(l) || !OPTIONAL.test(l));
    this.el ??= new Audio();
    // live lines all start loading now, so the next one is ready when this one ends
    const srcs = lines.map((l) => this.src(l));
    for (let i = 0; i < lines.length; i++) {
      const src = await srcs[i];
      if (my !== this.token) return false;
      if (!src) continue;
      this.set(lines[i]);
      let ok = await this.play(src, this.clip(lines[i])?.ms);
      if (my !== this.token) return false;
      // a clip that won't load gets one more go, recorded live in the same voice
      if (!ok && this.live && this.clip(lines[i])) {
        const again = await this.liveSrc(lines[i]);
        if (my !== this.token) return false;
        if (again) ok = await this.play(again);
        if (my !== this.token) return false;
      }
      // a beat after "Step four." and between sentences, like a person would
      if (ok && i < lines.length - 1) await wait(/^(Step \w+|Last step)\.$/.test(lines[i]) ? 320 : 240);
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
