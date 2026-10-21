"use client";

import Link from "next/link";
import type { Plan } from "@/lib/types";
import type { Progress } from "@/lib/store";
import { floorSpace, totals } from "@/lib/plan/contents";
import { IArrowRight, IBox, IClock, IExternal, IPeople, IPerson, IRuler, ISparkle, IWrench } from "../art/Icons";
import { Dots } from "./ui";
import { TOOL_INFO } from "../art/Tools";

export default function CoverPanel({
  plan,
  via,
  resume,
  onStart,
  onResume,
}: {
  plan: Plan;
  via: "catalog" | "ai" | "guess" | "scan";
  resume: Progress | null;
  onStart: () => void;
  onResume: () => void;
}) {
  const s = plan.spec;
  const t = totals(plan);
  const resumable = resume && (resume.phase !== "cover" || resume.step > 0) && resume.phase !== "done";
  const official = `https://www.ikea.com/search/?q=${encodeURIComponent(s.name)}`;
  const tools = plan.tools.filter((x) => !x.optional && !x.included).map((x) => TOOL_INFO[x.id].name.replace("Phillips ", ""));
  return (
    <div className="pane cover">
      <div className="pane-scroll">
        <header className="pane-head">
          <p className="eyebrow">{s.brand ? `${s.brand}, ${s.category.toLowerCase()}` : s.category}</p>
          <h1 className="product-name">{s.name}</h1>
          <p className="product-variant">{s.variant}</p>
        </header>

        {s.variants && s.variants.length > 1 && (
          <div className="chips" role="list" aria-label="Other sizes">
            {s.variants.map((v) => (
              <Link key={v.slug} href={`/build/${v.slug}`} className={"chip" + (v.slug === s.slug ? " on" : "")} role="listitem" replace>
                {shortVariant(v.label)}
              </Link>
            ))}
          </div>
        )}

        <dl className="stats">
          <div>
            <dt>
              <IClock size={16} /> Time
            </dt>
            <dd>{fmtMin(s.minutes)}</dd>
          </div>
          <div>
            <dt>{s.people === 2 ? <IPeople size={16} /> : <IPerson size={16} />} People</dt>
            <dd>{s.people === 2 ? "Two" : "One"}</dd>
          </div>
          <div>
            <dt>
              <Dots value={s.difficulty} /> Level
            </dt>
            <dd>{["", "Easy", "Medium", "Patient"][s.difficulty]}</dd>
          </div>
        </dl>

        <h3 className="section-title">Before you start</h3>
        <ul className="prep">
          <li>
            <span className="prep-ico">
              <IRuler size={18} />
            </span>
            <span>
              Clear <b>{floorSpace(plan)}</b> of floor and lay the flattened box down as a mat.
            </span>
          </li>
          <li>
            <span className="prep-ico">
              <IBox size={18} />
            </span>
            <span>
              <b>{t.panels} panels</b> and <b>{t.fittings} fittings</b> in {plan.steps.length} steps.
            </span>
          </li>
          {tools.length > 0 && (
            <li>
              <span className="prep-ico">
                <IWrench size={18} />
              </span>
              <span>
                You&apos;ll want a <b>{tools.join(" and a ").toLowerCase()}</b>.
              </span>
            </li>
          )}
          {t.twoAt.length > 0 && s.people === 1 && (
            <li>
              <span className="prep-ico">
                <IPeople size={18} />
              </span>
              <span>Ask someone to help with step {t.twoAt.slice(0, 2).join(" and ")}.</span>
            </li>
          )}
          {s.watchOut?.slice(0, 2).map((w) => (
            <li key={w}>
              <span className="prep-ico">
                <ISparkle size={18} />
              </span>
              <span>{w}</span>
            </li>
          ))}
        </ul>

        {s.siblings && s.siblings.length > 0 && (
          <>
            <h3 className="section-title">Other {s.name} products</h3>
            <div className="chips">
              {s.siblings.slice(0, 6).map((v) => (
                <Link key={v.slug} href={`/build/${v.slug}`} className="chip ghost">
                  {v.label}
                </Link>
              ))}
            </div>
          </>
        )}

        {via === "scan" ? (
          <div className="callout note">
            <ISparkle size={18} />
            <div>
              <b>{s.custom?.fromCover ? "Drawn from the cover" : "Made from your manual"}</b>
              <span>
                {s.custom?.fromCover
                  ? "Together AI only saw the cover, so this is a typical build for this product. Scan the inside pages for an exact match."
                  : "Together AI read your pages and drew each step. Check every step against the paper manual before you fix anything."}
              </span>
              {s.custom?.fromCover && (
                <Link href="/scan" className="callout-link">
                  Scan the pages
                </Link>
              )}
            </div>
          </div>
        ) : (
          via !== "catalog" && (
            <div className="callout note">
              <ISparkle size={18} />
              <div>
                <b>{via === "ai" ? "Drafted with Together AI" : "A typical build"}</b>
                <span>
                  {via === "ai"
                    ? "Built from what Together AI knows about this product. If your box looks different, trust the paper manual."
                    : "We don't know this exact product yet, so this follows a typical build. Keep the paper manual close."}
                </span>
              </div>
            </div>
          )
        )}
        {via !== "scan" && (
          <a className="official" href={official} target="_blank" rel="noreferrer">
            Official manual on ikea.com <IExternal size={15} />
          </a>
        )}
      </div>
      <div className="pane-foot">
        {resumable ? (
          <>
            <button className="btn primary big" onClick={onResume}>
              <span>{resume.phase === "steps" ? `Continue at step ${resume.step + 1}` : "Continue"}</span>
              <IArrowRight />
            </button>
            <div className="foot-row center">
              <button className="btn link" onClick={onStart}>
                Start again from the beginning
              </button>
            </div>
          </>
        ) : (
          <button className="btn primary big" onClick={onStart} autoFocus>
            <span>Start building</span>
            <IArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}

function shortVariant(l: string) {
  return l
    .replace(/^[^,]+,\s*/, "")
    .replace(/^chest of /i, "")
    .replace(/^drawer unit, /i, "")
    .replace(/^shoe cabinet with /i, "");
}

export function fmtMin(m: number) {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60), r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}
