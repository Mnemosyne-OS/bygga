import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";

/**
 * FLISAT, read from its manuals. The children's table is a frame with two lids: a middle bar on two dowels drops
 * into the frame, four screws hold it from underneath, the legs (their bolts already fitted) turn in by hand and
 * the lids lie in on top. The stool is just four splayed legs turned into the seat. The open storage is built from
 * ladder frames held by long bolts and shelves on dowels; see `storage`.
 */

const r = (n: number) => Math.round(n * 10) / 10;
const fx = (kind: CustomFix["kind"], on: string, dir: Vec3, at: Vec3[], o: Partial<CustomFix> = {}): CustomFix => ({
  kind,
  count: at.length,
  on,
  dir,
  at: at.map((p) => p.map(r) as Vec3),
  ...o,
});

function table(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const T = 22, rim = 70, bw = 50;
  const yTop = H, yF = H - T / 2;
  const frame: PartPiece[] = [
    ...[-1, 1].map((sz) => ({ shape: "box" as const, size: [W, T, rim] as Vec3, pos: [0, 0, sz * (D / 2 - rim / 2)] as Vec3 })),
    ...[-1, 1].map((sx) => ({ shape: "box" as const, size: [rim, T, D - 2 * rim] as Vec3, pos: [sx * (W / 2 - rim / 2), 0, 0] as Vec3 })),
  ];
  const inW = W - 2 * rim, inD = D - 2 * rim;
  const lidW = (inW - bw) / 2;
  const bt = 14, yBar = yTop - 8 - bt / 2;
  const legH = H - T, ld = 40;
  const lx = W / 2 - 45, lz = D / 2 - 45;
  const parts: CustomPart[] = [
    { id: "F", name: "Table frame", size: [W, T, D], pos: [0, yF, 0], pieces: frame, material: "wood" },
    { id: "M", name: "Middle bar", size: [bw, bt, inD], pos: [0, yBar, 0], material: "wood" },
    ...[-1, 1].map((sx, i) => ({ id: `L${i}`, name: "Lid", size: [lidW, 8, inD] as Vec3, pos: [sx * (bw / 2 + lidW / 2), yTop - 4, 0] as Vec3, material: "board" as const })),
    ...[-1, 1].flatMap((sx, i) => [-1, 1].map((sz, j) => ({ id: `G${i}${j}`, name: "Leg", size: [ld, legH, ld] as Vec3, pos: [sx * lx, legH / 2, sz * lz] as Vec3, shape: "cyl" as const, material: "wood" as const }))),
  ];
  const legs = parts.filter((p) => p.name === "Leg").map((p) => p.id);
  const steps: CustomStep[] = [
    {
      title: "Tap the dowels into the middle bar",
      detail: "One in each end, pushed in by hand or tapped gently.",
      fix: [fx("dowel", "M", [0, 0, 1], [[0, yBar, inD / 2]], { mate: "F" }), fx("dowel", "M", [0, 0, -1], [[0, yBar, -inD / 2]], { mate: "F" })],
      warnings: ["floor"],
    },
    {
      title: "Drop the bar into the frame",
      detail: "Lay the frame top up on a rug, then lower the bar across the middle so its dowels find the holes.",
      add: ["F"],
      from: { F: [0, -260, 0] },
    },
    {
      title: "Turn it over and screw the bar in",
      detail: "Two screws at each end, through the bar into the frame. Stop as soon as they sit flush.",
      fix: [fx("screw", "M", [0, 1, 0], [-1, 1].flatMap((sz) => [-1, 1].map((sx) => [sx * 12, yBar - bt / 2, sz * (inD / 2 - 25)] as Vec3)), { len: 16, dia: 3.5, mate: "F" })],
      tools: ["screwdriver"],
      pose: "-y",
    },
    {
      title: "Screw in the legs",
      detail: "The bolts are already in the legs. Turn each one clockwise by hand until it stops, and keep it straight.",
      add: legs,
    },
    {
      title: "Turn it over and lay the lids in",
      detail: "Stand it on its legs, then drop both lids into the frame on either side of the bar.",
      add: ["L0", "L1"],
      pose: "+y",
      from: { L0: [0, 220, 0], L1: [0, 220, 0] },
    },
  ];
  return { parts, steps };
}

function stool(s: ProductSpec): CustomParams {
  const H = s.size.h * 10, W = s.size.w * 10;
  const st = 30, sw = 270;
  const yS = H - st / 2, yB = H - st;
  const top = 85, foot = W / 2 - 25;
  const lean = Math.atan((foot - top) / yB);
  const len = Math.hypot(yB, (foot - top) * Math.SQRT2);
  const mid = (top + foot) / 2;
  const parts: CustomPart[] = [{ id: "S", name: "Seat", size: [sw, st, sw], pos: [0, yS, 0], material: "wood" }];
  [-1, 1].forEach((sx, i) =>
    [-1, 1].forEach((sz, j) => parts.push({ id: `G${i}${j}`, name: "Leg", size: [32, len, 32], pos: [sx * mid, yB / 2, sz * mid], rot: [-sz * lean, 0, sx * lean], shape: "cyl", material: "wood" })),
  );
  return {
    parts,
    steps: [
      { title: "Lay the seat upside down", detail: "On a rug or the flattened box, so the top doesn't scratch.", add: ["S"], pose: "-y", warnings: ["floor"] },
      {
        title: "Screw in the legs",
        detail: "Their bolts are already fitted. Turn each leg clockwise by hand until it is tight; the holes give them their lean.",
        add: parts.filter((p) => p.name === "Leg").map((p) => p.id),
      },
      { title: "Turn it over", detail: "Stand it up and check all four legs touch the floor.", pose: "+y" },
    ],
  };
}

const family: Family = {
  names: ["FLISAT"],
  recipe(s) {
    const slug = s.slug ?? "";
    if (/children-s-table/.test(slug)) return table(s);
    if (/children-s-stool/.test(slug)) return stool(s);
    return null;
  },
};
export default family;
