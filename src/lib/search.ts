import { PRODUCTS, catalogEntry, toSpec, type CatalogEntry } from "./catalog";
import { fold } from "./fold";
import { articleNo, articleSlug, isGuardedName, loadArticles } from "./ikea";
import { KIND_DEFAULT_SIZE, KIND_LABELS, specFor, type Kind } from "./products";
import type { Archetype, ProductSpec } from "./types";

export { fold };
export { articleNo, articlesReady, ikeaType, ikeaTypes, isIkeaName, loadArticles } from "./ikea";

// the server answers /api/guide with whatever is loaded, so it keeps the article numbers at hand
if (typeof window === "undefined") loadArticles().catch(() => {});

export function slugify(s: string) {
  return fold(s).replace(/\s+/g, "-").slice(0, 60) || "product";
}

const CATEGORY_WORDS: [Kind, string[]][] = [
  ["office", ["office chair", "desk chair", "swivel chair", "gaming chair", "computer chair"]],
  ["bookrow", ["bookcase combination", "bookshelf combination"]],
  ["cabrow", ["tv bench combination", "tv unit combination", "media unit combination", "cabinet combination", "wardrobe combination", "closet combination", "wall cabinet combination"]],
  ["washstand", ["wash stand", "washstand", "vanity", "vanity unit", "bathroom vanity", "basin unit", "basin cabinet", "wash basin cabinet", "washbasin cabinet", "bathroom cabinet", "sink vanity"]],
  ["sinkcab", ["sink cabinet", "sink base", "sink base cabinet", "sink unit", "kitchen sink cabinet", "under sink cabinet", "cabinet for sink", "sink cupboard"]],
  ["appliance", ["appliance cabinet", "oven cabinet", "oven housing", "oven unit", "tall oven unit", "wall oven cabinet", "cabinet for oven", "fridge cabinet", "fridge housing", "refrigerator cabinet", "freezer cabinet", "cabinet for fridge", "microwave cabinet", "hob cabinet", "hob unit", "cooktop cabinet", "hood cabinet", "extractor hood cabinet"]],
  ["shoerack", ["shoe rack", "shoe shelf", "shoe stand", "shoe bench", "open shoe storage"]],
  ["shoe", ["shoe", "shoes", "shoe cabinet", "shoe rack"]],
  ["nightstand", ["nightstand", "bedside", "night stand"]],
  ["mixed", ["doors and drawers", "cabinet with drawers", "cupboard with drawers", "wardrobe with drawers", "armoire with drawers"]],
  ["chest", ["drawer", "drawers", "chest", "dresser"]],
  ["cube", ["cube", "cubes"]],
  ["wallshelf", ["wall shelf", "wall shelves", "wall shelf unit"]],
  ["wallcab", ["wall cabinet", "wall cupboard", "mirror cabinet"]],
  ["kitchen", ["kitchen cabinet", "base cabinet", "high cabinet", "kitchen unit"]],
  ["bookcase", ["bookcase", "bookshelf", "shelf", "shelving", "shelves"]],
  ["tv", ["tv", "media"]],
  ["coffee", ["coffee"]],
  ["kidstable", ["children s table", "childrens table", "kids table", "kid table"]],
  ["bar", ["bar table", "high table"]],
  ["console", ["console", "console table", "hall table"]],
  ["trolley", ["trolley", "cart", "kitchen island"]],
  ["desk", ["desk"]],
  ["gateleg", ["gateleg", "gateleg table", "gate leg", "gate leg table"]],
  ["dropleaf", ["drop leaf", "drop leaf table"]],
  ["dining", ["dining", "table", "kitchen table"]],
  ["cot", ["cot", "crib", "baby bed"]],
  ["bunk", ["bunk", "bunk bed", "bunkbed"]],
  ["loft", ["loft bed", "high sleeper"]],
  ["daybed", ["daybed", "day bed", "trundle bed"]],
  ["bed", ["bed", "bedframe"]],
  ["slidecab", ["cabinet with sliding doors", "sliding door cabinet", "cupboard with sliding doors", "sliding door cupboard"]],
  ["sliding", ["wardrobe with sliding doors", "sliding wardrobe", "sliding door wardrobe", "sliding door closet", "sliding closet", "sliding doors"]],
  ["wardrobe", ["wardrobe", "closet", "armoire"]],
  ["sideboard", ["sideboard", "buffet"]],
  ["cabinet", ["cabinet", "cupboard", "vitrine", "display"]],
  ["chaise", ["chaise longue", "chaise lounge", "chaise"]],
  ["section", ["sofa section", "seat section", "sofa module", "couch section", "sectional piece"]],
  ["corner", ["corner sofa", "corner couch", "sectional", "l shaped sofa"]],
  ["sofa", ["sofa", "couch", "loveseat"]],
  ["armchair", ["armchair", "wing chair", "recliner"]],
  ["kidschair", ["children s chair", "childrens chair", "kids chair", "kid chair"]],
  ["chair", ["chair", "chairs"]],
  ["stool", ["stool", "stools"]],
  ["bench", ["bench"]],
];
const KIND_WORDS = new Map(CATEGORY_WORDS);
// rows, sections, and cabinets built around an appliance or a sink, which only come first when asked for
const LESSER = new Set<Kind>(["bookrow", "cabrow", "section", "sinkcab", "appliance"]);

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
  /** the query names this product (or its article number), not just something like it */
  exact?: boolean;
}

/** Folded text per product, worked out once: search runs on every keystroke over a thousand or more rows. */
interface Row {
  e: CatalogEntry;
  name: string;
  nameKey: string;
  nameWords: string[];
  words: string[];
  padded: string;
}
let rows: Row[] | null = null;
const rowOf = new Map<CatalogEntry, Row>();
function index(): Row[] {
  if (rows) return rows;
  rows = PRODUCTS.map((e) => {
    const name = fold(e.name);
    const hay = fold([e.name, e.variant, e.category, ...(e.keywords ?? [])].join(" "));
    const r = { e, name, nameKey: name.replace(/\s+/g, ""), nameWords: name.split(" "), words: hay.split(" "), padded: ` ${fold(e.category)} ${hay} ` };
    rowOf.set(e, r);
    return r;
  });
  return rows;
}

/** Folded search text of a product (category, name, variant, keywords), for simple filters. */
export function searchText(e: CatalogEntry) {
  index();
  return rowOf.get(e)?.padded ?? ` ${fold([e.category, e.name, e.variant].join(" "))} `;
}

export function searchCatalog(q: string, limit = 8): Hit[] {
  const f = fold(q);
  if (!f) return [];
  const no = articleNo(q);
  if (no) {
    const slug = articleSlug(no);
    const e = slug ? catalogEntry(slug) : null;
    return e ? [{ entry: e, score: 200, exact: true }] : [];
  }
  const tokens = f.split(" ");
  const kind = kindOf(q);
  const kw = kind ? KIND_WORDS.get(kind)! : null;
  const first = tokens[0];
  // "crib" or "sectional" alone names the type, so it counts like a word in the product's own text
  const firstIsKind = !!kw?.some((w) => w.split(" ").includes(first));
  const joined = f.replace(/\s+/g, "");
  // a real IKEA name we can't draw is not a typo of one we can
  const typos = !isGuardedName(first);
  const byName = new Map<string, number>();
  const nameScore = (r: Row) => {
    let s = byName.get(r.name);
    if (s !== undefined) return s;
    if (r.name === f || r.nameKey === joined) s = 100;
    else if (r.nameWords.includes(first) || r.nameKey === first) s = 80;
    else if (first.length >= 2 && r.nameWords.some((w) => w.startsWith(first))) s = 60;
    else if (typos && first.length >= 4 && lev(first, r.nameKey) === 1) s = 52;
    else if (typos && first.length >= 6 && lev(first, r.nameKey) === 2) s = 42;
    else s = 0;
    byName.set(r.name, s);
    return s;
  };
  const hits: Hit[] = [];
  for (const r of index()) {
    const e = r.e;
    const ns = nameScore(r);
    let score = ns;
    const kwHit = !!kw?.some((w) => r.padded.includes(` ${w} `) || r.padded.includes(` ${w}s `));
    if (!ns && ((first.length >= 3 && r.words.some((w) => w.startsWith(first))) || (firstIsKind && kwHit))) score += 20;
    for (const t of tokens.slice(1)) if (t.length && r.words.some((w) => w.startsWith(t) || (t.length > 2 && w.includes(t)))) score += 12;
    if (kw) score += kwHit ? 14 : -30;
    // rows of several units, sofa sections and appliance cabinets come after the plain product, unless the query asks for them
    if (e.kind && LESSER.has(e.kind) && kind !== e.kind) score -= 1;
    if (e.checked) score += 3;
    if (e.featured) score += 2;
    if (score > 15) hits.push({ entry: e, score, exact: ns >= 80 });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

/** Best confident match, or null. Article numbers work once loadArticles() has run (it always has on the server). */
export function matchCatalog(q: string): ProductSpec | null {
  const [a, b] = searchCatalog(q, 2);
  if (!a || a.score < 50) return null;
  // a real IKEA name we can't draw must not land on a different product
  if (!a.exact && isGuardedName(fold(q).split(" ")[0] ?? "")) return null;
  // a typo match only counts when it is clearly the best one
  if (a.score < 60 && b && b.score >= a.score - 4 && fold(b.entry.name) !== fold(a.entry.name)) return null;
  return toSpec(a.entry);
}

/** A typical build for a product we don't know, from the kind of furniture it is. */
export function specForKind(kind: Kind, name: string): ProductSpec {
  const [w, h, d] = KIND_DEFAULT_SIZE[kind];
  const label = KIND_LABELS.find((k) => k.kind === kind)?.label;
  const spec = specFor(kind, name.toUpperCase(), label ?? "", w, h, d);
  return { ...spec, variant: label ?? spec.category, source: "guess" };
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
