"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { Plan, ProductSpec, ToolId } from "@/lib/types";
import { catalogSpec } from "@/lib/catalog";
import { buildPlan } from "@/lib/plan";
import { stepContents } from "@/lib/plan/contents";
import { matchCatalog, specForKind } from "@/lib/search";
import { KIND_LABELS, type Kind } from "@/lib/products";
import { cacheSpec, cachedSpec, loadProgress, saveProgress, type Phase, type Progress } from "@/lib/store";
import StageView, { type StageHandle } from "../StageView";
import type { StageMode } from "@/engine/stage";
import { LogoMark } from "../Logo";
import { HwArt } from "../art/Hardware";
import { Figure } from "../art/Figure";
import { IBox, ICheck, IFlag, IGrid, IHammer, IHelp, IMic, IPause, IPlay, IReplay, IRotate, IScan, ISound, ISoundOff, ISparkle, IWrench } from "../art/Icons";
import CoverPanel from "./CoverPanel";
import ToolsPanel from "./ToolsPanel";
import PartsPanel from "./PartsPanel";
import StepPanel from "./StepPanel";
import DonePanel, { Confetti } from "./DonePanel";
import HelpSheet from "./HelpSheet";
import Overview from "./Overview";
import Loader from "./Loader";
import Thumb from "../Thumb";
import { haptic, speak, speechSupported, useHandsFree, useWakeLock } from "./hooks";
import { playDone, playStep, setSound, soundOn } from "./sound";
import { useMounted } from "@/lib/useMounted";
import { getUserKey, keyHeaders } from "@/lib/userKey";
import { decodeSpec } from "@/lib/scan/share";

type Via = "catalog" | "ai" | "guess" | "scan";

export default function GuideApp({ slug, query, step, kind }: { slug: string; query?: string; step?: number; kind?: string }) {
  const router = useRouter();
  const mounted = useMounted();
  const picked = KIND_LABELS.some((k) => k.kind === kind) ? (kind as Kind) : null;
  const isScan = slug.startsWith("scan-");
  const q = query || slug.replace(/-/g, " ");
  const initial = useMemo(() => (isScan ? null : (catalogSpec(slug) ?? (picked ? { ...specForKind(picked, q.split(" ")[0] || q), slug } : null))), [isScan, slug, picked, q]);
  const local = useMemo(() => (initial || isScan ? null : matchCatalog(q)), [initial, isScan, q]);
  const [imported, setImported] = useState<{ slug: string; spec: ProductSpec | null } | null>(null);
  const stored = useMemo(() => (mounted && !initial && !local ? cachedSpec(slug) : null), [mounted, initial, local, slug]);
  const cached = stored ?? (imported?.slug === slug ? imported.spec : null);
  const hash = useMemo(() => (mounted && isScan && location.hash.startsWith("#g=") ? location.hash.slice(3) : ""), [mounted, isScan]);

  // a scanned guide shared as a link carries its own data
  useEffect(() => {
    if (!hash) return;
    let alive = true;
    decodeSpec(hash).then((sp) => {
      if (!alive) return;
      if (sp) cacheSpec(slug, { ...sp, slug });
      setImported({ slug, spec: sp ? { ...sp, slug } : null });
      history.replaceState(null, "", location.pathname + location.search);
    });
    return () => {
      alive = false;
    };
  }, [hash, slug]);
  useEffect(() => {
    if (local?.slug && local.slug !== slug) router.replace(`/build/${local.slug}`);
  }, [local, slug, router]);
  const [fetched, setFetched] = useState<{ slug: string; spec?: ProductSpec; via?: Via; suggestions?: string[]; error?: boolean } | null>(null);
  const [ai, setAi] = useState(false);
  const result = fetched?.slug === slug ? fetched : null;
  const spec = initial ?? cached ?? result?.spec ?? null;
  const via: Via = initial ? (initial.source === "guess" ? "guess" : "catalog") : cached ? cached.source : (result?.via ?? "ai");
  const scanGone = isScan && mounted && !cached && (!hash || (imported?.slug === slug && !imported.spec));
  const status = spec ? "ready" : scanGone ? "scangone" : result ? (result.error ? "error" : "notfound") : "loading";
  const suggestions = result?.suggestions ?? [];

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((j) => setAi(!!j.ai || !!getUserKey()))
      .catch(() => {});
  }, []);

  // resolve unknown products through the API
  useEffect(() => {
    if (!mounted || initial || cached || local || isScan) return;
    let alive = true;
    fetch("/api/guide", { method: "POST", headers: { "Content-Type": "application/json", ...keyHeaders() }, body: JSON.stringify({ q }) })
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        if (j.spec) {
          const sp = j.spec as ProductSpec;
          if (j.via === "catalog" && sp.slug && sp.slug !== slug) {
            router.replace(`/build/${sp.slug}`);
            return;
          }
          sp.slug = slug;
          cacheSpec(slug, sp);
          setFetched({ slug, spec: sp, via: j.via });
        } else setFetched({ slug, suggestions: j.suggestions ?? [] });
      })
      .catch(() => alive && setFetched({ slug, error: true }));
    return () => {
      alive = false;
    };
  }, [mounted, initial, cached, local, isScan, slug, q, router]);

  const plan = useMemo(() => {
    if (!spec) return null;
    try {
      return buildPlan(spec);
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [spec]);

  if (status === "scangone")
    return (
      <Shell title="Scanned guide">
        <div className="notfound">
          <Figure pose="think" bubble="?" size={120} />
          <h1>This guide lives on another device</h1>
          <p className="sub">Scanned guides are saved in the browser that made them. Ask for a share link from the done screen, or scan the manual again.</p>
          <Link href="/scan" className="btn primary">
            Scan a manual
          </Link>
        </div>
      </Shell>
    );
  if (status === "loading")
    return (
      <Shell title={isScan ? "Scanned guide" : q.toUpperCase()}>
        <Loader query={isScan ? "your guide" : q} ai={ai} />
      </Shell>
    );
  if (status === "notfound" || status === "error" || !plan)
    return (
      <Shell title={q.toUpperCase()}>
        <NotFound query={q} slug={slug} suggestions={suggestions} error={status === "error"} />
      </Shell>
    );
  return <Guide key={slug + (picked ?? "")} plan={plan} slug={slug} via={via} ai={ai} startStep={step} />;
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="guide shell">
      <header className="topbar">
        <Link href="/" className="home-btn" aria-label="Bygga home">
          <LogoMark size={34} />
        </Link>
        <div className="tb-title">
          <b>{title}</b>
        </div>
      </header>
      <main className="shell-main">{children}</main>
    </div>
  );
}

function NotFound({ query, slug, suggestions, error }: { query: string; slug: string; suggestions: string[]; error: boolean }) {
  const name = query.split(" ")[0].toUpperCase();
  const kinds = useMemo(() => KIND_LABELS.map((k) => ({ ...k, plan: buildPlan({ ...specForKind(k.kind, "X"), slug: "kind-" + k.kind }) })), []);
  if (error)
    return (
      <div className="notfound">
        <Figure pose="think" bubble="?" size={120} />
        <h1>Something went wrong</h1>
        <p className="sub">Check your connection and try again.</p>
        <Link href="/" className="btn primary">
          Back to search
        </Link>
      </div>
    );
  return (
    <div className="notfound wide">
      <div className="nf-head">
        <Figure pose="think" bubble="?" size={96} />
        <div>
          <h1>What does {name} look like?</h1>
          <p className="sub">We don&apos;t have {name} on file yet. Pick the closest shape and we&apos;ll walk you through a typical build.</p>
        </div>
      </div>
      <div className="kind-grid">
        {kinds.map((k, i) => (
          <motion.div key={k.kind} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.025 }}>
            <Link className="kind-card" href={`/build/${slug}?q=${encodeURIComponent(query)}&kind=${k.kind}`}>
              <Thumb id={"kind-" + k.kind} plan={k.plan} mode={{ kind: "assembled" }} w={200} h={150} className="kind-thumb" />
              <span>{k.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
      {suggestions.length > 0 && (
        <div className="chips center">
          <span className="muted">Or did you mean</span>
          {suggestions.map((s) => (
            <Link key={s} className="chip" href={`/build/${encodeURIComponent(s.toLowerCase().replace(/\s+/g, "-"))}?q=${encodeURIComponent(s)}`}>
              {s}
            </Link>
          ))}
        </div>
      )}
      <Link href="/scan" className="scan-link nf-scan">
        <IScan size={17} />
        <span>
          Not from IKEA? <u>Scan its paper manual</u>
        </span>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Guide({ plan, slug, via, ai, startStep }: { plan: Plan; slug: string; via: Via; ai: boolean; startStep?: number }) {
  const steps = plan.steps;
  const deep = startStep ? Math.min(startStep, steps.length) - 1 : null;
  const [phase, setPhase] = useState<Phase>(deep !== null ? "steps" : "cover");
  const [step, setStep] = useState(deep ?? 0);
  const [dir, setDir] = useState(1);
  const [tools, setTools] = useState<string[]>([]);
  const [missing, setMissing] = useState<Set<string>>(new Set());
  const [startedAt, setStartedAt] = useState<number | undefined>();
  const [doneAt, setDoneAt] = useState<number | undefined>();
  const [resume, setResume] = useState<Progress | null>(null);
  const [maxStep, setMaxStep] = useState(0);
  const [reached, setReached] = useState(deep !== null ? 3 : 0);
  const [help, setHelp] = useState<null | { missing?: boolean }>(null);
  const [overview, setOverview] = useState(false);
  const [handsFree, setHandsFree] = useState(false);
  const [hl, setHl] = useState<string[] | null>(null);
  const [hover3d, setHover3d] = useState<string | null>(null);
  const [introPlayed, setIntroPlayed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [slow, setSlow] = useState(false);
  const [moved, setMoved] = useState(false);
  const [stamp, setStamp] = useState(0);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const [sound, setSoundState] = useState(true);
  const stage = useRef<StageHandle | null>(null);
  const mounted = useMounted();
  const canListen = mounted && speechSupported();

  // restore progress once we are in the browser
  const [restored, setRestored] = useState(false);
  if (mounted && !restored) {
    setRestored(true);
    setSoundState(soundOn());
    const p = loadProgress(slug);
    if (p) {
      setResume(p);
      setTools(p.tools);
      setMissing(new Set(p.missing ?? []));
      setStartedAt(p.startedAt);
      setMaxStep(Math.min(p.step, steps.length - 1));
      setReached(PHASES.indexOf(p.phase));
      if (p.doneAt) setDoneAt(p.doneAt);
    }
  }

  // persist
  useEffect(() => {
    if (!restored || phase === "cover") return;
    saveProgress({
      slug,
      name: plan.spec.name,
      variant: plan.spec.variant,
      category: plan.spec.category,
      minutes: plan.spec.minutes,
      people: plan.spec.people,
      phase,
      step,
      steps: steps.length,
      tools,
      parts: [],
      missing: [...missing],
      startedAt,
      doneAt,
      updatedAt: Date.now(),
      spec: plan.spec.source === "catalog" ? undefined : plan.spec,
    });
  }, [restored, slug, plan, phase, step, tools, missing, startedAt, doneAt, steps.length]);

  useWakeLock(phase === "steps" || phase === "parts");

  const go = useCallback((p: Phase, s?: number, d = 1) => {
    setDir(d);
    setPhase(p);
    setReached((r) => Math.max(r, PHASES.indexOf(p)));
    if (s !== undefined) {
      setStep(s);
      setMaxStep((m) => Math.max(m, s));
    }
    setHl(null);
    setMoved(false);
    if (p === "done") setDoneAt((x) => x ?? Date.now());
  }, []);

  const showToast = useCallback((text: string) => {
    const id = Date.now();
    setToast({ id, text });
    setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 2600);
  }, []);

  const next = useCallback(() => {
    haptic(12);
    if (phase === "cover") {
      setStartedAt((x) => x ?? Date.now());
      go("tools");
    } else if (phase === "tools") go("parts");
    else if (phase === "parts") go("steps", 0);
    else if (phase === "steps") {
      setStamp((x) => x + 1);
      if (step < steps.length - 1) {
        playStep();
        const n = step + 1;
        const half = Math.floor(steps.length / 2);
        if (steps.length >= 6 && n === half) showToast("Halfway there. Nice work.");
        else if (n === steps.length - 1 && steps.length >= 4) showToast("Last step coming up.");
        go("steps", n);
      } else {
        playDone();
        go("done");
      }
    }
  }, [phase, step, steps.length, go, showToast]);

  const back = useCallback(() => {
    if (phase === "tools") go("cover", undefined, -1);
    else if (phase === "parts") go("tools", undefined, -1);
    else if (phase === "steps") {
      if (step > 0) go("steps", step - 1, -1);
      else go("parts", undefined, -1);
    } else if (phase === "done") go("steps", steps.length - 1, -1);
  }, [phase, step, steps.length, go]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (help || overview) return;
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (phase !== "steps") return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        if (t?.tagName === "BUTTON" && (e.key === " " || e.key === "Enter")) return;
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        back();
      } else if (e.key.toLowerCase() === "r") stage.current?.replay();
      else if (e.key === "?") setHelp({});
      else if (e.key.toLowerCase() === "o") setOverview(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, next, back, help, overview]);

  // hands free
  const { listening, heard } = useHandsFree(handsFree && phase === "steps", (c) => {
    if (c === "next") next();
    else if (c === "back") back();
    else if (c === "repeat") {
      stage.current?.replay();
      const s = steps[step];
      speak(`${s.title}. ${s.detail ?? ""}`);
    } else if (c === "help") setHelp({});
    else if (c === "stop") setHandsFree(false);
  });
  useEffect(() => {
    if (!handsFree || phase !== "steps") return;
    const s = steps[step];
    const t = setTimeout(() => speak(`Step ${step + 1}. ${s.title}. ${s.detail ?? ""}`), 250);
    return () => clearTimeout(t);
  }, [handsFree, phase, step, steps]);
  useEffect(() => {
    if (!handsFree) window.speechSynthesis?.cancel();
  }, [handsFree]);

  useEffect(() => {
    const base = `${plan.spec.name} | Bygga`;
    document.title = phase === "steps" ? `Step ${step + 1} of ${steps.length}, ${base}` : phase === "done" ? `Built: ${base}` : base;
  }, [phase, step, steps.length, plan.spec.name]);

  const mode: StageMode = useMemo(() => {
    if (phase === "cover") return introPlayed || resume ? { kind: "assembled", turntable: true, dims: true } : { kind: "intro", dims: true };
    if (phase === "tools" || phase === "done") return { kind: "assembled", turntable: true };
    if (phase === "parts") return { kind: "layout" };
    return { kind: "step", index: step };
  }, [phase, step, introPlayed, resume]);

  const highlight = hl ?? (hover3d ? [hover3d] : null);
  const cur = steps[step];
  const contents = phase === "steps" ? stepContents(plan, step) : null;

  const jump = (p: Phase) => {
    if (p === "steps") go("steps", Math.min(maxStep, steps.length - 1), PHASES.indexOf(p) >= PHASES.indexOf(phase) ? 1 : -1);
    else go(p, undefined, PHASES.indexOf(p) >= PHASES.indexOf(phase) ? 1 : -1);
  };

  return (
    <div className="guide" data-phase={phase}>
      <header className="topbar">
        <Link href="/" className="home-btn" aria-label="Bygga home">
          <LogoMark size={34} />
        </Link>
        <div className="tb-title">
          <b>{plan.spec.name}</b>
          <span>{plan.spec.variant}</span>
        </div>
        <Stepper phase={phase} step={step} total={steps.length} reached={reached} onJump={jump} />
        <div className="tb-actions">
          {phase === "steps" && (
            <button className="icon-btn" onClick={() => setOverview(true)} aria-label="All steps" data-tip="All steps">
              <IGrid />
            </button>
          )}
          <button
            className="icon-btn"
            onClick={() => {
              setSound(!sound);
              setSoundState(!sound);
            }}
            aria-pressed={sound}
            aria-label={sound ? "Sound on" : "Sound off"}
            data-tip={sound ? "Sound on" : "Sound off"}
          >
            {sound ? <ISound /> : <ISoundOff />}
          </button>
          {phase === "steps" && (
            <button className={"icon-btn" + (handsFree ? " live" : "")} onClick={() => setHandsFree((h) => !h)} aria-pressed={handsFree} aria-label="Hands-free mode" data-tip={canListen ? "Hands-free" : "Read aloud"}>
              <IMic />
            </button>
          )}
          <button className="icon-btn" onClick={() => setHelp({})} aria-label="Help" data-tip="Help">
            <IHelp />
          </button>
        </div>
      </header>

      <main className="guide-main">
        <section className="sheet" aria-label="Assembly drawing">
          <StageView
            plan={plan}
            mode={mode}
            highlight={highlight}
            paused={paused}
            speed={slow ? 0.5 : 1}
            options={{ callout: true, interactive: true }}
            onReady={(h) => (stage.current = h)}
            onIntroDone={() => setIntroPlayed(true)}
            onHover={setHover3d}
            onUserView={setMoved}
          />

          {phase === "steps" && cur && (
            <div className="corner" aria-hidden="true">
              <div className="num-wrap">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={step}
                    className="big-n"
                    initial={{ y: 46 * dir, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -46 * dir, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  >
                    {step + 1}
                  </motion.span>
                </AnimatePresence>
                {cur.repeat && cur.repeat > 1 && <span className="corner-repeat">{cur.repeat}&times;</span>}
              </div>
              {contents && contents.hardware.length > 0 && (
                <motion.div key={"hw" + step} className="hw-box" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.35 }}>
                  {contents.hardware.slice(0, 4).map(({ type, count }) => (
                    <span key={type.id} className={"hw-box-item" + (highlight?.includes(type.id) ? " lit" : "")}>
                      <HwArt kind={type.kind} len={type.len} dia={type.dia} fit={40} />
                      <b>{count}&times;</b>
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          <AnimatePresence>
            {stamp > 0 && phase === "steps" && (
              <motion.span
                key={stamp}
                className="stamp"
                initial={{ scale: 0.3, opacity: 0, rotate: -20 }}
                animate={{ scale: [0.3, 1.12, 1], opacity: [0, 1, 1, 0], rotate: 0 }}
                transition={{ duration: 0.85, times: [0, 0.35, 0.6, 1] }}
              >
                <ICheck size={34} strokeWidth={3} />
              </motion.span>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {toast && (
              <motion.div key={toast.id} className="toast" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ type: "spring", stiffness: 420, damping: 30 }}>
                <Figure pose="cheer" size={40} />
                <span>{toast.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === "steps" && (
            <div className="stage-ctl">
              <button className="icon-btn float" onClick={() => stage.current?.replay()} aria-label="Replay animation" data-tip="Replay (R)">
                <IReplay />
              </button>
              <button className="icon-btn float" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play" : "Pause"} data-tip={paused ? "Play" : "Pause"}>
                {paused ? <IPlay /> : <IPause />}
              </button>
              <button className={"pill-btn float" + (slow ? " on" : "")} onClick={() => setSlow((s) => !s)} aria-pressed={slow}>
                Slow
              </button>
              <AnimatePresence>
                {moved && (
                  <motion.button initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="pill-btn float" onClick={() => stage.current?.resetView()}>
                    <IRotate size={15} /> Reset view
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          )}
          {phase === "steps" && step === 0 && !moved && <span className="drag-hint">Drag to turn it around</span>}
          {phase === "parts" && <span className="sheet-caption">Lay your panels out like this</span>}
          {handsFree && phase === "steps" && (
            <div className="listening">
              <span className={"eq" + (listening ? " on" : "")} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>{canListen ? (heard ? `Heard “${heard}”` : "Say “next”, “back” or “repeat”") : "Reading steps aloud"}</span>
            </div>
          )}
          {(via === "ai" || via === "scan") && phase === "cover" && (
            <span className="sheet-caption ai">
              <ISparkle size={15} /> {via === "scan" ? "Made from your manual with Together AI" : "Drafted with Together AI"}
            </span>
          )}
        </section>

        <aside className="panel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={phase}
              className="panel-inner"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {phase === "cover" && (
                <CoverPanel
                  plan={plan}
                  via={via}
                  resume={resume}
                  onStart={() => {
                    setMissing(new Set());
                    setStartedAt(Date.now());
                    setDoneAt(undefined);
                    setMaxStep(0);
                    setReached(0);
                    go("tools");
                  }}
                  onResume={() => {
                    if (!resume) return;
                    if (resume.phase === "steps") go("steps", Math.min(resume.step, steps.length - 1));
                    else go(resume.phase === "cover" ? "tools" : resume.phase);
                  }}
                />
              )}
              {phase === "tools" && (
                <ToolsPanel
                  plan={plan}
                  onNext={(have: ToolId[]) => {
                    setTools(have);
                    next();
                  }}
                  onBack={back}
                />
              )}
              {phase === "parts" && (
                <PartsPanel
                  plan={plan}
                  missing={missing}
                  onToggle={(id) => setMissing((s) => toggle(s, id))}
                  onNext={next}
                  onBack={back}
                  onHover={setHl}
                  onMissingHelp={() => setHelp({ missing: true })}
                />
              )}
              {phase === "steps" && <StepPanel plan={plan} index={step} dir={dir} onNext={next} onBack={back} onHover={setHl} onHelp={() => setHelp({})} />}
              {phase === "done" && <DonePanel plan={plan} slug={slug} startedAt={startedAt} doneAt={doneAt} onReview={back} />}
            </motion.div>
          </AnimatePresence>
        </aside>
      </main>

      {phase === "done" && <Confetti />}
      <p className="sr-only" aria-live="polite">
        {phase === "steps" ? `Step ${step + 1} of ${steps.length}. ${cur?.title ?? ""}. ${cur?.detail ?? ""}` : phase === "done" ? `You built ${plan.spec.name}.` : ""}
      </p>

      <AnimatePresence>
        {help && <HelpSheet plan={plan} index={phase === "steps" ? step : -1} ai={ai} focusMissing={help.missing} onClose={() => setHelp(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {overview && (
          <Overview
            plan={plan}
            current={step}
            doneUpTo={maxStep}
            onPick={(i) => {
              setOverview(false);
              go("steps", i, i >= step ? 1 : -1);
            }}
            onClose={() => setOverview(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const PHASES: Phase[] = ["cover", "tools", "parts", "steps", "done"];

function toggle(s: Set<string>, id: string) {
  const n = new Set(s);
  if (n.has(id)) n.delete(id);
  else n.add(id);
  return n;
}

/** Labeled phase stepper: Tools, Parts, Build (with step progress), Done. */
function Stepper({ phase, step, total, reached, onJump }: { phase: Phase; step: number; total: number; reached: number; onJump: (p: Phase) => void }) {
  const items: { id: Phase; label: string; icon: React.ReactNode }[] = [
    { id: "tools", label: "Tools", icon: <IWrench size={16} /> },
    { id: "parts", label: "Parts", icon: <IBox size={16} /> },
    { id: "steps", label: "Build", icon: <IHammer size={16} /> },
    { id: "done", label: "Done", icon: <IFlag size={16} /> },
  ];
  const cur = PHASES.indexOf(phase);
  const pct = phase === "done" ? 1 : phase === "steps" ? (step + 1) / total : 0;
  return (
    <nav className="stepper" aria-label="Progress">
      {items.map((it, i) => {
        const idx = PHASES.indexOf(it.id);
        const state = idx < cur ? "done" : idx === cur ? "now" : "next";
        const can = idx <= reached && idx !== cur && it.id !== "done";
        return (
          <div key={it.id} className="stp-wrap">
            {i > 0 && <span className={"stp-line" + (idx <= cur ? " on" : "")} />}
            <button className={"stp " + state} disabled={!can} onClick={() => onJump(it.id)} aria-current={state === "now" ? "step" : undefined}>
              {state === "now" && <motion.span layoutId="stp-bg" className="stp-bg" transition={{ type: "spring", stiffness: 460, damping: 38 }} />}
              <span className="stp-ico">{state === "done" ? <ICheck size={14} strokeWidth={3} /> : it.icon}</span>
              <span className="stp-label">{it.label}</span>
              {it.id === "steps" && phase === "steps" && (
                <span className="stp-count">
                  {step + 1}/{total}
                </span>
              )}
              {it.id === "steps" && (phase === "steps" || phase === "done") && (
                <span className="stp-bar">
                  <motion.i initial={false} animate={{ scaleX: pct }} transition={{ type: "spring", stiffness: 160, damping: 24 }} />
                </span>
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
