import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";
import type { PlanBuilder } from "../builder";
import { buildCustom } from "../custom";

/**
 * ÄLSKVÄRD, read from the cot's and the crib's manuals (the two build the same way). Feet are knocked into the two
 * end frames while they lie on a rug, the two bottom rails go between them on dowels and long bolts with barrel nuts,
 * four hooks (eye bolts on the crib) hold the slatted base at its top height, then both barred sides drop onto the
 * rails and are bolted to the ends. The front side's lower corners get a screw and sleeve each. Lowering the base and
 * taking a side off later follow the manual's own pages. The changing table has its own 40-step manual and keeps its
 * old guide for now.
 */

function fx(kind: CustomFix["kind"], at: Vec3[], dir: Vec3, on?: string, o: Partial<CustomFix> = {}): CustomFix {
  return { kind, count: at.length, at, dir, on, ...o };
}

const isCot = (s: ProductSpec) => /\b(cot|crib)\b/i.test(`${s.slug ?? ""} ${s.variant}`) && !/changing/i.test(`${s.slug ?? ""} ${s.variant}`);

function cot(s: ProductSpec): CustomParams {
  const crib = /crib/i.test(`${s.slug ?? ""} ${s.variant}`);
  // IKEA's sizes: the mattress plus the frame round it
  const m = `${s.slug ?? ""}`.match(/(\d+)-x-(\d+)/);
  const mw = s.bed?.mattressW ?? (m ? +m[1] : 70), ml = s.bed?.mattressL ?? (m ? +m[2] : 140);
  const L = ml * 10 + 60, D = mw * 10 + 40, H = crib ? 960 : 930;
  const P = 45; // frame posts
  const xe = L / 2 - P / 2; // end frames
  const xi = L / 2 - P; // their inside faces
  const zr = D / 2 - P / 2; // rails and sides
  const sideTop = H - 120;
  const yRail = 160, railH = 60;
  const yBase = crib ? 440 : 420;
  const parts: CustomPart[] = [];
  const endPieces: PartPiece[] = [
    ...[-1, 1].map((sz): PartPiece => ({ shape: "box", size: [P, H - P / 2, P], pos: [0, -P / 4, sz * zr] })),
    { shape: "cyl", size: [P, D - P, P], pos: [0, H / 2 - P / 2, 0], rot: [Math.PI / 2, 0, 0] },
    { shape: "box", size: [16, H - 160 - P, D - 2 * P], pos: [0, (160 + H - P) / 2 - H / 2, 0] },
  ];
  for (const [i, sx] of [-1, 1].entries()) parts.push({ id: `E${i}`, name: "End frame", size: [P, H, D], pos: [sx * xe, H / 2, 0], pieces: endPieces, material: "wood" });
  for (const [i, sz] of [-1, 1].entries()) parts.push({ id: `R${i}`, name: "Bottom rail", size: [2 * xi, railH, 22], pos: [0, yRail, sz * zr], material: "wood" });
  // the slatted base: two long battens and slats across
  const bw = 2 * xi - 4, bd = D - 2 * P - 4;
  const nSlats = Math.round(bw / 105);
  const basePieces: PartPiece[] = [
    ...[-1, 1].map((sz): PartPiece => ({ shape: "box", size: [bw, 25, 40], pos: [0, -5, sz * (bd / 2 - 20)] })),
    ...Array.from({ length: nSlats }, (_, k): PartPiece => ({ shape: "box", size: [60, 12, bd], pos: [-bw / 2 + 40 + ((bw - 80) * k) / (nSlats - 1), 12, 0] })),
  ];
  parts.push({ id: "BASE", name: "Slatted base", size: [bw, 35, bd], pos: [0, yBase, 0], pieces: basePieces, material: "wood" });
  // the barred sides: a rail top and bottom and round bars between
  const sy0 = yRail + railH / 2, sh = sideTop - sy0;
  const nBars = Math.round((2 * xi) / 75);
  const sidePieces: PartPiece[] = [
    { shape: "box", size: [2 * xi, 40, 30], pos: [0, -sh / 2 + 20, 0] },
    { shape: "box", size: [2 * xi, 45, 30], pos: [0, sh / 2 - 22, 0] },
    ...Array.from({ length: nBars }, (_, k): PartPiece => ({ shape: "cyl", size: [24, sh - 85, 24], pos: [-xi + ((2 * xi) * (k + 1)) / (nBars + 1), -1, 0] })),
  ];
  for (const [i, sz] of [-1, 1].entries()) parts.push({ id: `S${i}`, name: "Barred side", size: [2 * xi, sh, 30], pos: [0, sy0 + sh / 2, sz * zr], pieces: sidePieces, material: "board" });

  const legFeet = [-1, 1].flatMap((sx) => [-1, 1].map((sz): Vec3 => [sx * xe, 0, sz * zr]));
  const end = (sx: number) => (sx < 0 ? "E0" : "E1");
  const railDowels = [-1, 1].flatMap((sz, i) => [-1, 1].map((sx) => fx("dowel", [-12, 12].map((dy): Vec3 => [sx * xi, yRail + dy, sz * zr]), [-sx, 0, 0], `R${i}`)));
  const bolts = (sx: number, ys: number[]) =>
    fx("bolt", ys.flatMap((y) => [-1, 1].map((sz): Vec3 => [sx * (L / 2), y, sz * zr])), [-sx, 0, 0], end(sx), { len: 90, dia: 6, name: "Long bolt" });
  const barrels = (sx: number, ys: { y: number; on: (sz: number) => string }[]) =>
    ys.flatMap(({ y, on }) => [-1, 1].map((sz) => fx("nut", [[sx * (xi - 45), y, sz * zr]], [0, -1, 0], on(sz), { name: "Barrel nut" })));
  const railTop = yRail + railH / 2;
  const hookPts = [-1, 1].flatMap((sx) => [-1, 1].map((sz): Vec3 => [sx * xi, yBase - 18, sz * (bd / 2 - 20)]));
  const steps: CustomStep[] = [
    {
      title: "Knock the feet into the end frames",
      detail: "Lay both frames on a rug and tap a foot into the bottom of each leg.",
      fix: [-1, 1].map((sx) => fx("glide", legFeet.filter((p) => Math.sign(p[0]) === sx), [0, 1, 0], end(sx), { name: "Foot" })),
      tools: ["hammer"],
      warnings: ["floor"],
    },
    { title: "Tap dowels into the bottom rails", detail: "Two in each end of both rails.", fix: railDowels, tools: ["hammer"] },
    { title: "Push the rails into an end frame", detail: "Stand the frame up and press the rails' dowels into its legs.", add: ["E0"] },
    {
      title: "Bolt the rails to it",
      detail: "Drop a barrel nut into each rail, slot towards the bolt, then turn the long bolts in through the legs.",
      fix: [...barrels(-1, [{ y: railTop, on: (sz) => (sz < 0 ? "R0" : "R1") }]), bolts(-1, [yRail])],
      tools: ["allen", "flathead"],
    },
    { title: "Fit the other end frame", detail: "Line it up with the dowels and push it on.", add: ["E1"] },
    { title: "Bolt the rails to it", detail: "Barrel nuts first, then the two long bolts.", fix: [...barrels(1, [{ y: railTop, on: (sz) => (sz < 0 ? "R0" : "R1") }]), bolts(1, [yRail])], tools: ["allen", "flathead"] },
    { title: "Tap two dowels into the back rail", detail: "Into the holes along its top edge, for the fixed side.", fix: [fx("dowel", [-1, 1].map((sx): Vec3 => [(sx * L) / 4, railTop, -zr]), [0, -1, 0], "R0")], tools: ["hammer"] },
    {
      title: crib ? "Screw the eye bolts into the end frames" : "Screw the base hooks into the end frames",
      detail: "Four of them, in the top set of holes inside the frames, turned in by hand until they stop. The top height is for a newborn.",
      fix: [-1, 1].map((sx) => fx("hook", hookPts.filter((p) => Math.sign(p[0]) === sx), [sx, 0, 0], end(sx), { name: crib ? "Eye bolt" : "Base hook" })),
    },
    { title: "Lay the base on the hooks", detail: "Slats up, its corners resting on all four.", add: ["BASE"] },
    {
      title: "Bolt the base to the hooks",
      detail: crib ? "A bolt down through each corner of the base and the eye bolt, with a sleeve nut from below." : "A short bolt down through each corner of the base into its hook.",
      fix: crib
        ? [fx("bolt", hookPts.map((p): Vec3 => [p[0] - Math.sign(p[0]) * 20, yBase + 18, p[2]]), [0, -1, 0], "BASE", { len: 40, dia: 6 }), fx("nut", hookPts.map((p): Vec3 => [p[0] - Math.sign(p[0]) * 20, yBase - 30, p[2]]), [0, 1, 0], "BASE", { name: "Sleeve nut" })]
        : [fx("bolt", hookPts.map((p): Vec3 => [p[0] - Math.sign(p[0]) * 20, yBase + 18, p[2]]), [0, -1, 0], "BASE", { len: 25, dia: 6 })],
      tools: ["allen"],
    },
    { title: "Lower both barred sides in", detail: "The fixed side goes onto the dowels on the back rail, the other at the front.", add: ["S0", "S1"], from: { S0: [0, 320, 0], S1: [0, 320, 0] } },
    {
      title: "Bolt the sides to the end frames",
      detail: "Barrel nuts into the sides' rails, then eight long bolts through the frames, two at each corner.",
      fix: [
        ...[-1, 1].flatMap((sx) => barrels(sx, [{ y: sideTop, on: (sz) => (sz < 0 ? "S0" : "S1") }, { y: sy0 + 40, on: (sz) => (sz < 0 ? "S0" : "S1") }])),
        bolts(-1, [sy0 + 20, sideTop - 22]),
        bolts(1, [sy0 + 20, sideTop - 22]),
      ],
      tools: ["allen", "flathead"],
    },
    {
      title: "Screw the sides' lower corners",
      detail: "A sleeve from inside and a screw from outside at each lower corner, through the frame.",
      fix: [-1, 1].flatMap((sx) => [fx("nut", [-1, 1].map((sz): Vec3 => [sx * xi, sy0 + 90, sz * zr]), [sx, 0, 0], end(sx), { name: "Sleeve" }), fx("screw", [-1, 1].map((sz): Vec3 => [sx * (L / 2), sy0 + 90, sz * zr]), [-sx, 0, 0], end(sx), { len: 60, dia: 5 })]),
      tools: ["screwdriver", "allen"],
    },
    { title: "Tighten the side bolts", detail: "Go round the four bolts at the top corners again until the heads sit flush, no further. Check nothing wobbles.", tools: ["allen"], check: "square" },
    {
      title: "Lower the base as your child grows",
      detail: "Once your child can sit up, move the hooks and the base to the lower holes. Later one side can come off; the guard rail and spare fittings in the box are for that.",
      warnings: ["hand"],
    },
  ];
  return { parts, steps };
}

/** The end frames lie on the rug while their feet go in, then stand up in their own steps. */
function buildCot(b: PlanBuilder, s: ProductSpec) {
  const recipe = cot(s);
  const e = recipe.parts.filter((p) => p.id === "E0" || p.id === "E1");
  const keyOf = (id: string) => {
    const p = recipe.parts.find((q) => q.id === id)!.pos;
    return b.items.find((it) => it.kind === "part" && it.final.pos.every((v, i) => Math.abs(v - p[i]) < 0.5))?.key;
  };
  const step = b.step.bind(b);
  b.step = (def, body) =>
    step(def, () => {
      if (b.steps.length === 1) {
        b.stagger(0.15);
        e.forEach((p, i) => {
          const k = keyOf(p.id);
          if (k) b.stage(k, [(i ? 1 : -1) * (p.size[1] / 2 + 80), p.size[0] / 2, 0], [0, 0, Math.PI / 2], [0, 200, 0]);
        });
        b.then(0.15);
      }
      body();
    });
  try {
    buildCustom(b, { ...s, custom: recipe });
  } finally {
    b.step = step;
  }
}

const family: Family = {
  names: ["ÄLSKVÄRD", "ALSKVARD"],
  build(b, s) {
    if (!isCot(s)) return false;
    buildCot(b, s);
    return true;
  },
};
export default family;
