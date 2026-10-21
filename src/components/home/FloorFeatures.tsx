"use client";

import { useState } from "react";

const C = Math.cos(Math.PI / 6);
const S = 0.5;
const OX = 280;
const OY = 352;
type V = [number, number, number];
const P = ([x, y, z]: V): [number, number] => [OX + (x - z) * C, OY + (x + z) * S - y];
const path = (...pts: V[]) => "M" + pts.map((p) => P(p).map((n) => n.toFixed(1)).join(" ")).join(" L") + " Z";

/** Iso box faces we can see from the front corner: top, right (+x) and left (+z). */
function box(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number) {
  return {
    top: path([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]),
    right: path([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]),
    left: path([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]),
  };
}

const FEATURES = [
  { title: "Say “next”", text: "Voice moves the steps along." },
  { title: "Screen stays on", text: "It won't dim mid step." },
  { title: "Which screw is this?", text: "Snap it, we'll name it." },
  { title: "Turn it around", text: "Drag to see any side." },
];

const PHONE = { x0: -66, x1: 66, y0: 18, y1: 246, z0: 0, z1: 12 };
const BOX = box(-40, 104, 0, 34, -214, -78);
const STAND = box(-48, 48, 0, 18, -10, 34);
const PH = box(PHONE.x0, PHONE.x1, PHONE.y0, PHONE.y1, PHONE.z0, PHONE.z1);
const SCREEN = P([PHONE.x0, PHONE.y1, PHONE.z1]);
const LABEL = P([-4, 34, -150]);
const SUN = P([46, 226, 12]);
const ARC = P([0, 92, 12]);

const CALLOUTS: { n: number; at: [number, number]; badge: [number, number] }[] = [
  { n: 1, at: [74, 114], badge: [44, 70] },
  { n: 2, at: [SUN[0], SUN[1]], badge: [392, 126] },
  { n: 3, at: [470, 404], badge: [528, 360] },
  { n: 4, at: [ARC[0] - 2, ARC[1] + 6], badge: [130, 302] },
];

export default function FloorFeatures() {
  const [on, setOn] = useState<number | null>(null);
  return (
    <section className="floor">
      <div className="floor-head">
        <h2 className="sec-title">Works with your hands full</h2>
        <p className="floor-sub">Made for the floor, with your phone propped against the box.</p>
      </div>

      <div className="floor-art" data-on={on ?? undefined}>
        <svg viewBox="0 40 600 410" aria-hidden="true">
          <ellipse cx="320" cy="394" rx="210" ry="24" fill="#efede7" />

          {/* the flat pack box lying behind */}
          <g strokeLinejoin="round" stroke="var(--ink)" strokeWidth="2.2">
            <path d={BOX.left} fill="#fff" />
            <path d={BOX.right} fill="#efede7" />
            <path d={BOX.top} fill="#fff" />
          </g>
          <g transform={`translate(${LABEL[0]} ${LABEL[1]}) matrix(${C} ${S} ${-C} ${S} 0 0)`}>
            <rect x="0" y="-14" width="58" height="28" rx="3" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.8" />
          </g>

          {/* stand and phone */}
          <g strokeLinejoin="round" stroke="var(--ink)" strokeWidth="2.2">
            <path d={STAND.left} fill="#fff" />
            <path d={STAND.right} fill="#efede7" />
            <path d={STAND.top} fill="#fff" />
            <path d={PH.right} fill="#efede7" />
            <path d={PH.top} fill="#fff" />
            <path d={PH.left} fill="#fff" />
          </g>
          <g transform={`translate(${SCREEN[0]} ${SCREEN[1]}) matrix(${C} ${S} 0 1 0 0)`}>
            <rect x="8" y="8" width="116" height="212" rx="12" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
            <g>
              <circle cx="110" cy="26" r="3.4" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
              <path d="M110 18.5v2M110 31.5v2M102.5 26h2M115.5 26h2M104.7 20.7l1.4 1.4M113.9 29.9l1.4 1.4M104.7 31.3l1.4-1.4M113.9 22.1l1.4-1.4" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" />
            </g>
            <g strokeLinejoin="round" stroke="var(--ink)" strokeWidth="1.6">
              <path d="M40 92 L76 71 L102 86 L66 107 Z" fill="#fff" />
              <path d="M66 107 L102 86 L102 132 L66 153 Z" fill="#efede7" />
              <path d="M40 92 L66 107 L66 153 L40 138 Z" fill="#fff" />
              <path d="M53 99.5 V145.5 M40 115 L66 130" fill="none" />
            </g>
            <path d="M32 160 Q66 182 106 154 M101 149 L109 152 L104 159" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="18" y="196" width="96" height="16" rx="8" fill="var(--ink)" />
          </g>

          {/* speech bubble */}
          <path d="M62 112 h88 a14 14 0 0 1 14 14 v12 a14 14 0 0 1 -14 14 h-56 l-16 14 l2 -14 h-18 a14 14 0 0 1 -14 -14 v-12 a14 14 0 0 1 14 -14 z" fill="#fff" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
          <text x="106" y="138" fontSize="17" fontWeight="600" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font)">
            &ldquo;Next&rdquo;
          </text>
          <path d="M178 120 q8 12 0 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />

          {/* one loose screw */}
          <g transform="translate(446 402) rotate(24)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            <rect x="-4" y="-7" width="11" height="14" rx="2.5" fill="#fff" />
            <path d="M7 -3.5 H40 L44 0 L40 3.5 H7 Z" fill="#fff" />
            <path d="M15 -3.5 l2 7 M22 -3.5 l2 7 M29 -3.5 l2 7" fill="none" strokeWidth="1.4" />
          </g>

          {CALLOUTS.map((c) => (
            <g key={c.n} className={"co co-" + c.n}>
              <path d={`M${c.badge[0]} ${c.badge[1]} L${c.at[0]} ${c.at[1]}`} className="co-line" />
              <circle cx={c.at[0]} cy={c.at[1]} r="3" className="co-dot" />
              <circle cx={c.badge[0]} cy={c.badge[1]} r="14" className="co-badge" />
              <text x={c.badge[0]} y={c.badge[1] + 5} textAnchor="middle" className="co-n">
                {c.n}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <ol className="floor-key">
        {FEATURES.map((f, i) => (
          <li key={f.title} className={on === i + 1 ? "on" : ""} onMouseEnter={() => setOn(i + 1)} onMouseLeave={() => setOn(null)}>
            <span className="fl-n">{i + 1}</span>
            <b>{f.title}</b>
            <span>{f.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
