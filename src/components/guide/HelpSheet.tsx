"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Plan } from "@/lib/types";
import { faqFor } from "@/lib/faq";
import { stepContents } from "@/lib/plan/contents";
import { ICamera, IChevronDown, IClose, IFlag, ISend, ISparkle } from "../art/Icons";
import { Figure } from "../art/Figure";
import { keyHeaders } from "@/lib/userKey";

interface Msg {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

export function helpContext(plan: Plan, index: number) {
  const s = plan.spec;
  const lines = [`Product: ${s.name}, ${s.variant} (${s.category}), ${s.size.w} x ${s.size.h} x ${s.size.d} cm.`];
  if (index >= 0) {
    const st = plan.steps[index];
    const c = stepContents(plan, index);
    lines.push(`Current step ${index + 1} of ${plan.steps.length}: ${st.title}. ${st.detail ?? ""}`);
    if (st.repeat) lines.push(`This step is repeated ${st.repeat} times.`);
    if (c.parts.length) lines.push("Parts in this step: " + c.parts.map((p) => `${p.type.label} ${p.type.name} x${p.count}`).join(", "));
    if (c.hardware.length) lines.push("Hardware in this step: " + c.hardware.map((h) => `${h.type.name} ${h.type.spec} x${h.count}`).join(", "));
    if (st.tools.length) lines.push("Tools: " + st.tools.join(", "));
    if (index > 0) lines.push(`Previous step: ${plan.steps[index - 1].title}.`);
  }
  lines.push("All panels: " + plan.parts.filter((p) => !p.extra).map((p) => `${p.label} ${p.name} x${p.qty}`).join(", "));
  lines.push("All hardware: " + plan.hardware.map((h) => `${h.name} ${h.spec} x${h.qty}${h.notIncluded ? " (not included)" : ""}`).join(", "));
  return lines.join("\n");
}

async function shrink(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = url;
    });
    const k = Math.min(1, 1024 / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * k);
    c.height = Math.round(img.height * k);
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function HelpSheet({
  plan,
  index,
  ai,
  onClose,
  focusMissing,
  ask: asked,
  askId,
  onAnswer,
}: {
  plan: Plan;
  index: number;
  ai: boolean;
  onClose: () => void;
  focusMissing?: boolean;
  /** A question already asked out loud, and which time it was asked. */
  ask?: string;
  askId?: number;
  /** Hears each finished answer, to read it aloud. */
  onAnswer?: (text: string) => void;
}) {
  const kind = index >= 0 ? plan.steps[index].kind : "general";
  const faqs = faqFor(kind);
  const [open, setOpen] = useState<number | null>(focusMissing ? faqs.length - 2 : null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // a question asked by voice goes straight in, every time one is asked
  const sent = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!asked || !ai || sent.current === askId) return;
    const t = setTimeout(() => {
      sent.current = askId;
      ask(asked, undefined, true);
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asked, askId, ai]);

  // closing the sheet ends the answer too, so it never talks over the next step
  const ctrl = useRef<AbortController | null>(null);
  useEffect(() => () => ctrl.current?.abort(), []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  async function ask(question: string, image?: string, spoken = false) {
    if ((busy && !spoken) || (!question.trim() && !image)) return;
    ctrl.current?.abort();
    const c = new AbortController();
    ctrl.current = c;
    const history = msgs.map((m) => ({ role: m.role, content: m.content }));
    const next: Msg[] = [...msgs, { role: "user", content: question || "Which part is this?", image }, { role: "assistant", content: "" }];
    setMsgs(next);
    setQ("");
    setBusy(true);
    try {
      const res = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...keyHeaders() },
        body: JSON.stringify({ context: helpContext(plan, index), question: question || "Which part is this? Match it to the parts list.", history, image }),
        signal: c.signal,
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let text = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        text += dec.decode(value, { stream: true });
        setMsgs((m) => {
          const c = [...m];
          c[c.length - 1] = { role: "assistant", content: text };
          return c;
        });
      }
      if (!text.trim()) throw new Error("empty");
      if (!c.signal.aborted) onAnswer?.(text);
    } catch {
      if (c.signal.aborted) return;
      setMsgs((m) => {
        const c = [...m];
        c[c.length - 1] = { role: "assistant", content: "I couldn't reach the helper just now. Try the quick answers above, or ask again in a moment." };
        return c;
      });
    } finally {
      if (ctrl.current === c) setBusy(false);
    }
  }

  return (
    <motion.div className="sheet-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.aside
        className="side-sheet"
        role="dialog"
        aria-label="Help"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-head">
          <Figure pose="think" bubble="?" size={64} />
          <div>
            <h2>{index >= 0 ? `Stuck on step ${index + 1}?` : "Need a hand?"}</h2>
            <p className="sub">{index >= 0 ? plan.steps[index].title : "Common questions while unpacking."}</p>
          </div>
          <button className="btn round small" onClick={onClose} aria-label="Close help">
            <IClose />
          </button>
        </div>
        <div className="sheet-body" ref={scroller}>
          <div className="faq">
            {faqs.map((f, i) => (
              <div key={f.q} className={"faq-item" + (open === i ? " open" : "")}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  <span>{f.q}</span>
                  <IChevronDown size={18} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          {index >= 0 && <Report plan={plan} index={index} />}

          {ai && (
            <>
              <div className="ask-head">
                <ISparkle size={18} />
                <b>Ask about this step</b>
                <span className="muted">Answers by Together AI</span>
              </div>
              {msgs.length === 0 && (
                <div className="ask-suggest">
                  {["Which way round does this go?", "Which screw goes where?", "Is it normal to have parts left over?"].map((s) => (
                    <button key={s} className="chip" onClick={() => ask(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div className="msgs">
                {msgs.map((m, i) => (
                  <motion.div key={i} className={"msg " + m.role} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {m.image && <img src={m.image} alt="Your photo" />}
                    {m.content ? <p>{m.content}</p> : <span className="typing">Thinking</span>}
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
        {ai && (
          <form
            className="ask-bar"
            onSubmit={(e) => {
              e.preventDefault();
              ask(q);
            }}
          >
            <button type="button" className="btn round small" onClick={() => file.current?.click()} disabled={busy} aria-label="Which part is this? Take a photo" title="Which part is this?">
              <ICamera />
            </button>
            <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type your question" aria-label="Your question" />
            <button type="submit" className="btn round small primary" disabled={busy || !q.trim()} aria-label="Send">
              <ISend />
            </button>
            <input
              ref={file}
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                const img = await shrink(f);
                ask("Which part is this?", img);
              }}
            />
          </form>
        )}
      </motion.aside>
    </motion.div>
  );
}

/** "This step doesn't match my box": goes to /api/feedback so wrong steps get fixed. */
function Report({ plan, index }: { plan: Plan; index: number }) {
  const [sent, setSent] = useState(false);
  const send = () => {
    setSent(true);
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: plan.spec.slug, name: plan.spec.name, variant: plan.spec.variant, match: false, step: index + 1, via: "help" }),
    }).catch(() => {});
  };
  return sent ? (
    <p className="report-done">Thanks. We&apos;ll check step {index + 1} against the real box. Trust the paper manual for now.</p>
  ) : (
    <button className="report-btn" onClick={send}>
      <IFlag size={16} /> This step doesn&apos;t match my box
    </button>
  );
}
