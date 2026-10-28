import type { Family } from "./family";
import type { CustomFix, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";
import { HW, type HwDef, type PlanBuilder } from "../builder";
import { buildCustom } from "../custom";

/**
 * IVAR, read from the side unit's manual. Each side is a ladder of solid pine: rungs knocked into two uprights
 * and locked with wooden pegs through the uprights (6, 8 or 10 by height). Two people stand the ladders up and
 * the shelves drop onto metal pins, four each, with a click. A steel cross brace is screwed across the back, and
 * each ladder is strapped to the wall at the top. Cabinets, doors, box shelves and the pine cube unit have their
 * own manuals and keep their old guides for now.
 */

const PEG: HwDef = { kind: "dowel", len: 40, dia: 6 };
const UX = 30; // upright, across the unit
const UZ = 44; // upright, front to back
const RUNG = 20;

// the pine cube unit (80x30) is a different build, with its own manual
const CUBE_UNIT = /ivar-shelving-unit-80-x-30/;

function shelvesOf(s: ProductSpec) {
  const p = s.shelf!;
  return Math.max(2, (p.shelves ?? 3) + (p.fixedShelf ? 1 : 0) + 1);
}

/** One ladder: its rungs, from the bottom up. 124 cm has three, 179 four, 226 five, so two pegs each give 6/8/10. */
function rungYs(H: number) {
  const n = H < 1500 ? 3 : H < 2000 ? 4 : 5;
  const lo = 70, hi = H - 50;
  return Array.from({ length: n }, (_, i) => lo + ((hi - lo) * i) / (n - 1));
}

function recipe(s: ProductSpec) {
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const n = shelvesOf(s);
  const ys = rungYs(H);
  const xSide = (sx: number) => sx * (W / 2 - UX / 2);
  const zUp = (sz: number) => sz * (D / 2 - UZ / 2);
  const parts: CustomPart[] = [];
  for (const [si, sx] of [-1, 1].entries()) {
    for (const [ui, sz] of [-1, 1].entries()) parts.push({ id: `U${si}${ui}`, name: "Upright", size: [UX, H, UZ], pos: [xSide(sx), H / 2, zUp(sz)], material: "wood" });
    ys.forEach((y, k) => parts.push({ id: `R${si}${k}`, name: "Rung", size: [RUNG, 45, D - 2 * UZ], pos: [xSide(sx), y, 0], material: "wood" }));
  }
  // shelves between the ladders, from the bottom one just above the lowest rung to the top one under the top rung
  const st = 20;
  const y0 = 110, y1 = H - 70;
  const shelfY = (i: number) => y0 + ((y1 - y0) * i) / (n - 1);
  for (let i = 0; i < n; i++) parts.push({ id: `S${i}`, name: "Shelf", size: [W - 2 * UX, st, D], pos: [0, shelfY(i), 0], material: "wood" });
  // the cross brace across the back, over the middle gap
  const mid = Math.floor((n - 1) / 2);
  const ya = shelfY(mid) + 40, yb = shelfY(Math.min(n - 1, mid + 1)) - 40;
  const span = W - 2 * UX - 40, rise = yb - ya;
  const len = Math.hypot(span, rise), ang = Math.atan2(rise, span);
  const rods: PartPiece[] = [
    { shape: "box", size: [len, 4, 4], pos: [0, 0, 0], rot: [0, 0, ang] },
    { shape: "box", size: [len, 4, 4], pos: [0, 0, 0], rot: [0, 0, -ang] },
  ];
  const zBrace = -D / 2 - 3;
  parts.push({ id: "X", name: "Cross brace", size: [span, rise, 4], pos: [0, (ya + yb) / 2, zBrace], pieces: rods, material: "metal" });

  // pegs go through the upright's outer face into the rung's tongue
  const pegs = (si: number, ui: number): CustomFix => {
    const sx = si ? 1 : -1, sz = ui ? 1 : -1;
    return {
      kind: "dowel",
      count: ys.length,
      at: ys.map((y) => [sx * (W / 2), y, zUp(sz)] as Vec3),
      dir: [-sx, 0, 0],
      on: `U${si}${ui}`,
      len: PEG.len,
      dia: PEG.dia,
    };
  };
  const rungs = (si: number) => ys.map((_, k) => `R${si}${k}`);
  const pins = (si: number, ui: number): CustomFix => {
    const sx = si ? 1 : -1, sz = ui ? 1 : -1;
    return {
      kind: "pin",
      count: n,
      at: Array.from({ length: n }, (_, i) => [sx * (W / 2 - UX), shelfY(i) - st / 2 - 3, zUp(sz)] as Vec3),
      dir: [sx, 0, 0],
      on: `U${si}${ui}`,
      dia: 6,
    };
  };
  const steps: CustomStep[] = [
    {
      title: "Knock the rungs into an upright",
      detail: "Lay the upright on a rug, holes up. Tap each rung's tongue into its slot, with a scrap of wood under the hammer.",
      add: ["U00", ...rungs(0)],
      tools: ["hammer"],
      pose: "+x",
      warnings: ["floor"],
    },
    { title: "Knock the pegs in", detail: "Pointed end first, through the upright and the rung's tongue, until they sit flush.", fix: [pegs(0, 0)], tools: ["hammer"] },
    { title: "Knock the second upright onto the rungs", detail: "Turn the ladder over first so the pegged upright lies on the rug.", add: ["U01"], tools: ["hammer"] },
    { title: "Peg the second upright", detail: "The same as the first, one peg at each rung.", fix: [pegs(0, 1)], tools: ["hammer"] },
    {
      title: "Build the other side unit the same way",
      detail: "Rungs into one upright, pegs, then the second upright and its pegs.",
      add: ["U10", "U11", ...rungs(1)],
      fix: [pegs(1, 0), pegs(1, 1)],
      tools: ["hammer"],
      pose: "-x",
    },
    {
      title: "Stand the sides up and put the shelves in",
      detail: "One of you holds the sides upright. Push four pins in level for each shelf, then press the shelf down onto them until it clicks.",
      add: Array.from({ length: n }, (_, i) => `S${i}`),
      fix: [pins(0, 0), pins(0, 1), pins(1, 0), pins(1, 1)],
      people: 2,
      pose: "+y",
      warnings: ["two"],
    },
    {
      title: "Screw on the cross brace",
      detail: "Across the back, one screw into each back upright at its four ends. It keeps the shelving from leaning.",
      add: ["X"],
      fix: [{ kind: "screw", count: 4, len: 16, dia: 4, dir: [0, 0, 1], at: [-1, 1].flatMap((sx) => [ya, yb].map((y) => [sx * (W / 2 - UX - 20), y, -D / 2] as Vec3)) }],
      tools: ["screwdriver"],
      people: 2,
      check: "square",
    },
  ];
  return { parts, steps, top: (si: number) => parts.find((p) => p.id === `U${si}0`)!.pos };
}

/** A strap on top of each back upright, screwed down with a washer, its other end on a screw in the wall. */
function strapStep(b: PlanBuilder, s: ProductSpec, backs: Vec3[]) {
  const H = s.size.h * 10, D = s.size.d * 10;
  const keys = backs.map((p) => b.items.find((it) => it.kind === "part" && it.final.pos.every((v, i) => Math.abs(v - p[i]) < 0.5))?.key);
  if (keys.some((k) => !k)) return;
  b.step(
    {
      title: "Strap it to the wall",
      detail: "One strap on top of each side, screwed down through a washer, the other end screwed to the wall. Wall screws aren't included: pick ones made for your wall.",
      tools: ["screwdriver", "drill", "pencil"],
      kind: "anchor",
      wall: true,
      warnings: ["wall", "tip"],
    },
    () => {
      b.stagger(0.2);
      backs.forEach((p, i) => b.fit(HW.strap, { on: keys[i], at: [p[0], H, p[2]], dir: [0, -1, 0], travel: 60 }));
      b.then(0.1);
      backs.forEach((p, i) => b.fit(HW.washer, { on: keys[i], at: [p[0], H + 2, p[2]], dir: [0, -1, 0], hole: false }));
      b.then(0.05);
      backs.forEach((p, i) => b.fit({ kind: "screw", len: 16, dia: 4 }, { on: keys[i], at: [p[0], H + 3, p[2]], dir: [0, -1, 0] }));
      b.then(0.1);
      for (const p of backs) b.fit(HW.plug, { at: [p[0], H - 20, -D / 2 - 40], dir: [0, 0, -1] });
      b.then(0.05);
      for (const p of backs) b.fit(HW.washer, { at: [p[0], H - 20, -D / 2 - 36], dir: [0, 0, -1], hole: false });
      for (const p of backs) b.fit(HW.wallScrew, { at: [p[0], H - 20, -D / 2 - 34], dir: [0, 0, -1] });
    },
  );
}

const family: Family = {
  names: ["IVAR"],
  build(b, s) {
    if (s.archetype !== "shelf" || s.shelf?.style !== "bookcase" || s.shelf.boxUnder) return false;
    if (CUBE_UNIT.test(s.slug ?? "")) return false;
    const r = recipe(s);
    buildCustom(b, { ...s, custom: { parts: r.parts, steps: r.steps } });
    strapStep(b, s, [r.top(0), r.top(1)]);
    return true;
  },
};
export default family;
