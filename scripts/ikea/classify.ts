/**
 * Decides what each IKEA product is in our terms: a Kind plus parameters and an outer size,
 * or a reason we can't draw it believably yet. Used by build.ts and check.ts.
 */
import { KIND_ARCH, KIND_DEFAULT_SIZE, type Kind, type X } from "@/lib/products";

/** One IKEA product (all its colours) as fetch.ts keeps it. */
export interface Fact {
  name: string;
  type: string;
  size: string;
  /** article numbers of every colour, single articles first */
  items: string[];
  spr: boolean;
  cats: string[];
}

export interface Draw {
  kind: Kind;
  x: X;
  w: number;
  h: number;
  d: number;
  /** IKEA's own type name, shown as the start of the variant */
  label: string;
  /** readable size for the variant, e.g. "80 × 28 × 202 cm" */
  size: string;
  kw: string[];
  /** which of w/h/d came from defaults rather than IKEA's measure */
  guessed: { w: boolean; h: boolean; d: boolean };
}

export type Verdict = { draw: Draw } | { skip: string };

/** What an existing hand made row of the same family says, used as defaults. */
export interface Hint {
  kind: Kind;
  x: X;
  w: number;
  h: number;
  d: number;
}
export type Hints = (family: string, kind: Kind) => Hint | undefined;

const BEDS: Record<string, [number, number]> = {
  single: [90, 190],
  "standard single": [90, 190],
  "small double": [120, 190],
  double: [135, 190],
  "standard double": [135, 190],
  king: [150, 200],
  "standard king": [150, 200],
  "super king": [180, 200],
};

interface Size {
  n: number[];
  ext: boolean;
  bed?: [number, number];
  text: string;
}

/** IKEA's measure text: "77x147 cm", "80x28x202 cm" (w x d x h), "150/200x80 cm", "Standard Double". */
export function measure(s: string): Size | null {
  const t = s.replace(/\s+/g, " ").trim();
  if (!t) return { n: [], ext: false, text: "" };
  const bed = BEDS[t.toLowerCase()];
  if (bed) return { n: [], ext: false, bed, text: t.replace(/\bking\b/, "King") };
  const g = "(\\d+(?:\\.\\d+)?(?:/\\d+(?:\\.\\d+)?)*)";
  const m = t.match(new RegExp(`^${g}(?:x${g})?(?:x${g})? cm$`));
  if (!m) return null;
  const parts = [m[1], m[2], m[3]].filter(Boolean) as string[];
  return { n: parts.map((p) => Number(p.split("/")[0])), ext: parts.some((p) => p.includes("/")), text: parts.join(" × ") + " cm" };
}

const UPRIGHT = new Set<Kind>(["cube", "bookcase", "open", "chest", "nightstand", "wardrobe", "cabinet", "sideboard", "tv", "shoe", "wallcab", "wallshelf", "kitchen"]);
const FLAT = new Set<Kind>(["desk", "coffee", "side", "dining", "bar", "console", "kidstable", "trolley", "bench"]);

type Pick = { kind: Kind; x?: X } | string;
type Rule = [RegExp, (m: RegExpMatchArray, c: Ctx) => Pick];

interface Ctx {
  f: Fact;
  sz: Size;
  kids: boolean;
  multi: boolean;
}

const n = (s: string | undefined, d: number) => (s ? Number(s) : d);

/** Doors from a type name: none for frames and open shelves, one for "with door", else left to the width. */
function doors(t: string): Pick | X {
  const count = t.match(/\b(\d) (glass )?(doors|drs)\b/);
  if (count && Number(count[1]) > 3) return "more than 3 doors";
  if (/(^| )frame$|shelves$|^open |^frame /.test(t) && !/doors?$|drs$/.test(t)) return { doors: 0 };
  if (/(^| )(glass )?door$/.test(t)) return { doors: 1 };
  return {};
}
const withDoors = (kind: Kind, t: string): Pick => {
  const x = doors(t);
  return typeof x === "string" ? x : { kind, x: x as X };
};

/** Most specific first. A string result is the reason to skip. */
const RULES: Rule[] = [
  // things that are several products, or only part of one
  [/\b(and|set of \d|sets?)\b|\+|combination|\bcomb\b|\bchairs\b|armchairs|benches/, () => "set or combination"],
  [/swivel|office chair|gaming chair|conference|desk chair|highchair|lounge|reclining|lounger|hammock|massage/, () => "office, swivel or lounge chair"],
  [/corner|chaise|u-shaped|crnr/, () => "corner or chaise longue sofa"],
  [/section|add-on|armrest|backrest for|seat sec|modular (easy chair|chaise)/, () => "sofa or storage section"],
  [/\b(bunk|loft)\b/, () => "bunk or loft bed"],
  [/\b(cot|crib)\b|cradle/, () => "cot"],
  [/day-?bed|divan/, () => "day-bed or divan"],
  [/sliding/, () => "sliding doors"],
  [/sink|wash-?basin|wash-?st|hob\b|oven|fridge|freezer|dishwasher|microwave|extractor|appliances|kitchenette|outdoor kitchen/, () => "appliance or sink unit"],
  [/drawers?\b.*\b(doors?|fronts?|shelves|baskets?)\b|\b(doors?|fronts?|shelves|baskets?)\b.*\bdrawers?\b/, () => "mixed doors and drawers"],

  // storage
  [/^bookcase$/, () => ({ kind: "bookcase" })],
  [/^(bookcase|shelving unit|shelf unit|cabinet|glass-door cabinet) with (glass |panel\/glass |panel |glass-)?(door|doors|\d doors)$/, (m, c) => (c.f.name === "KALLAX" ? "cube shelf with door inserts" : withDoors("cabinet", m[0]))],
  [/^(shelving unit|shelf unit|open shelving unit|open storage|storage unit|shelving unit in\/outdoor|shelf section|1 shelf section|shelving unit with (\d+) shelves)$/, (m, c) =>
    c.f.name === "KALLAX" ? { kind: "cube" } : { kind: "open", x: m[2] ? { shelves: Math.min(6, Number(m[2]) - 2) } : {} }],
  [/^(wall shelf unit|wall shelf|wall-mounted shelving unit|wall storage unit)$/, (m, c) => (c.sz.n.length === 3 && c.sz.n[2] >= 25) || (m[1] === "wall shelf unit" && c.sz.n.length >= 2) ? { kind: "wallshelf" } : "single shelf board"],
  [/^(modular )?chest of (\d+) drawers$/, (m) => ({ kind: "chest", x: { rows: Number(m[2]) } })],
  [/^(drawer unit|drawer unit on castors|chest of drawers|dresser)$/, () => ({ kind: "chest" })],
  [/^(bedside table|nightstand|bedside table with (\d) drawers?)$/, (m) => ({ kind: "nightstand", x: m[2] ? { rows: Number(m[2]) } : {} })],
  [/^(wardrobe frame|open wardrobe|open clothes hanging unit)$/, () => ({ kind: "wardrobe", x: { doors: 0 } })],
  [/^(wardrobe|hinged wardrobe|wardrobe with (door|(\d) doors))$/, (m) => (n(m[3], 2) > 3 ? "more than 3 doors" : { kind: "wardrobe", x: m[2] ? { doors: m[2] === "door" ? 1 : (Math.min(2, Number(m[3])) as 1 | 2) } : {} })],
  [/^(wall(-mounted)? cabinet|wall cabinet frame|top cabinet|mirror cabinet( with doors?)?|wall cabinet with (\d )?(glass )?doors?|wall cabinet with shelves(\/(\d )?(glass )?doors?)?|wall cab(inet)? w shelves\/(\d )?glass (drs?|doors?)|wall cabinet w shelves\/glass door)$/, (m) => withDoors("wallcab", m[0])],
  [/^(base cabinet frame|base cabinet with shelves|base fr w shelves|base cabinet with (\d )?doors?|base cabinet with shelves\/(\d )?doors?|high cabinet frame|high cabinet with shelves(\/(\d )?doors?)?|high cabinet( with (\d )?doors?)?)$/, (m, c) =>
    withDoors(/^high cabinet( with)?/.test(m[0]) && !c.f.cats.includes("ka001") ? "cabinet" : "kitchen", m[0])],
  [/^(cabinet|frame|frame with doors?|cabinet with plinth|cabinet with (\d )?doors?|cabinet with door|glass-door cabinet( with (\d doors|plinth))?|cabinet with (\d )?glass doors?|display cabinet|storage cabinet|cupboard|open cabinet)$/, (m, c) => (m[0] === "frame" && c.f.name === "TROFAST" ? { kind: "open" } : withDoors("cabinet", m[0]))],
  [/^(sideboard|buffet)$/, () => ({ kind: "sideboard" })],
  [/^(tv bench|tv bench with (\d )?doors|tv unit|tv storage unit)$/, (m, c) =>
    c.f.name === "KALLAX" ? "cube shelf with door inserts" : { kind: "tv", x: m[0] === "tv bench" && /^(BESTÅ|LACK)$/.test(c.f.name) ? { doors: 0 } : {} }],
  [/^(shoe cabinet|shoe cabinet\/storage|shoe cabinet with (\d) compartments)$/, (m) => ({ kind: "shoe", x: m[2] ? { c: Number(m[2]) } : {} })],

  // tables
  [/^(gateleg|drop-leaf|folding) table$/, () => "folding or drop-leaf table"],
  [/^(table|dining table|extendable table|kitchen table)$/, (_m, c) => ({ kind: c.kids ? "kidstable" : "dining" })],
  [/^children's table$/, () => ({ kind: "kidstable" })],
  [/^coffee table$/, () => ({ kind: "coffee" })],
  [/^side table( on castors)?$/, () => ({ kind: "side" })],
  [/^(bar table|high table)$/, () => ({ kind: "bar" })],
  [/^(console table|hall table)$/, () => ({ kind: "console" })],
  [/^(desk|computer desk|gaming desk|desk sit\/stand|gaming desk sit\/stand|dressing table|writing desk)$/, () => ({ kind: "desk" })],
  [/^(trolley|kitchen trolley|kitchen island|trolley table|serving trolley)$/, () => ({ kind: "trolley" })],

  // seating
  [/^(chair|dining chair|folding chair|chair with armrests)$/, (_m, c) => ({ kind: c.kids ? "kidschair" : "chair" })],
  [/^children's chair$/, () => ({ kind: "kidschair" })],
  [/^(bar stool with backrest|bar chair)$/, () => ({ kind: "chair", x: { seatH: 63 } })],
  [/^(stool|bar stool|step stool|folding stool|children's stool|stool, \d+ steps?)$/, () => ({ kind: "stool" })],
  [/^(bench|bench with shoe storage)$/, () => ({ kind: "bench" })],
  [/^(armchair|easy chair|wing chair|high-back armchair|low-back armchair|rocking-chair|children's armchair|armchair with cushion)$/, () => ({ kind: "armchair" })],
  [/^((\d)(,5)?-seat (modular )?sofa(-bed)?|sofa|sofa-bed|loveseat)$/, (m) => {
    const seats = m[2] ? Number(m[2]) + (m[3] ? 1 : 0) : 3;
    return seats > 4 ? "sofa with more than 4 seats" : { kind: "sofa", x: { seats } };
  }],

  // beds
  [/^(bed frame|bed frame, high|upholstered bed frame|bed frame with storage|bed frame with (\d) storage boxes|bed frame, high, w (\d) storage boxes|bed frame with slatted bed base|ottoman bed|extendable bed|ext bed frame with slatted bed base|bed frame with (\d) headboards|bed frame with headboard|children's bed)$/, () => ({ kind: "bed" })],
];

/** Drawers in one or two columns, each between 7 and 42 cm tall (taller means open sections we can't show). */
function chestShape(total: number, w: number, h: number): { rows: number; cols: 1 | 2 } | null {
  const ok = (rows: number) => rows <= 6 && h / rows >= 7 && h / rows <= 42;
  if (total % 2 === 0 && w >= 100 && ok(total / 2)) return { rows: total / 2, cols: 2 };
  return ok(total) ? { rows: total, cols: 1 } : null;
}

/** IKEA's top level ranges that hold no furniture: food, textiles, kitchenware, lamps, plants, decoration and so on. */
const NOT_FURNITURE = /^(fb|tl|kt|li|pp|de|wt|he|hs|lc|pt|sp)\d/;

export function classify(f: Fact, hints: Hints): Verdict {
  if (NOT_FURNITURE.test(f.cats[0] ?? "")) return { skip: "not furniture" };
  const raw = f.type.replace(/\s+/g, " ").trim();
  let t = raw.toLowerCase();
  const outdoor = /(,|\s)\s*(in\/)?outdoor$/.test(t) || f.cats[0] === "od001";
  t = t.replace(/,?\s*(in\/)?outdoor$/, "").trim();
  const kids = /^(children's|junior) /.test(t) || f.cats[0] === "bc001";
  const sz = measure(f.size);
  const multi = f.name.includes("/");
  let pick: Pick | null = null;
  for (const [re, fn] of RULES) {
    const m = t.match(re);
    if (m) {
      pick = fn(m, { f, sz: sz ?? { n: [], ext: false, text: "" }, kids, multi });
      break;
    }
  }
  if (!pick) return { skip: "not something we draw yet" };
  if (typeof pick === "string") return { skip: pick };
  if (!sz) return { skip: "size we can't read" };
  const kind = pick.kind;
  const family = f.name.split(" / ")[0].trim();
  const hint = hints(family, kind);
  const x: X = { ...pick.x };
  for (const k of Object.keys(x) as (keyof X)[]) if (x[k] === undefined) delete x[k];
  const [dw, dh, dd] = KIND_DEFAULT_SIZE[kind];
  const v = sz.n;
  let w = dw, h = dh, d = dd;
  const guessed = { w: true, h: true, d: true };
  const set = (a?: number, b?: number, c?: number) => {
    if (a !== undefined) [w, guessed.w] = [a, false];
    if (b !== undefined) [h, guessed.h] = [b, false];
    if (c !== undefined) [d, guessed.d] = [c, false];
  };

  if (kind === "bed") {
    const mat = sz.bed ?? (v.length === 2 && v[1] >= 140 && v[1] <= 220 ? ([v[0], v[1]] as [number, number]) : null);
    if (!mat) return { skip: "bed without a mattress size" };
    const small = mat[0] <= 80 && mat[1] <= 170;
    x.m = mat[0];
    if (mat[1] !== 200) x.l = mat[1];
    if (hint?.x.f !== undefined) x.f = hint.x.f;
    else if (small) x.f = 50;
    const fit = hint?.kind === "bed" && !small;
    set(mat[0] + 16, fit ? hint.h : small ? 64 : 100, mat[1] + 9);
    guessed.h = !fit;
  } else if (UPRIGHT.has(kind)) {
    if (sz.ext) return { skip: "corner or extendable unit" };
    if (v.length === 3) set(v[0], v[2], v[1]);
    else if (v.length === 2) {
      if (kind === "kitchen" && /^base/.test(t)) set(v[0], 80, v[1]);
      // bedside tables are measured from above, like tables
      else if (kind === "nightstand" && /bedside|nightstand/.test(t)) set(v[0], hint?.kind === kind ? hint.h : 55, v[1]);
      else set(v[0], v[1]);
    } else if (v.length === 1) return { skip: "upright piece with one size" };
    else if (hint?.kind === kind) set(hint.w, hint.h, hint.d);
    else return { skip: "no size given" };
    if (guessed.d && hint?.kind === kind && Math.abs(hint.w - w) < 60) d = hint.d;
  } else if (FLAT.has(kind)) {
    if (v.length === 3) set(v[0], v[2], v[1]);
    else if (v.length === 2) set(v[0], undefined, v[1]);
    else if (v.length === 1) {
      if (kind === "bench") set(v[0]);
      else if (kind === "trolley" || kind === "console") return { skip: "trolley or console with one size" };
      else if (v[0] > 160) return { skip: "round table larger than 160 cm" };
      else {
        set(v[0], undefined, v[0]);
        x.round = true;
      }
    } else if (hint?.kind === kind) set(hint.w, hint.h, hint.d);
    else if (kind !== "bench") return { skip: "no size given" };
    if (guessed.h && hint?.kind === kind) h = hint.h;
  } else {
    // seats: IKEA mostly gives no size, or the seat height for stools
    if (v.length === 3) set(v[0], v[2], v[1]);
    else if (v.length === 1 && (kind === "sofa" || kind === "armchair") && v[0] >= 60) set(v[0]);
    else if (v.length === 1 && v[0] >= 25 && v[0] <= 90) {
      if (kind === "stool") set(undefined, v[0]);
      else if (x.seatH) {
        x.seatH = v[0];
        set(undefined, v[0] + 32);
      }
    } else if (v.length === 2 && kind === "sofa") set(v[0], undefined, v[1]);
    else if (v.length === 2 && kind === "stool") set(v[0], v[1], v[0]);
    if (kind === "stool" && guessed.h) h = /bar/.test(t) ? 74 : /step/.test(t) ? 50 : kids ? 30 : 45;
    if (kind === "chair" && x.seatH && guessed.h) h = x.seatH + 32;
    if (kind === "sofa" && guessed.w) w = (x.seats ?? 3) * 60 + 50;
    if (kind === "armchair" && /wing|high-back/.test(t) && guessed.h) h = 104;
    if (kind === "armchair" && kids && guessed.w) [w, h, d] = [55, 68, 58];
    if (hint && guessed.w && guessed.h && hint.kind === kind && (kind !== "sofa" || hint.x.seats === x.seats)) {
      [w, h, d] = [hint.w, hint.h, hint.d];
    }
  }

  // parameters from the type name, the size and the family's hand made rows
  if (hint?.x.knobs && ["chest", "nightstand", "wardrobe", "cabinet", "sideboard", "tv", "shoe", "wallcab", "kitchen"].includes(kind)) x.knobs = hint.x.knobs;
  if (kind === "chest" || kind === "nightstand") {
    const total = x.rows ?? (kind === "nightstand" ? (h >= 60 ? 2 : 1) : Math.min(6, Math.max(2, Math.round(h / 14))));
    if (kind === "chest" && total === 2 && w <= 60 && h <= 65) return finish("nightstand");
    const shape = kind === "nightstand" ? { rows: Math.min(total, 3), cols: 1 as const } : chestShape(total, w, h);
    if (!shape) return { skip: "drawers we can't lay out (open sections or 3 columns)" };
    x.rows = shape.rows;
    if (shape.cols === 2) x.cols = 2;
    if (hint?.x.plinth) x.plinth = true;
  }
  if (kind === "wardrobe" && multi && w > 100) return { skip: "several wardrobe frames" };
  if (kind === "wardrobe" && x.doors === 0 && hint?.x.shelves) x.shelves = hint.x.shelves;
  if ((kind === "cabinet" || kind === "bookcase") && multi && w > 100) return { skip: "several units side by side" };
  // a combination this wide is more than one frame, which one carcass can't show
  if (f.spr && w > 125 && ["bookcase", "open", "cabinet", "wardrobe", "shoe", "wallcab", "wallshelf", "kitchen"].includes(kind)) return { skip: "several units side by side" };
  if (kind === "tv" && f.spr && w > 200) return { skip: "several units side by side" };
  if (kind === "tv" && h > 100) return { skip: "TV storage wall" };
  if (kind === "shoe" && x.c === undefined) x.c = h < 60 ? 1 : h < 115 ? 2 : 3;
  if (kind === "cube" && (Math.round((w - 6) / 35) > 5 || Math.round((h - 6) / 35) > 5)) return { skip: "cube grid larger than 5 x 5" };
  if (kind === "desk" || kind === "coffee" || kind === "side") {
    if (hint?.x.attach) x.attach = hint.x.attach;
    if (hint?.x.legs) x.legs = hint.x.legs;
    if (kind === "coffee" && hint?.x.shelf !== undefined) x.shelf = hint.x.shelf;
  }
  if (kind === "desk" && h > 100) return { skip: "desk with a shelf unit" };
  if ((kind === "sofa" || kind === "armchair") && hint?.x.arms) x.arms = hint.x.arms;
  return finish(kind);

  function finish(k: Kind): Verdict {
    const arch = KIND_ARCH[k];
    if (w < 20 || w > 320 || h < 15 || h > 260 || d < 12 || d > 240) return { skip: "size out of range" };
    if (arch === "table" && h < 30 && k !== "kidstable") return { skip: "size out of range" };
    if (arch === "shelf" && h < 25) return { skip: "size out of range" };
    const kw: string[] = [];
    if (outdoor) kw.push("outdoor", "garden");
    if (kids && !/children/.test(t)) kw.push("kids", "children");
    else if (kids) kw.push("kids");
    const size = sz!.bed ? `${sz!.text}, ${sz!.bed[0]} × ${sz!.bed[1]} cm` : sz!.text;
    return { draw: { kind: k, x, w: Math.round(w), h: Math.round(h), d: Math.round(d), label: raw, size, kw, guessed } };
  }
}
