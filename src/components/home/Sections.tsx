"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { POPULAR, articleNo, fold, loadArticles, searchText } from "@/lib/search";
import { articleSlug } from "@/lib/ikea";
import { PRODUCTS, type CatalogEntry } from "@/lib/catalog";
import type { Kind } from "@/lib/products";
import Drawing from "../Drawing";
import { getUserKey } from "@/lib/userKey";
import { Dots } from "../guide/ui";
import { IArrowRight, IClock, ISearch } from "../art/Icons";

/** Tabs over the kinds of furniture. Kids and Outdoor cut across them, by keyword. */
export const CATS: { id: string; label: string; kinds?: Kind[]; tag?: string }[] = [
  { id: "all", label: "All" },
  { id: "shelves", label: "Shelves", kinds: ["cube", "bookcase", "open", "wallshelf"] },
  { id: "drawers", label: "Drawers", kinds: ["chest", "nightstand"] },
  { id: "wardrobes", label: "Wardrobes", kinds: ["wardrobe"] },
  { id: "storage", label: "Cabinets", kinds: ["cabinet", "sideboard", "tv", "shoe", "wallcab", "kitchen"] },
  { id: "tables", label: "Tables", kinds: ["dining", "coffee", "side", "bar", "console", "trolley"] },
  { id: "desks", label: "Desks", kinds: ["desk"] },
  { id: "beds", label: "Beds", kinds: ["bed"] },
  { id: "seating", label: "Chairs", kinds: ["chair", "stool", "bench"] },
  { id: "sofas", label: "Sofas", kinds: ["sofa", "armchair"] },
  { id: "kids", label: "Kids", kinds: ["kidstable", "kidschair"], tag: "kids" },
  { id: "outdoor", label: "Outdoor", tag: "outdoor" },
];

const inCat = (e: CatalogEntry, c: (typeof CATS)[number]) => (!c.kinds && !c.tag) || (!!e.kind && !!c.kinds?.includes(e.kind)) || (!!c.tag && !!e.keywords?.includes(c.tag));

/** Cards added per "Show more": a multiple of the 2 and 3 column grids. */
const PAGE = 24;

export function ProductCard({ e, i = 0 }: { e: CatalogEntry; i?: number }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4, delay: Math.min(0.3, (i % 12) * 0.03), ease: [0.22, 1, 0.36, 1] }}>
      <Link href={`/build/${e.slug}`} className="pcard">
        <span className="pcard-art">
          <Drawing name={e.slug} fallback={e.kind ? `kind-${e.kind}` : undefined} w={420} h={320} className="pcard-thumb" alt={`${e.name} line drawing`} eager={i < 6} />
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
            <span className="pcard-cat">{e.category}</span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

/**
 * Category tabs plus a grid. On the home page it shows a short pick; /browse shows everything with a filter,
 * a page of cards at a time (each card's drawing renders only while it is on screen).
 */
export function Catalog({ limit, search }: { limit?: number; search?: boolean }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [more, setMore] = useState({ view: "", n: PAGE });
  const [articles, setArticles] = useState(false);
  const no = search ? articleNo(q) : null;

  useEffect(() => {
    if (no && !articles) loadArticles().then(() => setArticles(true));
  }, [no, articles]);

  const counts = useMemo(() => (search ? new Map(CATS.map((c) => [c.id, PRODUCTS.filter((e) => inCat(e, c)).length])) : null), [search]);
  const list = useMemo(() => {
    const c = CATS.find((x) => x.id === cat)!;
    let l = c.kinds || c.tag ? PRODUCTS.filter((e) => inCat(e, c)) : limit ? POPULAR : PRODUCTS;
    const f = fold(q);
    if (no) {
      const slug = articles ? articleSlug(no) : null;
      l = l.filter((e) => e.slug === slug);
    } else if (f) {
      // every word starts a word of the product's name, type, category or keywords
      const words = f.split(" ");
      l = l.filter((e) => {
        const text = searchText(e);
        return words.every((w) => text.includes(" " + w));
      });
    }
    if (!limit) l = [...l].sort((a, b) => a.name.localeCompare(b.name, "sv") || a.variant.localeCompare(b.variant, "sv"));
    return limit ? l.slice(0, limit) : l;
  }, [cat, q, limit, no, articles]);

  const view = cat + "|" + q;
  const n = limit ? list.length : more.view === view ? more.n : PAGE;
  const shown = list.slice(0, n);

  return (
    <div className="catalog">
      <div className="cat-bar">
        <div className="cat-tabs" role="tablist">
          {CATS.map((c) => (
            <button key={c.id} role="tab" aria-selected={cat === c.id} className={"cat-tab" + (cat === c.id ? " on" : "")} onClick={() => setCat(c.id)}>
              {cat === c.id && <motion.i layoutId={"cat-bg" + (search ? "b" : "h")} className="cat-bg" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
              <span>{c.label}</span>
              {counts && <small className="cat-n">{counts.get(c.id)}</small>}
            </button>
          ))}
        </div>
        {search && (
          <label className="cat-search">
            <ISearch size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name or article number" aria-label="Filter products" enterKeyHint="search" />
          </label>
        )}
      </div>
      <motion.div layout className="pgrid">
        <AnimatePresence mode="popLayout">
          {shown.map((e, i) => (
            <ProductCard key={e.slug} e={e} i={i} />
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="empty">{no && !articles ? "Looking up that article number" : no ? "We don't have a guide for that article number yet. Try the name on the box." : "Nothing matches. Try another name, or search for it on the home page."}</p>}
      {!limit && list.length > shown.length && (
        <div className="cat-more">
          <button type="button" className="cat-more-btn" onClick={() => setMore({ view, n: n + PAGE })}>
            Show {Math.min(PAGE, list.length - shown.length)} more
          </button>
          <span>
            {shown.length} of {list.length}
          </span>
        </div>
      )}
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
