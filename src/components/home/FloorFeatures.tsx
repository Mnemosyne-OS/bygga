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
  { title: "Say “next”", text: "Voice control moves the steps along while your hands hold the panels." },
  { title: "The screen stays on", text: "No tapping with dusty fingers. It won't dim halfway through a step." },
  { title: "Which screw is this?", text: "Snap a photo of a loose part and we'll tell you where it goes." },
  { title: "Turn it around", text: "Drag any drawing to see it from the side, the back or underneath." },
];

const PHONE = { x0: -66, x1: 66, y0: 18, y1: 246, z0: 0, z1: 12 };
const BOX = box(-40, 104, 0, 34, -214, -78);
const STAND = box(-48, 48, 0, 18, -10, 34);
const PH = box(PHONE.x0, PHONE.x1, PHONE.y0, PHONE.y1, PHONE.z0, PHONE.z1);
const SCREEN = P([PHONE.x0, PHONE.y1, PHONE.z1]);
const LABEL = P([-4, 34, -150]);

// callout anchors (target) and badge positions
const CALLOUTS: { n: number; at: [number, number]; badge: [number, number] }[] = [
  { n: 1, at: [70, 112], badge: [40, 64] },
  { n: 2, at: [P([46, 226, 12])[0], P([46, 226, 12])[1]], badge: [384, 120] },
  { n: 3, at: [454, 410], badge: [526, 352] },
  { n: 4, at: [P([0, 92, 12])[0] - 2, P([0, 92, 12])[1] + 6], badge: [124, 300] },
];

export default function FloorFeatures() {
  const [on, setOn] = useState<number | null>(null);
  return (
    <section className="floor">
      <div className="floor-copy">
        <h2 className="sec-title">Works with your hands full</h2>
        <p className="floor-sub">Made for building on the floor, with a phone propped against the box.</p>
        <ol className="floor-list">
          {FEATURES.map((f, i) => (
            <li key={f.title} className={on === i + 1 ? "on" : ""} onMouseEnter={() => setOn(i + 1)} onMouseLeave={() => setOn(null)}>
              <span className="fl-n">{i + 1}</span>
              <span className="fl-text">
                <b>{f.title}</b>
                <span>{f.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="floor-art" data-on={on ?? undefined}>
        <svg viewBox="0 0 600 460" aria-hidden="true">
          {/* ground shadow */}
          <ellipse cx="320" cy="392" rx="230" ry="30" fill="#efede7" />

          {/* the flat pack box lying behind */}
          <g strokeLinejoin="round" stroke="var(--ink)" strokeWidth="2.2">
            <path d={BOX.left} fill="#fff" />
            <path d={BOX.right} fill="#efede7" />
            <path d={BOX.top} fill="#fff" />
          </g>
          <g transform={`translate(${LABEL[0]} ${LABEL[1]}) matrix(${C} ${S} ${-C} ${S} 0 0)`}>
            <rect x="0" y="-14" width="58" height="28" rx="3" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.8" />
            <path d="M8 -4 h30 M8 4 h20" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* stand */}
          <g strokeLinejoin="round" stroke="var(--ink)" strokeWidth="2.2">
            <path d={STAND.left} fill="#fff" />
            <path d={STAND.right} fill="#efede7" />
            <path d={STAND.top} fill="#fff" />
          </g>

          {/* phone */}
          <g strokeLinejoin="round" stroke="var(--ink)" strokeWidth="2.2">
            <path d={PH.right} fill="#efede7" />
            <path d={PH.top} fill="#fff" />
            <path d={PH.left} fill="#fff" />
          </g>
          <g transform={`translate(${SCREEN[0]} ${SCREEN[1]}) matrix(${C} ${S} 0 1 0 0)`} className="fa-screen">
            <rect x="8" y="8" width="116" height="212" rx="12" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
            <text x="18" y="30" fontSize="10.5" fontWeight="600" fill="var(--ink-2)" fontFamily="var(--font)">
              Step 4 of 9
            </text>
            <g className="fa-sun">
              <circle cx="110" cy="26" r="3.4" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
              <path d="M110 18.5v2M110 31.5v2M102.5 26h2M115.5 26h2M104.7 20.7l1.4 1.4M113.9 29.9l1.4 1.4M104.7 31.3l1.4-1.4M113.9 22.1l1.4-1.4" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" />
            </g>
            {/* mini KALLAX */}
            <g strokeLinejoin="round" stroke="var(--ink)" strokeWidth="1.6">
              <path d="M40 92 L76 71 L102 86 L66 107 Z" fill="#fff" />
              <path d="M66 107 L102 86 L102 132 L66 153 Z" fill="#efede7" />
              <path d="M40 92 L66 107 L66 153 L40 138 Z" fill="#fff" />
              <path d="M53 99.5 V145.5 M40 115 L66 130" fill="none" />
            </g>
            <g className="fa-rot">
              <path d="M32 160 Q66 182 106 154" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M101 149 L109 152 L104 159" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <rect x="18" y="186" width="96" height="4" rx="2" fill="#e8e6e0" stroke="none" />
            <rect x="18" y="186" width="43" height="4" rx="2" fill="var(--ink)" stroke="none" />
            <rect x="18" y="196" width="96" height="16" rx="8" fill="var(--ink)" stroke="none" />
            <text x="66" y="207.5" fontSize="9.5" fontWeight="600" fill="#fff" textAnchor="middle" fontFamily="var(--font)">
              Next
            </text>
          </g>

          {/* speech bubble */}
          <g className="fa-voice">
            <path d="M58 112 h92 a14 14 0 0 1 14 14 v12 a14 14 0 0 1 -14 14 h-58 l-16 14 l2 -14 h-20 a14 14 0 0 1 -14 -14 v-12 a14 14 0 0 1 14 -14 z" fill="#fff" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
            <text x="104" y="138" fontSize="17" fontWeight="600" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font)">
              &ldquo;Next&rdquo;
            </text>
            <path d="M174 118 q8 14 0 28 M184 110 q14 22 0 44" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* loose hardware on the floor */}
          <g className="fa-hw" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            <g transform="translate(430 404) rotate(28)">
              <rect x="-4" y="-7" width="11" height="14" rx="2.5" fill="#fff" />
              <path d="M7 -3.5 H40 L44 0 L40 3.5 H7 Z" fill="#fff" />
              <path d="M14 -3.5 l2 7 M20 -3.5 l2 7 M26 -3.5 l2 7 M32 -3.5 l2 7" fill="none" strokeWidth="1.4" />
            </g>
            <g transform="translate(494 392) rotate(-22)">
              <rect x="-18" y="-5.5" width="36" height="11" rx="5.5" fill="#f6efd2" />
              <path d="M-11 -5.5 v11 M-4 -5.5 v11 M3 -5.5 v11 M10 -5.5 v11" fill="none" strokeWidth="1.2" />
            </g>
            <g transform="translate(516 426)">
              <ellipse cx="0" cy="0" rx="15" ry="9" fill="#fff" />
              <path d="M-7 -1.5 L6 2.5" fill="none" strokeWidth="2.4" />
            </g>
          </g>

          {/* callouts */}
          {CALLOUTS.map((c) => (
            <g key={c.n} className={"co co-" + c.n}>
              <path d={`M${c.badge[0]} ${c.badge[1]} L${c.at[0]} ${c.at[1]}`} className="co-line" />
              <circle cx={c.at[0]} cy={c.at[1]} r="3.4" className="co-dot" />
              <circle cx={c.badge[0]} cy={c.badge[1]} r="15" className="co-badge" />
              <text x={c.badge[0]} y={c.badge[1] + 5} textAnchor="middle" className="co-n">
                {c.n}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
