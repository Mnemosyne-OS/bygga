"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { catalogSpec } from "@/lib/catalog";
import { buildPlan } from "@/lib/plan";
import { PRODUCT_COUNT } from "@/lib/search";
import { VOICE_DIR, clipId, stepLines } from "@/lib/voice/script";
import { HwArt } from "../art/Hardware";
import { IBox, ICheck, IPlay, ISound } from "../art/Icons";

/*
 * One real step (KALLAX 2 × 2, step 2: stand the divider on the dowels),
 * drawn twice from the same geometry: as the booklet in the box prints it,
 * and as Bygga shows it. A handle wipes between the two.
 */

const C = Math.cos(Math.PI / 6);
const S = 0.5;
const OX = 500;
const OY = 384;
type V = [number, number, number];
const P = ([x, y, z]: V): [number, number] => [OX + (x - z) * C, OY + (x + z) * S - y];
const poly = (...pts: V[]) => "M" + pts.map((p) => P(p).map((n) => n.toFixed(1)).join(" ")).join(" L") + " Z";

/** The three faces of a box we see from the front corner. */
function box(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number) {
  return {
    top: poly([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]),
    right: poly([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]),
    left: poly([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]),
  };
}

/** An upright dowel standing on a surface: sides, then the top ellipse. */
function dowel([x, y, z]: V, h: number, r = 6.5) {
  const [cx, top] = P([x, y + h, z]);
  const [, bot] = P([x, y, z]);
  const rx = r * 1.22;
  const ry = r * 0.7;
  return {
    body: `M${cx - rx} ${top} L${cx - rx} ${bot} A${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L${cx + rx} ${top} Z`,
    cap: { cx, cy: top, rx, ry },
  };
}

const BOARD = box(-170, 170, 0, 26, -80, 80);
const DIVIDER = box(-8, 8, 112, 262, -80, 80);
const DOWELS = [dowel([0, 26, -48], 24), dowel([0, 26, 48], 24)];
// fitted in the step before: the end dowels and cam bolts, drawn quieter
const DONE = [dowel([-152, 26, -48], 14), dowel([-152, 26, 48], 14), dowel([152, 26, -48], 14), dowel([152, 26, 48], 14)];
const ARROW = { top: P([0, 344, 0]), tip: P([0, 280, 0]) };
const ZOOM_AT = P([0, 50, -48]);
const ZOOM = { cx: 790, cy: 168, r: 92 };
const LETTER_A = P([96, 26, 30]);
const LETTER_B = P([8, 200, 30]);

/* where things sit, in the drawing's own units, for the wide and the narrow frame */
const VB = { wide: { x: -110, y: 12, w: 1220, h: 588 }, narrow: { x: 214, y: -4, w: 700, h: 740 } };
type Spot = { wide: [number, number]; narrow: [number, number] };
const SPOTS = {
  num: { wide: [-52, 66], narrow: [236, 50] },
  hw: { wide: [-52, 186], narrow: [236, 152] },
  // the voice bar sits on the Bygga side of the resting handle, so it can be tapped straight away
  voice: { wide: [664, 556], narrow: [564, 690] },
} satisfies Record<string, Spot>;

type Note = { text: string; dot: [number, number] | Spot; at: Spot; side: "paper" | "bygga"; wideOnly?: boolean };
const pick = (s: [number, number] | Spot, narrow: boolean): [number, number] => (Array.isArray(s) ? s : s[narrow ? "narrow" : "wide"]);
const NOTES: Note[] = [
  { side: "paper", text: "Two of which piece?", dot: { wide: [32, 138], narrow: [328, 161] }, at: { wide: [168, 96], narrow: [500, 600] } },
  { side: "paper", text: "Which way round?", dot: P([0, 200, 40]), at: { wide: [190, 300], narrow: [640, 660] } },
  { side: "paper", text: "Tapped in how far?", dot: P([0, 44, 48]), at: { wide: [230, 470], narrow: [0, 0] }, wideOnly: true },
  { side: "bygga", text: "Exact parts, counted", dot: { wide: [14, 216], narrow: [352, 214] }, at: { wide: [96, 310], narrow: [420, 540] } },
  { side: "bygga", text: "Every dowel, up close", dot: { wide: [ZOOM.cx + ZOOM.r * 0.72, ZOOM.cy + ZOOM.r * 0.7], narrow: [ZOOM.cx - ZOOM.r * 0.2, ZOOM.cy + ZOOM.r * 0.98] }, at: { wide: [948, 322], narrow: [700, 600] } },
  { side: "bygga", text: "Drag to turn it around", dot: P([150, 0, 80]), at: { wide: [860, 470], narrow: [0, 0] }, wideOnly: true },
];

function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return narrow;
}

export default function Compare() {
  const narrow = useNarrow();
  const vb = narrow ? VB.narrow : VB.wide;
  const place = useCallback(([x, y]: [number, number]) => ({ left: `${((x - vb.x) / vb.w) * 100}%`, top: `${((y - vb.y) / vb.h) * 100}%` }), [vb]);
  const pct = useCallback((x: number) => ((x - vb.x) / vb.w) * 100, [vb]);

  // how much of the paper manual is showing, in percent from the left
  const pos = useMotionValue(94);
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const pill = useTransform(pos, [0, 100], ["100%", "0%"]);
  // the dividing line only while both sides show
  const edge = useTransform(pos, (p) => (p < 1.5 || p > 98.5 ? 0 : 1));
  const [now, setNow] = useState(94);
  useMotionValueEvent(pos, "change", (p) => setNow(Math.round(p)));

  const stage = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const touched = useRef(false);
  const [used, setUsed] = useState(false);
  const touch = () => {
    touched.current = true;
    setUsed(true);
  };

  // phones get the whole of one side at a time; wider screens a handle in between
  const rest = narrow ? 0 : 40;
  const show = (side: "paper" | "bygga") => {
    touched.current = true;
    animate(pos, side === "paper" ? 100 : 0, { duration: 0.9, ease: [0.65, 0, 0.35, 1] });
  };

  // the first time it scrolls into view, the Bygga side wipes in over the paper
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (still) {
      pos.set(rest);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || touched.current) return;
        io.disconnect();
        animate(pos, rest, { duration: 1.5, delay: 0.6, ease: [0.65, 0, 0.35, 1] });
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pos, still, rest]);

  const drag = useRef(false);
  const toPointer = (clientX: number) => {
    const r = stage.current!.getBoundingClientRect();
    pos.stop();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="compare" aria-labelledby="compare-title">
      <div className="cmp-head">
        <p className="cmp-eyebrow">Why Bygga</p>
        <h2 className="sec-title" id="compare-title">
          The paper manual, explained
        </h2>
        <p className="cmp-sub">The same steps as the booklet in the box, except you can turn them around, see every dowel up close and hear them read out loud.</p>
      </div>

      <div
        ref={stage}
        className="cmp-stage"
        style={{ aspectRatio: `${vb.w} / ${vb.h}` }}
        onPointerDown={(e) => {
          if (narrow || (e.target as HTMLElement).closest("button")) return;
          touch();
          drag.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          toPointer(e.clientX);
        }}
        onPointerMove={(e) => drag.current && toPointer(e.clientX)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
      >
        {/* Bygga, underneath */}
        <div className="cmp-layer cmp-bygga">
          <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} aria-hidden="true">
            <Scene style="bygga" />
            <Zoom />
            {NOTES.filter((n) => n.side === "bygga" && (!narrow || !n.wideOnly)).map((n) => (
              <Lead key={n.text} from={pick(n.dot, narrow)} to={n.at[narrow ? "narrow" : "wide"]} side="bygga" />
            ))}
          </svg>
          <span className="cmp-tag bygga">Bygga</span>
          <span className="cmp-num" style={place(SPOTS.num[narrow ? "narrow" : "wide"])}>
            2
          </span>
          <span className="cmp-hw" style={place(SPOTS.hw[narrow ? "narrow" : "wide"])}>
            <HwArt kind="dowel" len={30} dia={8} fit={40} />
            <b>2&times;</b>
          </span>
          {NOTES.filter((n) => n.side === "bygga" && (!narrow || !n.wideOnly)).map((n) => (
            <Chip key={n.text} note={n} style={place(n.at[narrow ? "narrow" : "wide"])} x={pct(n.at[narrow ? "narrow" : "wide"][0])} pos={pos} />
          ))}
          <Voice style={place(SPOTS.voice[narrow ? "narrow" : "wide"])} />
        </div>

        {/* the paper manual, on top, wiped away from the right */}
        <motion.div className="cmp-layer cmp-paper" style={{ clipPath: clip }} aria-hidden="true">
          <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}>
            <PaperPage vb={vb} narrow={narrow} />
            <Scene style="paper" />
            {NOTES.filter((n) => n.side === "paper" && (!narrow || !n.wideOnly)).map((n) => (
              <Lead key={n.text} from={pick(n.dot, narrow)} to={n.at[narrow ? "narrow" : "wide"]} side="paper" />
            ))}
          </svg>
          <span className="cmp-tag paper">The paper manual</span>
          {NOTES.filter((n) => n.side === "paper" && (!narrow || !n.wideOnly)).map((n) => (
            <Chip key={n.text} note={n} style={place(n.at[narrow ? "narrow" : "wide"])} x={pct(n.at[narrow ? "narrow" : "wide"][0])} pos={pos} />
          ))}
        </motion.div>

        <motion.button
          className="cmp-handle"
          style={{ left, opacity: narrow ? edge : 1 }}
          role="slider"
          aria-label="Compare the paper manual with Bygga"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={now}
          aria-valuetext={now > 60 ? "Mostly the paper manual" : now < 40 ? "Mostly Bygga" : "Half and half"}
          onPointerDown={(e) => {
            touch();
            drag.current = true;
            stage.current?.setPointerCapture(e.pointerId);
          }}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 20 : 6;
            const to = e.key === "ArrowLeft" ? pos.get() - step : e.key === "ArrowRight" ? pos.get() + step : e.key === "Home" ? 0 : e.key === "End" ? 100 : null;
            if (to === null) return;
            e.preventDefault();
            touch();
            animate(pos, Math.min(100, Math.max(0, to)), { type: "spring", stiffness: 420, damping: 40 });
          }}
        >
          <span className="cmp-knob">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {!narrow && <span className={"cmp-hint" + (used ? " gone" : "")}>Drag to compare</span>}
        </motion.button>
      </div>

      {narrow && (
        <div className="cmp-switch" role="group" aria-label="Show">
          <button className={now > 50 ? "on" : ""} onClick={() => show("paper")} aria-pressed={now > 50}>
            The paper manual
          </button>
          <button className={now <= 50 ? "on" : ""} onClick={() => show("bygga")} aria-pressed={now <= 50}>
            Bygga
          </button>
          <motion.i className="cmp-switch-bg" style={{ x: pill }} aria-hidden="true" />
        </div>
      )}

      <ul className="cmp-facts">
        <li>
          <IBox size={20} />
          <span>
            <b>{PRODUCT_COUNT} IKEA products</b>
            <span>Every size drawn, searchable by the number on the box</span>
          </span>
        </li>
        <li>
          <ISound size={20} />
          <span>
            <b>Read out loud</b>
            <span>Say &ldquo;next&rdquo; and keep both hands on the panel</span>
          </span>
        </li>
        <li>
          <ICheck size={20} />
          <span>
            <b>Free, no app</b>
            <span>No account, nothing to install. Works offline once open</span>
          </span>
        </li>
      </ul>
    </section>
  );
}

/* ---------- the drawing ---------- */

function Scene({ style }: { style: "paper" | "bygga" }) {
  const paper = style === "paper";
  const ink = paper ? "#5d5a53" : "var(--ink)";
  const w = paper ? 1.2 : 2.4;
  const face = (shade: "top" | "left" | "right", tint?: boolean) => {
    if (paper) return "#fbf8f0";
    if (tint) return shade === "right" ? "#f1e4b0" : shade === "left" ? "#fff2c2" : "#fff8dc";
    return shade === "right" ? "#efede7" : "#fff";
  };
  return (
    <g strokeLinejoin="round" stroke={ink} strokeWidth={w} className={paper ? "sc-paper" : "sc-bygga"}>
      {!paper && <ellipse cx={P([0, 0, 0])[0] + 6} cy={P([0, 0, 0])[1] + 16} rx={250} ry={44} fill="#f1efe9" stroke="none" />}
      {/* the bottom panel */}
      <path d={BOARD.left} fill={face("left")} />
      <path d={BOARD.right} fill={face("right")} />
      <path d={BOARD.top} fill={face("top")} />
      {DONE.map((d, i) => (
        <g key={i} opacity={paper ? 1 : 0.55}>
          <path d={d.body} fill={paper ? "#fbf8f0" : "#f1e2c3"} />
          <ellipse {...d.cap} fill={paper ? "#fbf8f0" : "#f7edd6"} />
        </g>
      ))}
      {/* the two new dowels */}
      <g className="sc-new">
        {DOWELS.map((d, i) => (
          <g key={i}>
            <path d={d.body} fill={paper ? "#fbf8f0" : "#f1e2c3"} />
            <ellipse {...d.cap} fill={paper ? "#fbf8f0" : "#f7edd6"} />
          </g>
        ))}
      </g>
      {/* the divider, coming down onto them */}
      <g className="sc-drop">
        <path d={DIVIDER.left} fill={face("left", true)} />
        <path d={DIVIDER.right} fill={face("right", true)} />
        <path d={DIVIDER.top} fill={face("top", true)} />
        {paper ? (
          <path d={`M${ARROW.top[0]} ${ARROW.top[1]} V${ARROW.tip[1]} M${ARROW.top[0] - 6} ${ARROW.tip[1] - 10} L${ARROW.top[0]} ${ARROW.tip[1]} L${ARROW.top[0] + 6} ${ARROW.tip[1] - 10}`} fill="none" />
        ) : (
          <path
            d={`M${ARROW.top[0] - 7} ${ARROW.top[1]} h14 v${ARROW.tip[1] - ARROW.top[1] - 22} h10 l-17 22 l-17 -22 h10 z`}
            fill="var(--ink)"
            stroke="#fff"
            strokeWidth={2.4}
          />
        )}
      </g>
      {/* part letters, like the panels' labels in the box */}
      {[
        { p: LETTER_A, t: "A" },
        { p: LETTER_B, t: "B" },
      ].map(({ p, t }) =>
        paper ? (
          <text key={t} x={p[0]} y={p[1] + 4} fontSize={11} textAnchor="middle" fill={ink} stroke="none" fontFamily="var(--font)">
            {t}
          </text>
        ) : (
          <g key={t}>
            <circle cx={p[0]} cy={p[1]} r={15} fill="#fff" strokeWidth={2} />
            <text x={p[0]} y={p[1] + 5.5} fontSize={15} fontWeight={800} textAnchor="middle" fill="var(--ink)" stroke="none" fontFamily="var(--font)">
              {t}
            </text>
          </g>
        ),
      )}
    </g>
  );
}

/** The magnified circle: the divider's hole lined up over a dowel, with a line to where it happens. */
function Zoom() {
  const { cx, cy, r } = ZOOM;
  const edge = Math.atan2(ZOOM_AT[1] - cy, ZOOM_AT[0] - cx);
  const top = cy - 4; // the dowel's tip
  const face = cy + 46; // the board's top face
  const under = cy - 22; // the divider's bottom edge
  return (
    <g className="cmp-zoom">
      <path d={`M${cx + Math.cos(edge) * r} ${cy + Math.sin(edge) * r} L${ZOOM_AT[0]} ${ZOOM_AT[1]}`} stroke="var(--ink)" strokeWidth={1.6} fill="none" />
      <circle cx={ZOOM_AT[0]} cy={ZOOM_AT[1]} r={4} fill="var(--ink)" />
      <clipPath id="cmp-zoom-clip">
        <circle cx={cx} cy={cy} r={r - 1.4} />
      </clipPath>
      <circle cx={cx} cy={cy} r={r} fill="#fff" />
      <g clipPath="url(#cmp-zoom-clip)" stroke="var(--ink)" strokeLinejoin="round">
        {/* the divider coming down, with the hole the dowel goes into */}
        <rect x={cx - 130} y={cy - 140} width={260} height={under - (cy - 140)} fill="#fff2c2" strokeWidth={0} />
        <rect x={cx - 15} y={under - 44} width={30} height={44} fill="#e8d38e" strokeWidth={1.4} strokeDasharray="4 3" />
        <path d={`M${cx - 130} ${under} H${cx - 15} M${cx + 15} ${under} H${cx + 130}`} strokeWidth={2.6} fill="none" />
        {/* the board, cut through */}
        <rect x={cx - 130} y={face} width={260} height={90} fill="#fff" strokeWidth={0} />
        <path d={`M${cx - 130} ${face} H${cx + 130}`} strokeWidth={2.6} fill="none" />
        {/* the dowel: half in the board, half waiting for the hole */}
        <path d={`M${cx - 13} ${face} V${top + 8} Q${cx - 13} ${top} ${cx - 5} ${top} H${cx + 5} Q${cx + 13} ${top} ${cx + 13} ${top + 8} V${face} Z`} fill="#f1e2c3" strokeWidth={2.4} />
        <path d={`M${cx - 13} ${face} V${face + 40} M${cx + 13} ${face} V${face + 40} M${cx - 13} ${face + 40} H${cx + 13}`} strokeWidth={1.4} strokeDasharray="4 3" fill="none" />
        <path d={`M${cx - 4.5} ${top + 10} V${face - 6} M${cx + 4.5} ${top + 10} V${face - 6}`} stroke="#c9b48a" strokeWidth={1.6} fill="none" />
      </g>
      <path d={`M${cx + 46} ${under - 46} v30 m-7.5 -9 l7.5 9 l7.5 -9`} stroke="var(--ink)" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--ink)" strokeWidth={2.6} />
    </g>
  );
}

/** The paper side's page: cream stock, a fold, the small boxed step number and a part number nobody can find. */
function PaperPage({ vb, narrow }: { vb: { x: number; y: number; w: number; h: number }; narrow: boolean }) {
  const n = narrow ? { x: 236, y: 92 } : { x: -52, y: 72 };
  const hw = narrow ? { x: 236, y: 138 } : { x: -52, y: 120 };
  return (
    <g>
      <rect x={vb.x - 2} y={vb.y - 2} width={vb.w + 4} height={vb.h + 4} fill="url(#cmp-paper)" />
      <defs>
        <linearGradient id="cmp-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f1e6" />
          <stop offset="1" stopColor="#ece7da" />
        </linearGradient>
      </defs>
      {!narrow && <path d={`M${vb.x + vb.w - 2} ${vb.y} V${vb.y + vb.h}`} stroke="#ddd6c6" strokeWidth={8} />}
      <rect x={n.x} y={n.y} width={30} height={30} fill="none" stroke="#5d5a53" strokeWidth={1.2} />
      <text x={n.x + 15} y={n.y + 21} fontSize={17} textAnchor="middle" fill="#5d5a53" fontFamily="var(--font)">
        2
      </text>
      <g transform={`translate(${hw.x} ${hw.y})`} stroke="#5d5a53" strokeWidth={1.1} fill="none">
        <rect x={0} y={0} width={92} height={46} rx={4} />
        <rect x={10} y={18} width={22} height={8} rx={3} fill="#fbf8f0" />
        <text x={40} y={26} fontSize={11} fill="#5d5a53" stroke="none" fontFamily="var(--font)">
          2x
        </text>
        <text x={10} y={40} fontSize={8.5} fill="#8a857a" stroke="none" fontFamily="var(--font)">
          101351
        </text>
      </g>
      <text x={vb.x + vb.w - (narrow ? 26 : 34)} y={vb.y + vb.h - 18} fontSize={12} textAnchor="end" fill="#8a857a" fontFamily="var(--font)">
        7
      </text>
    </g>
  );
}

/** A thin line from a note to the thing it is about. */
function Lead({ from, to, side }: { from: [number, number]; to: [number, number]; side: "paper" | "bygga" }) {
  return (
    <g className={"cmp-lead " + side}>
      <path d={`M${from[0]} ${from[1]} L${to[0]} ${to[1]}`} />
      <circle cx={from[0]} cy={from[1]} r={side === "paper" ? 2.5 : 3.5} />
    </g>
  );
}

/** A note on the drawing, faded out as the other side covers it. */
function Chip({ note, style, x, pos }: { note: Note; style: React.CSSProperties; x: number; pos: MotionValue<number> }) {
  // paper notes show while the paper covers them, Bygga notes once it has moved past
  const opacity = useTransform(pos, (p) => Math.min(1, Math.max(0, (note.side === "paper" ? p - x - 4 : x - p - 4) / 8)));
  const scale = useTransform(opacity, [0, 1], [0.92, 1]);
  return (
    <motion.span className={"cmp-chip " + note.side} style={{ ...style, opacity, scale }}>
      {note.side === "paper" ? <i>?</i> : <ICheck size={13} strokeWidth={3} />}
      {note.text}
    </motion.span>
  );
}

/** The step read out loud, with the real clips the guide plays. */
function Voice({ style }: { style: React.CSSProperties }) {
  const lines = useMemo(() => {
    const spec = catalogSpec("kallax-2x2");
    if (!spec) return [] as string[];
    try {
      return stepLines(buildPlan(spec), 1);
    } catch {
      return [] as string[];
    }
  }, []);
  const [at, setAt] = useState<number | null>(null);
  const el = useRef<HTMLAudioElement | null>(null);
  const run = useRef(0);
  useEffect(() => () => el.current?.pause(), []);

  const play = async () => {
    if (at !== null) {
      run.current++;
      el.current?.pause();
      setAt(null);
      return;
    }
    const my = ++run.current;
    el.current ??= new Audio();
    for (let i = 0; i < lines.length; i++) {
      if (run.current !== my) return;
      setAt(i);
      const a = el.current;
      a.src = `${VOICE_DIR}/${clipId(lines[i])}.mp3`;
      const ok = await new Promise<boolean>((res) => {
        a.onended = () => res(true);
        a.onerror = () => res(false);
        a.play().catch(() => res(false));
      });
      if (!ok) break;
      await new Promise((r) => setTimeout(r, 260));
    }
    if (run.current === my) setAt(null);
  };

  const text = at !== null ? lines[at] : (lines[1] ?? "Stand the dividers on the dowels.");
  return (
    <div className="cmp-voice" style={style}>
      <button className={"cmp-play" + (at !== null ? " on" : "")} onClick={play} aria-label={at !== null ? "Stop the voice" : "Hear this step read out loud"}>
        {at !== null ? (
          <span className="eq on" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        ) : (
          <IPlay size={16} />
        )}
      </button>
      <span className="cmp-line" aria-live="polite">
        {text}
      </span>
      <span className="cmp-say">Say &ldquo;next&rdquo;</span>
    </div>
  );
}
