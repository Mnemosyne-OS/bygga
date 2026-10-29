import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { Figure } from "@/components/art/Figure";
import { IClose, IMic, IVolume } from "@/components/art/Icons";
import { sdk, useHost } from "./host";
import { fill, strings } from "./strings";

// The same names as the site's KeyModal: its callers import these types from it.
export type KeyWhy = "voice" | "ask" | "photo" | "draft" | "key";
export type KeyTrouble = "key" | "credits";

/**
 * Stands in for the site's Together AI key dialog. In Mnemosyne the hands-free voice is the
 * orb, so « voice » offers the read-aloud and the assistant; the other reasons (questions,
 * box photos, drafts) run on Together AI, which the cartridge does not reach, and say so.
 * Same props as the site's dialog, so GuideApp and Search call it unchanged.
 */
export default function KeyModal({
  why,
  skip,
  onSkip,
  onClose,
}: {
  why: KeyWhy;
  name?: string;
  trouble?: KeyTrouble | null;
  skip?: string;
  onSkip?: () => void;
  onClose: () => void;
  onSaved?: () => void;
  onGesture?: () => void;
}) {
  const host = useHost();
  const t = strings(host.lang);
  const name = host.assistantName || t.orb;
  const [orb, setOrb] = useState<"idle" | "calling" | "failed">("idle");
  const box = useRef<HTMLDivElement>(null);
  // the dialog can close while the orb is being called: its answer must not touch the next one
  const alive = useRef(true);

  useEffect(() => {
    box.current?.focus({ preventScroll: true });
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const summon = async () => {
    setOrb("calling");
    try {
      await sdk.invoke("orb.summon", {}, 5000);
      if (!alive.current) return;
      setOrb("idle");
      onClose();
    } catch (err) {
      // said on the button, until the next click
      console.warn("[bygga] the orb did not come:", err);
      if (alive.current) setOrb("failed");
    }
  };

  const voice = why === "voice";
  return createPortal(
    <motion.div className="key-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.16 } }} onClick={onClose}>
      <motion.div
        ref={box}
        tabIndex={-1}
        className="key-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="key-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.16 } }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="key-x" onClick={onClose} aria-label={t.close}>
          <IClose size={18} />
        </button>
        <div className="key-hero" aria-hidden="true">
          <Figure pose="wave" size={92} />
        </div>
        {voice ? (
          <>
            <h2 id="key-title">{fill(t.voiceTitle, { name })}</h2>
            <ul className="key-feats">
              <li>
                <span className="key-feat-ico">
                  <IMic size={17} />
                </span>
                <span>{fill(t.voiceAsk, { name })}</span>
              </li>
              <li>
                <span className="key-feat-ico">
                  <IVolume size={17} />
                </span>
                <span>{t.voiceRead}</span>
              </li>
            </ul>
            {skip && (
              <button className="btn primary big" onClick={onSkip ?? onClose}>
                <span>{t.readAloud}</span>
              </button>
            )}
            <button className="key-skip" onClick={summon} disabled={orb === "calling"}>
              {orb === "failed" ? fill(t.orbFailed, { name }) : fill(t.talkTo, { name })}
            </button>
          </>
        ) : (
          <>
            <h2 id="key-title">{t.outsideTitle}</h2>
            <p className="key-sub">{t.outsideBody}</p>
            <button className="btn primary big" onClick={onClose}>
              <span>{t.close}</span>
            </button>
          </>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
