import { PRODUCTS, toSpec, type CatalogEntry } from "./catalog";
import { fold } from "./fold";
import { KIND_DEFAULT_SIZE, KIND_LABELS, specFor, type Kind } from "./products";
import type { Archetype, ProductSpec } from "./types";

export { fold };

export function slugify(s: string) {
  return fold(s).replace(/\s+/g, "-").slice(0, 60) || "product";
}

const CATEGORY_WORDS: [Kind, string[]][] = [
  ["shoe", ["shoe", "shoes", "shoe cabinet", "shoe rack"]],
  ["nightstand", ["nightstand", "bedside", "night stand"]],
  ["chest", ["drawer", "drawers", "chest", "dresser"]],
  ["cube", ["cube", "cubes"]],
  ["bookcase", ["bookcase", "bookshelf", "shelf", "shelving", "shelves"]],
  ["tv", ["tv", "media"]],
  ["coffee", ["coffee"]],
  ["desk", ["desk"]],
  ["dining", ["dining", "table", "kitchen table"]],
  ["bed", ["bed", "bedframe", "daybed", "bunk"]],
  ["wardrobe", ["wardrobe", "closet", "armoire"]],
  ["sideboard", ["sideboard", "buffet"]],
  ["cabinet", ["cabinet", "cupboard", "vitrine", "display"]],
  ["sofa", ["sofa", "couch", "loveseat", "sectional"]],
  ["armchair", ["armchair", "wing chair", "recliner"]],
  ["chair", ["chair", "chairs"]],
  ["stool", ["stool", "stools"]],
  ["bench", ["bench"]],
];

export function kindOf(q: string): Kind | null {
  const f = " " + fold(q) + " ";
  for (const [k, words] of CATEGORY_WORDS) if (words.some((w) => f.includes(" " + w + " ") || f.includes(" " + w + "s "))) return k;
  return null;
}

export function categoryOf(q: string): Archetype | null {
  const k = kindOf(q);
  return k ? specFor(k, "X", "", 1, 1, 1).archetype : null;
}

function lev(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

export interface Hit {
  entry: CatalogEntry;
  score: number;
}

export function searchCatalog(q: string, limit = 8): Hit[] {
  const f = fold(q);
  if (!f) return [];
  const tokens = f.split(" ");
  const kind = kindOf(q);
  const hits: Hit[] = [];
  for (const e of PRODUCTS) {
    const name = fold(e.name);
    const nameKey = name.replace(/\s+/g, "");
    const hay = fold([e.name, e.variant, e.category, ...(e.keywords ?? [])].join(" "));
    const words = hay.split(" ");
    let score = 0;
    const first = tokens[0];
    const joined = f.replace(/\s+/g, "");
    if (name === f || nameKey === joined) score += 100;
    else if (name.split(" ").includes(first) || nameKey === first) score += 80;
    else if (first.length >= 2 && name.split(" ").some((w) => w.startsWith(first))) score += 60;
    else if (first.length >= 4 && lev(first, nameKey) === 1) score += 52;
    else if (first.length >= 6 && lev(first, nameKey) === 2) score += 42;
    else if (first.length >= 3 && words.some((w) => w.startsWith(first))) score += 20;
    for (const t of tokens.slice(1)) if (t.length && words.some((w) => w.startsWith(t) || (t.length > 2 && w.includes(t)))) score += 12;
    if (kind) {
      const cat = fold(e.category);
      const kw = CATEGORY_WORDS.find(([k]) => k === kind)![1];
      const padded = ` ${cat} ${hay} `;
      if (kw.some((w) => padded.includes(` ${w} `) || padded.includes(` ${w}s `))) score += 14;
      else score -= 30;
    }
    if (e.checked) score += 3;
    if (e.featured) score += 2;
    if (score > 15) hits.push({ entry: e, score });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

/** Best confident match, or null. */
export function matchCatalog(q: string): ProductSpec | null {
  const [a, b] = searchCatalog(q, 2);
  if (!a || a.score < 50) return null;
  // a typo match only counts when it is clearly the best one
  if (a.score < 60 && b && b.score >= a.score - 4 && fold(b.entry.name) !== fold(a.entry.name)) return null;
  return toSpec(a.entry);
}

/** A typical build for a product we don't know, from the kind of furniture it is. */
export function specForKind(kind: Kind, name: string): ProductSpec {
  const [w, h, d] = KIND_DEFAULT_SIZE[kind];
  const label = KIND_LABELS.find((k) => k.kind === kind)?.label ?? "Furniture";
  return { ...specFor(kind, name.toUpperCase(), label, w, h, d), source: "guess" };
}

export function guessSpec(q: string): ProductSpec | null {
  const kind = kindOf(q);
  if (!kind) return null;
  const words = q.trim().split(/\s+/);
  const name = words.find((w) => w.length > 2 && !kindOf(w)) ?? words[0];
  return specForKind(kind, name);
}

export const FEATURED = PRODUCTS.filter((e) => e.featured);
export const POPULAR = ["kallax-2x2", "billy-80x202", "malm-3-drawers", "lack-side-table", "linnmon-adils-desk", "malm-bed-160", "brimnes-wardrobe", "hemnes-3-drawers", "frosta-stool"]
  .map((s) => PRODUCTS.find((e) => e.slug === s)!)
  .filter(Boolean);
export const PRODUCT_COUNT = new Set(PRODUCTS.map((p) => fold(p.name) + "|" + p.category)).size;
