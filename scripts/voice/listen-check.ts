/**
 * Replays real recognizer output through the guide's listening, along the
 * voice's exact timeline, and fails on a step moved by mistake or a command
 * heard but missed.
 *
 * listen-fixtures.json comes from desktop Chrome fed a fake mic: her step
 * mixed in at several echo levels (0 dB is as loud as the person, -90 dB is
 * gone), with macOS voices saying commands, chatting, or nothing over it.
 * Each run keeps every recognizer result as it arrived and the mic's level
 * every 50 ms. Run with `npm run voice:check`.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { findCommand, normalize, type Heard } from "@/lib/voice/commands";
import { talkDetector } from "@/lib/voice/talk";
import { voice } from "@/components/guide/voice";

type Run = {
  name: string;
  expect: string | null;
  timeline: { text: string; start: number; end: number }[];
  userAt: number[];
  events: [number, [string, boolean][]][];
  levels: number[];
};

const runs: Run[] = JSON.parse(readFileSync(path.join(import.meta.dirname, "listen-fixtures.json"), "utf8"));

// the voice runs on a clock this script moves along her timeline
let clock = 0;
Date.now = () => clock;
const v = voice as unknown as { set(t: string): void; now: string; said: unknown[]; ended: number };
function at(run: Run, t: number) {
  v.now = "";
  v.said = [];
  v.ended = -1e9;
  for (const l of run.timeline) {
    if (l.start > t) break;
    clock = l.start;
    v.set(l.text);
    if (l.end <= t) {
      clock = l.end;
      v.set("");
    }
  }
  clock = t;
}

type Decision = { wait: string } | { act: Heard } | null;

// the same rules as the guide's onPhrase
function decide(run: Run, text: string, state: "interim" | "settled" | "final", from: number, t: number): Decision {
  at(run, t);
  const got = findCommand(text, voice.hers, voice.busy, from);
  if (!got) return null;
  if (got.intent.kind === "ask" && state !== "final") return null;
  if (got.open && state === "interim" && got.intent.kind !== "stop") return { wait: got.words };
  return { act: got };
}

// and the same timing as useListener: twice in a row, or 280 ms unchanged, settles it
function listen(run: Run) {
  let seen = 0;
  const st: { pending: { at: number; text: string; from: number; words: string } | null } = { pending: null };
  for (let k = 0; k <= run.events.length; k++) {
    const e = run.events[k];
    const p = st.pending;
    if (p && (!e || e[0] >= p.at)) {
      const g = decide(run, p.text, "settled", p.from, p.at);
      if (g && "act" in g) return { t: p.at, kind: g.act.intent.kind, words: g.act.words };
      st.pending = null;
    }
    if (!e) break;
    const [t, results] = e;
    const text = results.map((x) => x[0]).join(" ").trim();
    if (!text) continue;
    const from = Math.max(0, seen - 3);
    seen = Math.max(seen, text.split(/\s+/).length);
    const g = decide(run, text, results[results.length - 1][1] ? "final" : "interim", from, t);
    if (g && "wait" in g) {
      if (st.pending?.words === g.wait) {
        const h = decide(run, text, "settled", from, t);
        if (h && "act" in h) return { t, kind: h.act.intent.kind, words: h.act.words };
        st.pending = null;
      } else st.pending = { at: t + 280, text, from, words: g.wait };
      continue;
    }
    st.pending = null;
    if (g) return { t, kind: g.act.intent.kind, words: g.act.words };
  }
  return null;
}

const KEY: Record<string, string> = { next: "next", back: "back", repeat: "again", stop: "stop" };
let bad = 0;
let caught = 0;
let unheard = 0;
for (const run of runs) {
  const got = listen(run);
  const said = run.userAt[0];
  const heard = !!run.expect && run.events.some(([, r]) => r.some(([x]) => normalize(x).includes(KEY[run.expect!])));
  let verdict: string;
  if (!run.expect) verdict = got ? "FALSE MOVE" : "ok";
  else if (got?.kind === run.expect) verdict = "ok";
  else if (got) verdict = "WRONG";
  else verdict = heard ? "MISSED" : "unheard";
  if (verdict === "ok" && run.expect) caught++;
  if (verdict === "unheard") unheard++;

  // the talk detector: it may never fire on her alone, and must fire soon after the person starts
  const talk = talkDetector();
  let first: number | null = null;
  let stray = false;
  run.levels.forEach((db, i) => {
    const t = i * 50;
    const on = talk(db, run.timeline.some((l) => l.start <= t && t < l.end + 1500));
    if (!on) return;
    if (run.userAt.some((u) => t >= u - 100 && t <= u + 2500)) first ??= t;
    else stray = true;
  });
  if (stray) verdict += ", TALK ON HER ECHO";
  if (/[A-Z]{3}/.test(verdict)) bad++;
  const when = got ? `${got.kind} "${got.words}"${said !== undefined ? ` +${got.t - said} ms` : ""}` : "nothing";
  console.log(`${verdict.padEnd(10)} ${run.name.padEnd(20)} ${when.padEnd(26)} talk ${said === undefined ? "-" : first === null ? "no" : `+${first - said} ms`}`);
}
console.log(`\n${caught} caught, ${unheard} the recognizer never wrote, ${bad} wrong`);
if (bad) process.exit(1);
