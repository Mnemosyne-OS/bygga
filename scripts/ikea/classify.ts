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

const UPRIGHT = new Set<Kind>(["cube", "bookcase", "open", "chest", "nightstand", "wardrobe", "cabinet", "sideboard", "tv", "shoe", "wallcab", "wallshelf", "kitchen", "mixed", "sliding", "slidecab", "washstand", "sinkcab", "appliance", "shoerack", "clothesrack", "changing", "divider"]);
const FLAT = new Set<Kind>(["desk", "coffee", "side", "dining", "bar", "console", "kidstable", "trolley", "bench"]);

/** Office chairs IKEA sells with armrests although the type doesn't say so. */
const OFFICE_ARMS = new Set(["MARKUS", "ALEFJÄLL"]);
/** Office chairs with a tall back and a headrest. */
const OFFICE_TALL = new Set(["MARKUS"]);
/** Gateleg tables with drawers in the middle, which we can't draw, and ones with a storage shelf and loose leaves. */
const GATE_DRAWERS = new Set(["NORDEN"]);
const GATE_STORAGE = new Set(["VIHALS"]);
/** The frame a family's combinations are rows of, in cm: two BILLY 80s, two BESTÅ 120s, two PAX 100s. */
const ROW_UNITS: Record<string, number> = { BILLY: 80, BESTÅ: 120, IVAR: 80, PAX: 100 };
/** PAX frames under a pair of sliding doors: 150 is two 75s, 200 two 100s. */
const PAX_SLIDE_UNITS = [100, 75];
/** Wash-stands' own height in cm, to tell how thick a basin from the same box is; and the ones that stand on the floor. */
const WASH_H: Record<string, number> = { HAVBÄCK: 63, ÄNGSJÖN: 63, TÄNNFORSEN: 63, HEMNES: 83, ENHET: 60, NYSJÖN: 65 };
const WASH_FLOOR = new Set(["HEMNES", "NYSJÖN"]);
/** Clothes racks IKEA lists without a size (w, h, d), from its product pages; RIGGA's height is set at its tallest. */
const RACK_SIZE: Record<string, [number, number, number]> = { RIGGA: [111, 175, 51] };
/** Day-beds' outer size (w, h, d) from IKEA's product pages: IKEA's measure is only the mattress size. */
const DAYBED_SIZE: Record<string, [number, number, number]> = { HEMNES: [210, 83, 91], BRIMNES: [205, 58, 87], FLEKKE: [207, 86, 91], VIHALS: [206, 75, 86] };

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

/** METOD combinations whose second name is a drawer system: the fronts are drawers, not doors. */
const DRAWER_SYSTEM = /\b(MAXIMERA|KNIVSHULT)\b/;
const doorsFor = (c: Ctx) => ((c.sz.n[0] ?? 60) >= 80 ? 2 : 1);
/** A high cabinet's front: what's under the appliance, a 60 cm opening, and a door over it when there's room. */
function tallFront(c: Ctx, use: NonNullable<X["use"]>, low: string, top: string): Pick {
  const h = c.sz.n[2] ?? 200;
  return { kind: "appliance", x: { use, z: `${low}+g@60${h - 140 >= 20 ? `+${top}` : ""}` } };
}

/** Most specific first. A string result is the reason to skip. */
const RULES: Rule[] = [
  // kitchen base cabinets for a sink: rails across the top, doors or drawers, and a fixed front that hides the sink
  // (IKEA writes some of these with a "+", which isn't a set here)
  [/^base cabinet for sink(?: \+ (\d) doors)?$/, (m, c) => ({ kind: "sinkcab", x: { z: `d${m[1] ? Math.min(2, Number(m[1])) : doorsFor(c)}` } })],
  [/^base cabinet f sink w (?:(\d) )?doors?\/front$/, (m) => ({ kind: "sinkcab", x: { z: `d${m[1] ? Math.min(2, Number(m[1])) : 1}@60+f@20` } })],
  [/^base cab f tallsjön sink$/, (_m, c) => ({ kind: "sinkcab", x: { z: DRAWER_SYSTEM.test(c.f.name) ? "r1@60+f@20" : `d${doorsFor(c)}@60+f@20` } })],
  // a sink with its own front (HAVSEN) fills the top of the cabinet
  [/^base cab f havsen (single|double) bowl sink$/, (m) => ({ kind: "sinkcab", x: { z: `d${m[1] === "double" ? 2 : 1}@60+a@20` } })],
  [/^base cb f havsen snk\/\d frnts\/(\d) drws$/, (m) => ({ kind: "sinkcab", x: { z: `r${m[1]}@60+a@20` } })],
  [/^base cab f sink\+(\d) fronts\/(\d) drawers$/, (m) => ({ kind: "sinkcab", x: { z: Number(m[1]) > Number(m[2]) ? `r${m[2]}@60+f@20` : `r${m[2]}` } })],
  [/^(?:base cab f sink\/waste sorting|sink cabinet with (?:door|organiser))$/, (_m, c) => ({ kind: "sinkcab", x: { z: `d${doorsFor(c)}` } })],
  // frames sold without fronts
  [/^base cb f (?:built-in appliances\/)?sink$/, () => ({ kind: "sinkcab", x: { z: "o" } })],
  // kitchen base cabinets full of drawers, one per front (a front can hide an inner drawer), and frames sold without fronts
  [/^base cabinet with (\d) drawers$|^base cb w (\d) drawers$/, (m) => ({ kind: "kitchen", x: { z: `r${m[1] ?? m[2]}` } })],
  [/^base (?:cab|cb) (\d) frnts\/.*\bdr(?:awers|wrs|w)$/, (m) => ({ kind: "kitchen", x: { z: `r${m[1]}` } })],
  [/^hi cab w shlvs\/\d drawers\/dr\/(\d) frnts$/, (m) => ({ kind: "kitchen", x: { z: `r${m[1]}@80+d1s3` } })],
  [/^base cabinet$/, () => ({ kind: "kitchen", x: { doors: 0 } })],
  [/^base cb w shelf$/, () => ({ kind: "kitchen", x: { doors: 0, shelves: 1 } })],
  [/^high fr w shelves$/, () => ({ kind: "kitchen", x: { doors: 0 } })],
  // cabinets with room for an oven, a fridge or a microwave, and base cabinets under a hob: the appliance is fitted afterwards
  [/^high cabinet f built-in appliances$/, (_m, c) =>
    tallFront(c, "appliance", DRAWER_SYSTEM.test(c.f.name) ? "r2@80" : c.f.spr ? "d1@80" : "o@80", c.f.spr ? "d1" : "o")],
  [/^high cab f oven w 2 doors\/shelves$/, (_m, c) => tallFront(c, "oven", "d1s1@80", "d1s1")],
  [/^(?:high cab f oven w door|high cabinet f oven\+door)\/(\d) drawers$/, (m, c) => tallFront(c, "oven", `r${m[1]}@80`, "d1")],
  [/^high cabinet w (\d) drawers for oven$/, (m, c) => tallFront(c, "oven", `r${m[1]}@80`, "d1")],
  [/^hi cab f ov w dr\/(\d) frnts?\//, (m, c) => tallFront(c, "oven", `r${m[1]}@80`, "d1")],
  [/^high cab f micro w 2 doors\/shelves$/, () => ({ kind: "appliance", x: { use: "microwave", z: "d1s2@100+g@40+d1s1" } })],
  // fridges and freezers: the appliance's own door is fixed to the cabinet door, by its own instructions
  [/^(?:hi|high) cab(?:inet)? f(?:or)? fridge(?:(?: or |\/)freezer)?(?: w(?:ith)? (?:(\d) )?(doors?|drs))?$/, (m, c) => {
    const n = m[1] ? Number(m[1]) : m[2] === "door" ? 1 : m[2] ? 2 : c.f.spr ? ((c.sz.n[2] ?? 200) >= 140 ? 2 : 1) : 0;
    if (n > 3) return "fridge cabinet with more than 3 doors";
    return { kind: "appliance", x: { use: "fridge", z: ["g+o@40", "d1", "d1+d1@60", "d1+d1+d1@60"][n] } };
  }],
  [/^base cabinet f built-in appliances$/, (_m, c) => ({ kind: "appliance", x: { use: "appliance", z: DRAWER_SYSTEM.test(c.f.name) ? "r1@20+g@60" : "o@20+g@60" } })],
  [/^base cabinet for oven with drawer$/, () => ({ kind: "appliance", x: { use: "oven", z: "r1@20+g@60" } })],
  [/^base cab for hob\+oven w drawer$/, () => ({ kind: "appliance", x: { use: "ovenhob", z: "r1@20+g@60" } })],
  [/^base cab f hob\/(\d) fronts\/\d drawers$/, (m) => ({ kind: "appliance", x: { use: "hob", z: `r${m[1]}` } })],
  [/^base cab f hob\/.*(wire|extractor)/, (m) => (m[1] === "wire" ? "base cabinet for a hob with wire baskets" : "base cabinet for a hob with a built-in extractor")],
  [/^wall cabinet for microwave oven$/, () => ({ kind: "appliance", x: { use: "microwave", z: "g@40+d1", hung: true } })],
  [/^wall cb f extr hood w shlf\/door$/, () => ({ kind: "appliance", x: { use: "hood", z: "d1s1", hung: true } })],
  [/^wall cabinet f b-in extractor hood$/, () => ({ kind: "appliance", x: { use: "hood", z: "o", hung: true } })],
  [/^top cabinet for fridge\/freezer$/, () => ({ kind: "appliance", x: { use: "fridge", z: "d1", hung: true } })],
  // cabinets with doors and drawers: the drawers under the doors, or one drawer above the door of a kitchen base cabinet
  [/^(glass-door cabinet with|high cabinet w gls-drs and) (\d) drawers?$/, (m) => ({ kind: "mixed", x: { rows: Number(m[2]) } })],
  [/^wardrobe with (\d) doors and (\d) drawers$/, (m) => (Number(m[1]) > 2 ? "wardrobe with more than 2 doors and drawers" : { kind: "mixed", x: { doors: Number(m[1]) as 1 | 2, rows: Number(m[2]), rail: true } })],
  [/^base cabinet with drawer\/(2 )?doors?$/, (m) => ({ kind: "mixed", x: { doors: m[1] ? 2 : 1, rows: 1, dtop: true } })],
  // things that are several products, or only part of one
  [/\b(and|set of \d|sets?)\b|\+|combination|\bcomb\b|\bchairs\b|armchairs|benches/, () => "set or combination"],
  // office and swivel chairs: a star base on castors, a gas lift, the seat on top
  [/^(office chair( with armrests| with arm\/headrest)?|swivel chair( with armrests)?|gaming chair|children's desk chair)$/, (m, c) => {
    const family = c.f.name.split(" / ")[0].trim();
    const arms = /arm/.test(m[0]) || /gaming/.test(m[0]) || OFFICE_ARMS.has(family);
    const seatH = c.kids ? 42 : /gaming/.test(m[0]) ? 50 : undefined;
    return { kind: "office", x: { arms: arms ? "slim" : "none", seatH } };
  }],
  [/swivel|office chair|gaming chair|conference|desk chair|highchair|lounge|reclining|lounger|hammock|massage/, () => "office, swivel or lounge chair"],
  // sofas with a chaise longue at one or both ends, and corner sofas (an L of sections)
  [/^(?=.*\bsofa)(?=.*\b(corner|crnr|chaise))/, (m) => {
    const t = m.input ?? "";
    if (/u-shaped/.test(t)) return "U-shaped sofa";
    const count = t.match(/(\d)(,5)?[- ]seat/);
    const n = count ? Number(count[1]) + (count[2] ? 1 : 0) : undefined;
    if (/corner|crnr/.test(t) && n !== undefined) {
      if (n > 6) return "corner sofa with more than 6 seats";
      // IKEA's corner sofas go either way round: draw the return on the left, where the view looks into the L
      return { kind: "corner", x: { seats: n, corner: "left", open: /chaise|open end/.test(t) || undefined } };
    }
    // a corner sofa-bed with no seat count is three seats and a chaise longue (FRIHETEN)
    const seats = n ?? 3;
    const both = /chaise (longue|lng)s\b/.test(t);
    if (seats > 5) return "sofa with more than 5 seats";
    if (both && seats < 3) return "chaise longues with no sofa between";
    return { kind: "chaise", x: { seats, chaise: both ? "both" : /\bleft\b/.test(t) ? "left" : "right" } };
  }],
  [/corner|chaise|u-shaped|crnr/, () => "corner or chaise longue sofa"],
  // a straight sofa section sold alone: a seat frame with legs, a backrest and cushions, no armrests
  [/^(\d)-seat section( for modular sofa)?$/, (m) => ({ kind: "section", x: { seats: Number(m[1]) } })],
  [/section|add-on|(?<!with )armrest|backrest for|seat sec|modular (easy chair|chaise)/, () => "sofa or storage section"],
  // bunk beds on four posts, and loft beds with room underneath (KURA turns over to be either)
  [/^(bunk bed frame|loft bed frame|loft bed|reversible bed)$/, (m, c) => {
    if (m[1] === "loft bed" && c.f.spr) return "loft bed with a desk or storage";
    return { kind: m[1] === "bunk bed frame" ? "bunk" : "loft" };
  }],
  [/\b(bunk|loft)\b/, () => "bunk or loft bed with a desk or underbed"],
  [/^cot( with drawer)?$/, (m) => ({ kind: "cot", x: m[1] ? { drawer: true } : {} })],
  [/\b(cot|crib)\b|cradle/, () => "cot bedding, mattress or cradle"],
  // day-beds: a bed that pulls out with drawers in it, a trundle, storage boxes or nothing underneath, with or without mattresses
  [/^day-bed( frame)?(?: (?:with|w) (?:(\d) drawers|(trundle bed)|(storage)|(\d) mattress))?(?:\/(\d) mattress(?:es)?)?$/, (m) => {
    const under: X = m[2] ? { under: "pullout", rows: Number(m[2]) } : m[3] ? { under: "trundle" } : m[4] ? { under: "boxes" } : {};
    return { kind: "daybed", x: { ...under, mats: Number(m[6] ?? m[5] ?? 0) || undefined } };
  }],
  [/day-?bed|divan/, () => "divan, or bedding for a day-bed"],
  // sliding doors on a wardrobe or a cabinet, running in tracks (doors sold alone stay skipped)
  [/^wardrobe with (\d )?sliding doors$/, (m) => (Number(m[1] ?? 2) > 3 ? "more than 3 sliding doors" : { kind: "sliding", x: { slides: Number(m[1] ?? 2) } })],
  [/^cabinet with (2 )?sliding (glass )?doors$/, (_m, c) =>
    c.f.spr ? "cabinet with sliding doors sold as a combination" : c.f.name === "IDÅSEN" ? "steel office cabinet" : { kind: "slidecab", x: { slides: 2 } }],
  [/sliding/, () => "sliding doors"],
  // wash-stands: drawers or doors under a basin, on the wall or on the floor; a basin from the same box goes on top last
  [/^(open )?(?:wash-?st(?:a)?n?d|wsh-stnd)(?: (?:w|with) (.+?))?(\/(?:deep )?wash-basin(?:\/tap)?)?$/, (m, c) => {
    const fronts = m[2] ?? "";
    const dr = fronts.match(/^(?:(\d) )?(drawers?|drw)$/);
    const ds = fronts.match(/^(?:(\d) )?(doors?|drs)$/);
    const sh = fronts.match(/^(\d) shelves$/);
    const wide = (c.sz.n[0] ?? 60) > 45;
    let z: string;
    if (m[1]) z = sh ? `o${sh[1]}` : dr ? "o1+r1@18" : fronts ? "" : "o1";
    else if (dr) z = `r${dr[1] ?? (/s$/.test(dr[2]) ? 2 : 1)}`;
    else if (ds) z = `d${Number(ds[1] ?? (ds[2] === "door" ? 1 : 2)) > 1 && wide ? 2 : 1}`;
    else z = fronts ? "" : "r2";
    if (!z) return "wash-stand we can't read";
    return { kind: "washstand", x: { z, basin: m[3] || c.multi ? 6 : undefined } };
  }],
  [/^wash-basin (?:base )?cabinet(?: w(?:ith)? (\d) doors)?$/, (m, c) =>
    ({ kind: "washstand", x: { z: `d${m[1] ? Math.min(2, Number(m[1])) : (c.sz.n[0] ?? 60) > 50 ? 2 : 1}`, basin: c.multi ? 6 : undefined } })],
  [/^base (?:cb|cabinet) f(?:or)? wash-?basin w(?:ith)? (\d) drawers$/, (m) => ({ kind: "washstand", x: { z: `r${m[1]}` } })],
  [/^base frame for wash-?basin$/, () => ({ kind: "washstand", x: { z: "o" } })],
  // the appliances, sinks, basins, taps and hoods themselves, and the fronts that go on a dishwasher
  [/sink|wash-?basin|wash-?st|hob\b|\boven|fridge|freezer|dishwasher|microwave|extractor|appliances|kitchenette|outdoor kitchen/, (_m, c) =>
    c.f.cats[0] === "od001" ? "outdoor kitchen" : "appliance, sink, tap or hood"],
  [/^(door\/)?drawer front|^drawer (without |with (framed )?(glass )?)front|^(high|medium|low) drawer with front|^fitting for mounting/, () => "door or drawer front sold alone"],
  [/drawers?\b.*\b(doors?|fronts?|shelves|baskets?)\b|\b(doors?|fronts?|shelves|baskets?)\b.*\bdrawers?\b/, () => "mixed doors and drawers"],

  // storage
  [/^bookcase$/, () => ({ kind: "bookcase" })],
  [/^(bookcase|shelving unit|shelf unit|cabinet|glass-door cabinet) with (glass |panel\/glass |panel |glass-)?(door|doors|\d doors)$/, (m, c) => (c.f.name === "KALLAX" ? "cube shelf with door inserts" : withDoors("cabinet", m[0]))],
  [/^(shelving unit|shelf unit|open shelving unit|open storage|storage unit|shelving unit in\/outdoor|shelf section|1 shelf section|shelving unit with (\d+) shelves)$/, (m, c) =>
    c.f.name === "KALLAX" ? { kind: "cube" } : { kind: "open", x: m[2] ? { shelves: Math.min(6, Number(m[2]) - 2) } : {} }],
  [/^(wall shelf unit|wall shelf|wall-mounted shelving unit|wall storage unit)$/, (m, c) => (c.sz.n.length === 3 && c.sz.n[2] >= 25) || (m[1] === "wall shelf unit" && c.sz.n.length >= 2) ? { kind: "wallshelf" } : "single shelf board"],
  // KALLAX on an underframe 17 cm high, sold together: the shelf, then the frame screwed to its bottom
  [/^shelving unit with underframe$/, (_m, c) => (c.f.name === "KALLAX" ? { kind: "cube", x: { uf: 17 } } : "shelving unit on an underframe")],
  // KALLAX sold with inserts: drawn as inserts with a door, from the bottom row up
  [/^shelving unit with (\d+) inserts$/, (m, c) => (c.f.name === "KALLAX" ? { kind: "cube", x: { ins: Number(m[1]) } } : "shelving unit with inserts")],
  // the same pieces under other names
  [/^mini chest (?:of drawers|with (\d) drawers)$/, (m) => ({ kind: "chest", x: { rows: Number(m[1] ?? 3) } })],
  [/^(?:cabinet with (\d) drawers|drawer unit with drop-file storage|modular chest of drawers)$/, (m) =>
    ({ kind: "chest", x: m[1] ? { rows: Number(m[1]) } : /drop-file/.test(m[0]) ? { rows: 2 } : {} })],
  [/^cabinet with \d compartments$/, () => ({ kind: "cube" })],
  [/^wall cb (?:with (\d) doors?|w (\d) shlf\/door|w (\d) shelves)$/, (m) =>
    ({ kind: "wallcab", x: m[3] ? { doors: 0, shelves: Number(m[3]) } : m[2] ? { doors: 1, shelves: Number(m[2]) } : { doors: Number(m[1]) > 1 ? 2 : 1 } })],
  [/^(?:wall frame with shelves|wall shelf frame|wall-mounted bedside table)$/, () => ({ kind: "wallshelf" })],
  [/^wall storage$/, (_m, c) => (c.f.spr ? "wall storage sold with boxes" : { kind: "wallshelf" })],
  [/^wall open cabinet$/, () => ({ kind: "wallcab", x: { doors: 0 } })],
  [/^wall mounted frame with doors$/, () => ({ kind: "wallcab" })],
  [/^mirror cabinet with (\d) doors?$/, (m) => ({ kind: "wallcab", x: { doors: Number(m[1]) > 1 ? 2 : 1 } })],
  [/^high cabinet with mirror door$/, () => ({ kind: "cabinet", x: { doors: 1 } })],
  [/^high cb w (\d) shelves$/, (m) => ({ kind: "cabinet", x: { doors: 0, shelves: Math.min(5, Number(m[1])) } })],
  [/^sideboard basic unit$/, () => ({ kind: "sideboard" })],
  [/^tv bench with plinth$/, () => ({ kind: "tv" })],
  [/^shelving unit\/bench$/, () => ({ kind: "open" })],
  [/^bar stool with backrest, foldable$/, () => ({ kind: "chair", x: { seatH: 63 } })],
  [/^three-seat sofa$/, () => ({ kind: "sofa", x: { seats: 3 } })],
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
  [/^(shoe rack|open shoe storage unit)$/, () => ({ kind: "shoerack" })],
  [/^room divider$/, () => ({ kind: "divider" })],
  // changing tables: a chest of drawers or an open frame with shelves, and a changing top on it
  [/^changing table(?: with drawers|\/chest of drawers|\/bookshelf|\/desk)?$/, (m, c) =>
    c.f.spr ? "changing table sold as a combination" : { kind: "changing", x: /drawers/.test(m[0]) ? { rows: 3 } : { shelves: /desk/.test(m[0]) ? 1 : 2 } }],
  // freestanding clothes racks: two uprights on feet, a rail across the top, a shoe shelf or a lower rail
  [/^(clothes rack|clothes rack with shoe storage|coat rack with shoe storage unit)$/, (m) => ({ kind: "clothesrack", x: /shoe/.test(m[1]) ? { shelf: true } : {} })],
  [/^(shoe cabinet|shoe cabinet\/storage|shoe cabinet with (\d) compartments)$/, (m) => ({ kind: "shoe", x: m[2] ? { c: Number(m[2]) } : {} })],

  // tables
  // a drop-leaf table is measured closed, then open: "74/134x80 cm", or "55/82/109x74 cm" with two leaves
  [/^drop-leaf table$/, (_m, c) => {
    const s = c.f.size.match(/^(\d+)\/(\d+)(?:\/(\d+))?x\d+ cm$/);
    if (!s) return "drop-leaf table with a size we can't read";
    const [closed, open1, open2] = [Number(s[1]), Number(s[2]), s[3] ? Number(s[3]) : undefined];
    const extra = (open2 ?? open1) - closed;
    const leaves = open2 !== undefined || extra >= 50 ? 2 : 1;
    return { kind: "dropleaf", x: { leaves, leaf: Math.round(extra / leaves) } };
  }],
  // a gateleg table, measured like a drop-leaf one: "67/124x75 cm" with one leaf, "39/95/151x90 cm" with two
  [/^gateleg table$/, (_m, c) => {
    const s = c.f.size.match(/^(\d+)\/(\d+)(?:\/(\d+))?x\d+ cm$/);
    if (!s) return "gateleg table with a size we can't read";
    if (GATE_DRAWERS.has(c.f.name)) return "gateleg table with drawers";
    const [closed, open1, open2] = [Number(s[1]), Number(s[2]), s[3] ? Number(s[3]) : undefined];
    const leaves = open2 !== undefined ? 2 : 1;
    const x: X = { leaves, leaf: Math.round(((open2 ?? open1) - closed) / leaves) };
    if (GATE_STORAGE.has(c.f.name)) Object.assign(x, { shelf: true, hinge: true });
    return { kind: "gateleg", x };
  }],
  [/^(gateleg|folding) table$/, () => "gateleg or folding table"],
  [/^(table|dining table|extendable table|kitchen table)$/, (_m, c) => ({ kind: c.kids ? "kidstable" : "dining" })],
  [/^children's table$/, () => ({ kind: "kidstable" })],
  [/^coffee table$/, () => ({ kind: "coffee" })],
  [/^side table( on castors)?$/, () => ({ kind: "side" })],
  [/^(bar table|high table)$/, () => ({ kind: "bar" })],
  [/^(console table|hall table)$/, () => ({ kind: "console" })],
  [/^(desk|computer desk|gaming desk|desk sit\/stand|gaming desk sit\/stand|dressing table|writing desk)$/, () => ({ kind: "desk" })],
  [/^(trolley|kitchen trolley|kitchen island|trolley table|serving trolley)$/, () => ({ kind: "trolley" })],

  // seating
  [/^(chair|dining chair|folding chair|chair with armrests)$/, (m, c) => (/arm/.test(m[0]) && !c.kids ? { kind: "chair", x: { arms: "slim" } } : { kind: c.kids ? "kidschair" : "chair" })],
  [/^children's chair$/, () => ({ kind: "kidschair" })],
  [/^junior chair$/, () => ({ kind: "junior" })],
  [/^(bar stool with backrest|bar chair)$/, () => ({ kind: "chair", x: { seatH: 63 } })],
  [/^(stool|bar stool|step stool|folding stool|children's stool|stool, \d+ steps?)$/, () => ({ kind: "stool" })],
  [/^(bench|bench with shoe storage)$/, () => ({ kind: "bench" })],
  // a bench with a backrest and armrests, built like a wide chair (IKEA gives no size: a typical garden bench)
  [/^bench with backrest$/, (_m, c) => (c.f.spr ? "bench with backrest sold with cushions" : { kind: "backbench" })],
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
  let sz = measure(f.size);
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
  // office chairs come in "Medium" and "Large" rather than centimetres
  if (!sz && pick.kind === "office" && /^(small|medium|large)$/i.test(f.size.trim())) sz = { n: [], ext: false, text: "" };
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
      if ((kind === "kitchen" || kind === "mixed" || kind === "sinkcab" || kind === "appliance") && /^base/.test(t)) set(v[0], 80, v[1]);
      // bedside tables are measured from above, like tables
      else if (kind === "nightstand" && /bedside|nightstand/.test(t)) set(v[0], hint?.kind === kind ? hint.h : 55, v[1]);
      else set(v[0], v[1]);
    } else if (v.length === 1) return { skip: "upright piece with one size" };
    else if (hint?.kind === kind) set(hint.w, hint.h, hint.d);
    else if (kind === "clothesrack" && RACK_SIZE[family]) set(...RACK_SIZE[family]);
    else return { skip: "no size given" };
    if (kind === "clothesrack" && h < 100) return { skip: "clothes rack measured in a way we can't read" };
    // a mini chest measured from the front only is a small, shallow box
    if (kind === "chest" && /^mini/.test(t) && guessed.d) d = Math.max(15, Math.round(w * 0.6));
    // a changing table is wider than it's deep, whichever way round IKEA writes it
    if (kind === "changing" && d > w) [w, d] = [d, w];
    if (guessed.d && hint?.kind === kind && Math.abs(hint.w - w) < 60) d = hint.d;
    // a cabinet with drawers is as deep as the family's cabinet
    const twin = kind === "mixed" || kind === "slidecab" ? "cabinet" : kind === "sliding" ? "wardrobe" : undefined;
    const cab = twin ? hints(family, twin) : undefined;
    if (guessed.d && cab && cab.kind === twin && Math.abs(cab.w - w) < 60) d = cab.d;
    if (kind === "washstand") {
      // the measure takes in a basin from the same box: whatever is above the wash-stand's own height is the basin
      if (x.basin) {
        const extra = WASH_H[family] ? h - WASH_H[family] : -1;
        x.basin = extra >= 4 ? Math.min(16, extra) : 6;
      }
      if (h - (x.basin ?? 0) <= 70 && !WASH_FLOOR.has(family)) x.hung = true;
    }
    // IKEA lists one KALLAX on an underframe with its depth and one without: the same thing, so the same row
    if (kind === "cube" && x.uf && v.length === 3) sz = { ...sz, text: `${v[0]} × ${v[2]} cm` };
    // a METOD wall cabinet is 37 deep, except the one over a fridge, which is as deep as the fridge's cabinet
    if (kind === "appliance" && guessed.d) d = x.hung && x.use !== "fridge" ? 37 : 60;
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
  } else if (kind === "dropleaf" || kind === "gateleg") {
    // drawn with the leaves up: as wide as it opens
    const open = Math.max(...f.size.replace(/x.*$/, "").split("/").map(Number));
    set(open, undefined, v[1]);
    h = hint?.kind === kind ? hint.h : 75;
  } else if (kind === "bunk" || kind === "loft") {
    // IKEA gives the mattress size; the height is a typical one (KURA, which turns over, is low)
    if (v.length !== 2 || v[1] < 180 || v[1] > 210) return { skip: "bunk or loft bed without a mattress size" };
    x.m = v[0];
    if (v[1] !== 200) x.l = v[1];
    set(v[1] + 11, undefined, v[0] + 10);
    h = kind === "bunk" ? 160 : /reversible/.test(t) ? 116 : 195;
  } else if (kind === "daybed") {
    // IKEA gives the mattress size; the outer size comes from IKEA's own pages where we have it
    if (v.length !== 2 || v[1] < 180 || v[1] > 210) return { skip: "day-bed without a mattress size" };
    x.m = v[0];
    if (v[1] !== 200) x.l = v[1];
    const known = DAYBED_SIZE[family];
    if (known) set(...known);
    else [w, h, d] = [v[1] + 7, 83, v[0] + 11];
    const chest = hints(family, "chest");
    if (x.rows && chest?.x.knobs) x.knobs = chest.x.knobs;
  } else if (kind === "cot") {
    // IKEA gives the mattress size: a cot is a little longer and wider, about 85 cm high
    if (v.length !== 2 || v[1] < 100 || v[1] > 150) return { skip: "cot without a mattress size" };
    [x.m, x.l] = [v[0], v[1]];
    set(v[1] + 10, undefined, v[0] + 8);
    h = v[1] >= 140 ? 86 : 82;
  } else if (kind === "chaise" || kind === "corner") {
    // IKEA gives no size: seat width, depth and height from a straight sofa of the same family, else a typical one
    const sofa = hints(family, "sofa");
    const arms = sofa?.x.arms ?? "wide";
    const armCm = arms === "wide" ? 17 : arms === "slim" ? 8 : 0;
    const per = sofa?.kind === "sofa" && sofa.x.seats ? Math.min(75, Math.max(55, (sofa.w - 2 * Math.min(armCm, sofa.w * 0.12)) / sofa.x.seats)) : 64;
    const sd = sofa?.kind === "sofa" && sofa.d <= 110 ? sofa.d : 92;
    if (sofa?.kind === "sofa") h = sofa.h;
    x.arms = arms;
    x.sd = sd;
    const n = x.seats ?? 3;
    if (v.length) return { skip: "corner sofa measured in a way we can't place" };
    if (kind === "chaise") {
      [w, d] = [n * per + 2 * armCm, Math.min(175, Math.max(140, sd + 68))];
    } else {
      // the long side gets the extra seat; seats shrink a little if the L would be too big to draw
      const n1 = Math.ceil((n - 1) / 2), n2 = n - 1 - n1;
      const front = x.open || !n2 ? 0 : armCm;
      const cw = Math.min(per, (318 - armCm - sd) / n1, n2 ? (238 - sd - front) / n2 : Infinity);
      if (cw < 50) return { skip: "corner sofa too large" };
      [w, d] = [armCm + n1 * cw + sd, sd + n2 * cw + front];
    }
  } else if (kind === "section") {
    // IKEA gives no size: seat width, depth and height from a straight sofa of the same family, else a typical one
    if (v.length) return { skip: "sofa section measured in a way we can't place" };
    const sofa = hints(family, "sofa");
    const armCm = sofa?.x.arms === "slim" ? 8 : sofa?.x.arms === "none" ? 0 : 17;
    const per = sofa?.kind === "sofa" && sofa.x.seats ? Math.min(75, Math.max(55, (sofa.w - 2 * Math.min(armCm, sofa.w * 0.12)) / sofa.x.seats)) : 64;
    w = (x.seats ?? 1) * per;
    if (sofa?.kind === "sofa") [h, d] = [sofa.h, sofa.d <= 110 ? sofa.d : 92];
  } else if (kind === "office") {
    // IKEA gives no size for office chairs: a typical one, taller with a headrest, smaller for children
    if (v.length === 3) set(v[0], v[2], v[1]);
    else if (kids) [w, h, d] = [52, 86, 52];
    else {
      if (x.arms === "none") w = 60;
      if (/headrest|gaming/.test(t) || OFFICE_TALL.has(family)) h = 128;
    }
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
  if (hint?.x.knobs && ["chest", "nightstand", "wardrobe", "cabinet", "sideboard", "tv", "shoe", "wallcab", "kitchen", "mixed", "washstand", "sinkcab", "appliance"].includes(kind)) x.knobs = hint.x.knobs;
  if (kind === "chest" || kind === "nightstand") {
    const total = x.rows ?? (kind === "nightstand" ? (h >= 60 ? 2 : 1) : Math.min(6, Math.max(2, Math.round(h / 14))));
    if (kind === "chest" && total === 2 && w <= 60 && h <= 65 && !/^mini/.test(t)) return finish("nightstand");
    const shape = kind === "nightstand" ? { rows: Math.min(total, 3), cols: 1 as const } : chestShape(total, w, h);
    if (!shape) return { skip: "drawers we can't lay out (open sections or 3 columns)" };
    x.rows = shape.rows;
    if (shape.cols === 2) x.cols = 2;
    if (hint?.x.plinth) x.plinth = true;
  }
  if (kind === "wardrobe" && x.doors === 0 && hint?.x.shelves) x.shelves = hint.x.shelves;
  // a combination this wide is more than one frame, which one carcass can't show: a row of them when the frames are all alike
  const several =
    (kind === "wardrobe" || kind === "sliding") && multi && w > 100
      ? "several wardrobe frames"
      : ((kind === "cabinet" || kind === "bookcase") && multi && w > 100) ||
          (f.spr && w > 125 && ["bookcase", "open", "cabinet", "wardrobe", "shoe", "wallcab", "wallshelf", "kitchen", "sliding", "slidecab"].includes(kind)) ||
          (kind === "tv" && f.spr && w > 200)
        ? "several units side by side"
        : null;
  if (several) {
    // PAX frames (58 or 35 deep) with a pair of sliding doors in front of them all: IKEA's depth includes the doors
    const sliding = family === "PAX" && (kind === "sliding" || (kind === "wardrobe" && (d === 66 || d === 43)));
    if (sliding) {
      const unit = PAX_SLIDE_UNITS.find((u) => w % u === 0 && w / u >= 2 && w / u <= 3);
      if (!unit) return { skip: "PAX with sliding doors over frames of different widths" };
      Object.assign(x, { n: w / unit, of: "wardrobe", slides: 2, doors: undefined, shelves: hints(family, "wardrobe")?.x.shelves });
      for (const k of Object.keys(x) as (keyof X)[]) if (x[k] === undefined) delete x[k];
      return finish("cabrow");
    }
    const unit = ROW_UNITS[family];
    const n = unit ? Math.round(w / unit) : 0;
    if (!unit || n < 2 || n > 4 || n * unit !== w || !["bookcase", "cabinet", "tv", "wardrobe", "wallcab"].includes(kind)) return { skip: several };
    x.n = n;
    x.of = kind as NonNullable<X["of"]>;
    return finish(kind === "bookcase" ? "bookrow" : "cabrow");
  }
  if (kind === "tv" && h > 100) return { skip: "TV storage wall" };
  if (kind === "shoe" && x.c === undefined) x.c = h < 60 ? 1 : h < 115 ? 2 : 3;
  if (kind === "cube" && (Math.round((w - 6) / 35) > 5 || Math.round((h - (x.uf ?? 0) - 6) / 35) > 5)) return { skip: "cube grid larger than 5 x 5" };
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
