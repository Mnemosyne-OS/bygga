"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { Plan } from "@/lib/types";
import { totals } from "@/lib/plan/contents";
import { Figure } from "../art/Figure";
import { IArrowLeft, IArrowRight, ICheck, ILibrary, IShare } from "../art/Icons";
import { fmtMin } from "./CoverPanel";
import { encodeSpec } from "@/lib/scan/share";

export default function DonePanel({ plan, slug, startedAt, doneAt, onReview }: { plan: Plan; slug: string; startedAt?: number; doneAt?: number; onReview: () => void }) {
  const t = totals(plan);
  const spent = startedAt && doneAt ? Math.max(1, Math.round((doneAt - startedAt) / 60000)) : null;
  const a = plan.spec.archetype;
  const recheck = a === "table" || a === "bed" || a === "seat" || a === "sofa";
  const tall = plan.steps.some((s) => s.kind === "anchor");
  const faster = spent !== null && spent < plan.spec.minutes;
  const [copied, setCopied] = useState(false);

  const share = async () => {
    // scanned guides only exist in this browser, so the link carries the guide itself
    const url = `${location.origin}/build/${slug}` + (plan.spec.source === "scan" ? `#g=${await encodeSpec(plan.spec)}` : "");
    const text = `I just built ${plan.spec.name} with Bygga.`;
    try {
      if (navigator.share) await navigator.share({ title: "Bygga", text, url });
      else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* cancelled */
    }
  };

  return (
    <div className="pane done">
      <div className="pane-scroll">
        <motion.div className="done-hero" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}>
          <Figure pose="cheer" size={104} bubble="check" className="bounce" />
        </motion.div>
        <motion.h2 className="done-title" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          You built {plan.spec.name}.
        </motion.h2>
        <motion.p className="sub center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {faster ? `${plan.spec.minutes - spent!} minutes faster than most people.` : "Every step done. Nice work."}
        </motion.p>
        <dl className="stats">
          <div>
            <dt>{spent ? "Your time" : "Typical time"}</dt>
            <dd>{fmtMin(spent ?? t.minutes)}</dd>
          </div>
          <div>
            <dt>Steps</dt>
            <dd>{plan.steps.length}</dd>
          </div>
          <div>
            <dt>Fittings</dt>
            <dd>{t.fittings}</dd>
          </div>
        </dl>
        <Link href="/builds" className="workshop-link">
          <span className="wl-ico">
            <ILibrary size={18} />
          </span>
          <span>
            <b>Saved to your workshop</b>
            <span>See everything you&apos;ve built, side by side.</span>
          </span>
          <IArrowRight size={18} />
        </Link>
        <h3 className="section-title">Before you load it up</h3>
        <ul className="after">
          {tall && (
            <li>
              <ICheck size={16} strokeWidth={2.6} /> Double check it&apos;s fixed to the wall.
            </li>
          )}
          {recheck && (
            <li>
              <ICheck size={16} strokeWidth={2.6} /> Tighten every bolt again after a week. Wood settles.
            </li>
          )}
          <li>
            <ICheck size={16} strokeWidth={2.6} /> Spare fittings are normal. Tape the bag inside, with the Allen key.
          </li>
          <li>
            <ICheck size={16} strokeWidth={2.6} /> Flatten the box for recycling.
          </li>
        </ul>
      </div>
      <div className="pane-foot">
        <button className="btn round" onClick={onReview} aria-label="Back to the last step">
          <IArrowLeft />
        </button>
        <button className="btn round" onClick={share} aria-label="Share" data-tip={copied ? "Link copied" : "Share"}>
          {copied ? <ICheck /> : <IShare />}
        </button>
        <Link className="btn primary big" href="/">
          <span>Build something else</span>
          <IArrowRight />
        </Link>
      </div>
    </div>
  );
}

const PIECES = ["dowel", "screw", "cam", "pin", "nail", "dowel", "screw"];

export function Confetti() {
  const bits = Array.from({ length: 36 }, (_, i) => i);
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((i) => {
        const left = (i * 37) % 100;
        const delay = (i % 9) * 0.09;
        const dur = 1.8 + ((i * 13) % 10) / 10;
        const rot = ((i * 71) % 360) - 180;
        const kind = PIECES[i % PIECES.length];
        const yellow = i % 4 === 0;
        return (
          <motion.span
            key={i}
            className="bit"
            style={{ left: `${left}%` }}
            initial={{ y: -40, rotate: 0, opacity: 0 }}
            animate={{ y: "110vh", rotate: rot * 3, opacity: [0, 1, 1, 0] }}
            transition={{ duration: dur, delay, ease: [0.25, 0.1, 0.4, 1] }}
          >
            <Bit kind={kind} yellow={yellow} />
          </motion.span>
        );
      })}
    </div>
  );
}

function Bit({ kind, yellow }: { kind: string; yellow: boolean }) {
  const f = yellow ? "var(--accent)" : "#fff";
  const s = { stroke: "var(--ink)", strokeWidth: 1.6, strokeLinejoin: "round" as const };
  switch (kind) {
    case "dowel":
      return (
        <svg width="28" height="10" viewBox="0 0 28 10">
          <rect x="1" y="1" width="26" height="8" rx="3" fill={yellow ? f : "#f1e2c3"} {...s} />
        </svg>
      );
    case "screw":
      return (
        <svg width="26" height="12" viewBox="0 0 26 12">
          <path d="M4 3.5h17l4 2.5-4 2.5H4z" fill={f} {...s} />
          <rect x="1" y="1" width="3.4" height="10" rx="1.2" fill={f} {...s} />
        </svg>
      );
    case "cam":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="7.5" fill={f} {...s} />
          <path d="M5 7.5l8 3" {...s} strokeWidth={2} />
        </svg>
      );
    case "pin":
      return (
        <svg width="18" height="10" viewBox="0 0 18 10">
          <rect x="1" y="3" width="16" height="4" rx="2" fill={f} {...s} />
          <rect x="7.6" y="1" width="2" height="8" fill={f} {...s} />
        </svg>
      );
    default:
      return (
        <svg width="22" height="8" viewBox="0 0 22 8">
          <path d="M2 3h16l3 1-3 1H2z" fill={f} {...s} />
          <rect x="1" y="1" width="1.4" height="6" fill={f} {...s} />
        </svg>
      );
  }
}
