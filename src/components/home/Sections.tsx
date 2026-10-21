"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { POPULAR, fold } from "@/lib/search";
import { PRODUCTS, toSpec, type CatalogEntry } from "@/lib/catalog";
import { buildPlan } from "@/lib/plan";
import type { Archetype } from "@/lib/types";
import Thumb from "../Thumb";
import { getUserKey } from "@/lib/userKey";
import { Dots } from "../guide/ui";
import { IArrowRight, IClock, ISearch } from "../art/Icons";

export const CATS: { id: string; label: string; arch: Archetype[] }[] = [
  { id: "all", label: "All", arch: [] },
  { id: "shelves", label: "Shelves", arch: ["shelf"] },
  { id: "drawers", label: "Drawers", arch: ["drawers"] },
  { id: "storage", label: "Storage", arch: ["cabinet"] },
  { id: "tables", label: "Tables", arch: ["table"] },
  { id: "beds", label: "Beds", arch: ["bed"] },
  { id: "seating", label: "Seating", arch: ["seat", "sofa"] },
];

export function ProductCard({ e, i = 0 }: { e: CatalogEntry; i?: number }) {
  const lazyPlan = useMemo(() => () => buildPlan(toSpec(e)), [e]);
  return (
    <motion.div layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4, delay: Math.min(0.3, (i % 12) * 0.03), ease: [0.22, 1, 0.36, 1] }}>
      <Link href={`/build/${e.slug}`} className="pcard">
        <span className="pcard-art">
          <Thumb id={e.slug} plan={lazyPlan} mode={{ kind: "assembled" }} w={420} h={320} className="pcard-thumb" alt={`${e.name} line drawing`} lazy />
        </span>
        <span className="pcard-text">
          <span className="pcard-top">
            <b>{e.name}</b>
            <span className="pcard-go">
              <IArrowRight size={17} />
            </span>
          </span>
          <span className="pcard-variant">{e.variant}</span>
          <span className="pcard-meta">
            <span>
              <IClock size={15} /> {e.minutes < 60 ? `${e.minutes} min` : `${Math.round(e.minutes / 6) / 10} h`}
            </span>
            <Dots value={e.difficulty} />
            <span>{e.category}</span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

/** Category tabs plus a grid. On the home page it shows a short pick; /browse shows everything with a filter. */
export function Catalog({ limit, search }: { limit?: number; search?: boolean }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const c = CATS.find((x) => x.id === cat)!;
    let l = c.arch.length ? PRODUCTS.filter((p) => c.arch.includes(p.archetype)) : limit ? POPULAR : PRODUCTS;
    const f = fold(q);
    if (f) l = l.filter((p) => fold([p.name, p.variant, p.category, ...(p.keywords ?? [])].join(" ")).includes(f));
    if (!limit) l = [...l].sort((a, b) => a.name.localeCompare(b.name, "sv"));
    return limit ? l.slice(0, limit) : l;
  }, [cat, q, limit]);
  return (
    <div className="catalog">
      <div className="cat-bar">
        <div className="cat-tabs" role="tablist">
          {CATS.map((c) => (
            <button key={c.id} role="tab" aria-selected={cat === c.id} className={"cat-tab" + (cat === c.id ? " on" : "")} onClick={() => setCat(c.id)}>
              {cat === c.id && <motion.i layoutId={"cat-bg" + (search ? "b" : "h")} className="cat-bg" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        {search && (
          <label className="cat-search">
            <ISearch size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name" aria-label="Filter products" />
          </label>
        )}
      </div>
      <motion.div layout className="pgrid">
        <AnimatePresence mode="popLayout">
          {list.map((e, i) => (
            <ProductCard key={e.slug} e={e} i={i} />
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="empty">Nothing matches. Try another name, or search for it on the home page.</p>}
    </div>
  );
}

export function useAiStatus() {
  const [ai, setAi] = useState(false);
  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((j) => setAi(!!j.ai || !!getUserKey()))
      .catch(() => {});
  }, []);
  return ai;
}
