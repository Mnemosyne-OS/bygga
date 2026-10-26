"use client";

import { motion } from "motion/react";
import type { Plan, WarnId } from "@/lib/types";
import { stepContents, tipFor } from "@/lib/plan/contents";
import { HwArt } from "../art/Hardware";
import { ToolArt, TOOL_INFO } from "../art/Tools";
import { IArrowLeft, IArrowRight, ICheck, IClock, IClose, IHelp, IMic, ISparkle, WarnIcon, WARN_TEXT } from "../art/Icons";
import { TwoPeople } from "../art/Figure";
import Thumb from "../Thumb";

export function minutesLeft(plan: Plan, index: number) {
  return plan.steps.slice(index).reduce((s, x) => s + x.minutes, 0);
}

export default function StepPanel({
  plan,
  index,
  dir,
  onNext,
  onBack,
  onHover,
  onHelp,
  offer,
}: {
  plan: Plan;
  index: number;
  dir: number;
  onNext: () => void;
  onBack: () => void;
  onHover: (ids: string[] | null) => void;
  onHelp: () => void;
  /** Invite to turn voice on, while it is off. */
  offer?: { again: boolean; listen: boolean; onStart: () => void; onDismiss: () => void } | null;
}) {
  const s = plan.steps[index];
  const c = stepContents(plan, index);
  const last = index === plan.steps.length - 1;
  const tip = tipFor(plan, index);
  const isBig = (w: WarnId) => w === "two" || w === "tip" || w === "wall";
  const big = s.warnings.filter((w) => isBig(w) && !(w === "wall" && s.warnings.includes("tip")));
  const small = s.warnings.filter((w) => !isBig(w));
  const next = plan.steps[index + 1];
  const twoAhead = s.people === 1 ? plan.steps.slice(index + 1, index + 3).findIndex((x) => x.people === 2) : -1;
  const id = plan.spec.name + plan.spec.variant;
  const hasNeeds = c.parts.length + c.hardware.length + s.tools.length > 0;
  const left = minutesLeft(plan, index);

  return (
    <div className="pane step-pane">
      <div className="pane-scroll">
        {offer && (
          <div className="voice-offer">
            <div className="voice-offer-text">
              <b>
                {offer.again ? (
                  "Turn voice back on?"
                ) : (
                  <>
                    Hands full?<span className="vo-more"> Turn on voice</span>
                  </>
                )}
              </b>
              <span>{offer.listen ? "Each step is read out loud. Say “next” to move on." : "Each step is read out loud. Tap done to move on."}</span>
            </div>
            <button className="btn voice-offer-go" onClick={offer.onStart}>
              <IMic size={17} />
              Turn on
            </button>
            <button className="voice-offer-x" onClick={offer.onDismiss} aria-label="Not now">
              <IClose size={16} />
            </button>
          </div>
        )}
        <motion.div key={index} initial={{ opacity: 0, x: 22 * dir }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <header className="pane-head">
            <div className="step-meta">
              <span className="eyebrow">
                Step {index + 1} of {plan.steps.length}
              </span>
              <span className="time-pill" title="Time left for the whole build">
                <IClock size={14} /> {left < 60 ? `${left} min left` : `${Math.round(left / 6) / 10} h left`}
              </span>
            </div>
            <h2 className="step-title">{s.title}</h2>
            {s.detail && <p className="sub">{s.detail}</p>}
          </header>

          {s.repeat && s.repeat > 1 && (
            <div className="callout repeat">
              <span className="repeat-badge">{s.repeat}&times;</span>
              <span>
                Do this for all {s.repeat} {plan.spec.archetype === "drawers" ? "drawers" : "of them"}. Counts below are for one.
              </span>
            </div>
          )}

          {big.map((w) => (
            <div key={w} className={"callout warn " + w}>
              {w === "two" ? <TwoPeople size={36} /> : <WarnIcon id={w} size={36} />}
              <div>
                <b>{w === "two" ? "Grab a second person" : w === "tip" ? "This stops it tipping over" : "You'll need to drill"}</b>
                <span>{w === "two" ? "It's heavy or awkward for one." : w === "tip" ? "Kids climb. Always fix it to the wall." : "The screws and plugs for your wall aren't in the box."}</span>
              </div>
            </div>
          ))}

          {hasNeeds && (
            <>
              <h3 className="section-title">You need</h3>
              <ul className="needs">
                {c.parts.map(({ type, count }) => (
                  <li key={type.id} onMouseEnter={() => onHover([type.id])} onMouseLeave={() => onHover(null)}>
                    <Thumb id={id} plan={plan} mode={{ kind: "part", ref: type.id }} w={96} h={68} className="need-thumb" />
                    <span className="letter sm">{type.label}</span>
                    <span className="need-name">{type.name}</span>
                    <span className="need-qty">{count}&times;</span>
                  </li>
                ))}
                {c.hardware.map(({ type, count }) => (
                  <li key={type.id} onMouseEnter={() => onHover([type.id])} onMouseLeave={() => onHover(null)}>
                    <span className="need-art">
                      <HwArt kind={type.kind} len={type.len} dia={type.dia} fit={40} />
                    </span>
                    <span className="need-name">
                      {type.notIncluded ? (type.kind === "plug" ? "Wall plug" : "Wall screw") : type.name}
                      {type.spec && <small>{type.spec}</small>}
                    </span>
                    <span className="need-qty">{count}&times;</span>
                  </li>
                ))}
                {s.tools.map((t) => (
                  <li key={t} className="tool">
                    <span className="need-art">
                      <ToolArt id={t} size={40} />
                    </span>
                    <span className="need-name">{TOOL_INFO[t].name}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {small.length > 0 && (
            <div className="warn-row">
              {small.map((w) => (
                <span key={w} className="warn-chip">
                  <WarnIcon id={w} size={24} />
                  {WARN_TEXT[w]}
                </span>
              ))}
            </div>
          )}

          {tip && (
            <div className="callout tip">
              <ISparkle size={18} />
              <span>{tip}</span>
            </div>
          )}

          {twoAhead >= 0 && (
            <p className="heads-up">
              <TwoPeople size={22} /> Heads up: step {index + 2 + twoAhead} needs a second pair of hands.
            </p>
          )}

          {next ? (
            <button className="upnext" onClick={onNext}>
              <span className="upnext-label">Up next</span>
              <span className="upnext-body">
                <Thumb id={id} plan={plan} mode={{ kind: "step", index: index + 1 }} w={150} h={110} className="upnext-thumb" />
                <span className="upnext-text">
                  <b>{index + 2}</b>
                  <span>{next.title}</span>
                </span>
                <IArrowRight size={18} />
              </span>
            </button>
          ) : (
            <div className="upnext final">
              <span className="upnext-label">Last step</span>
              <span className="upnext-body">
                <span className="upnext-text">
                  <span>After this one, it&apos;s built.</span>
                </span>
              </span>
            </div>
          )}
        </motion.div>
      </div>
      <div className="pane-foot">
        <button className="btn round" onClick={onBack} aria-label="Previous step" title="Previous (left arrow)">
          <IArrowLeft />
        </button>
        <button className="btn primary big done-btn" onClick={onNext} title="Next (right arrow or space)">
          <span className="done-ico">
            <ICheck size={18} strokeWidth={2.8} />
          </span>
          <span className="done-label">{last ? "Done, finish up" : "Done, next step"}</span>
          <IArrowRight />
        </button>
        <div className="foot-row">
          <button className="btn link stuck" onClick={onHelp}>
            <IHelp size={17} /> Stuck?
          </button>
          <span className="kbd-hint" aria-hidden="true">
            <kbd>&larr;</kbd>
            <kbd>&rarr;</kbd> to move, <kbd>R</kbd> to replay
          </span>
        </div>
      </div>
    </div>
  );
}
