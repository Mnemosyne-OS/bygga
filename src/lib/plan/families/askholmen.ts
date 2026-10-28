import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";

/**
 * ASKHOLMEN, read from IKEA's manuals for the chair with armrests and the 143x75 table (solid acacia).
 *
 * Chair: the slatted seat gets a dowel in the front end of each side rail, the back frame is bolted on with two
 * barrel nuts, then each armrest (its front leg fixed under it) goes onto the dowel and is bolted to the back leg
 * through a washer into a sleeve nut; last, two more barrel nuts and bolts fix the front legs to the seat.
 * Table: built upside down on a rug. The two leg frames are bolted to the top's edge rails (long bolt, washer and
 * sleeve nut at each of four joints), two braces run from the top's middle rail to the frames' lower rails, screwed
 * at the top and bolted into barrel nuts at the foot, then two people turn it over.
 * The folding chair and folding table come assembled (no manual), so they keep their old guides.
 */

const pt = (x: number, y: number, z: number): Vec3 => [x, y, z];

/* ---------------------------------------------------------------- chair with armrests */

function chairRecipe(): CustomParams {
  const SX = 235; // seat rails, inner face of the legs
  const LX = 255; // leg centres
  const AX = 267; // armrests
  const SY0 = 340, SY1 = 410; // seat frame, 41 cm seat height
  const SZ0 = -205, SZ1 = 230;
  const tilt = -0.12; // the backrest leans back
  const backLegs: PartPiece[] = [-1, 1].flatMap((g): PartPiece[] => [
    { shape: "box", size: [40, 410, 45], pos: [g * LX, 205, -225] },
    { shape: "box", size: [40, 430, 40], pos: [g * LX, 610, -250], rot: [tilt, 0, 0] },
  ]);
  const slats = [600, 690, 780].map((y): PartPiece => ({ shape: "box", size: [2 * SX, 65, 20], pos: [0, y, -250 + (y - 610) * Math.sin(tilt)], rot: [tilt, 0, 0] }));
  // the back frame's pieces, about the middle of its bounding box
  const bc: Vec3 = [0, 410, -260];
  const rel = (p: PartPiece): PartPiece => ({ ...p, pos: [p.pos[0] - bc[0], p.pos[1] - bc[1], p.pos[2] - bc[2]] });
  const seatSlats = Array.from({ length: 7 }, (_, i): PartPiece => ({ shape: "box", size: [2 * SX, 18, 50], pos: [0, (SY1 - 9) - (SY0 + SY1) / 2, SZ0 + 30 + (i * (SZ1 - SZ0 - 60)) / 6 - (SZ0 + SZ1) / 2] }));
  const seatRails: PartPiece[] = [
    ...[-1, 1].map((g): PartPiece => ({ shape: "box", size: [24, SY1 - SY0 - 18, SZ1 - SZ0], pos: [g * (SX - 12), -9, 0] })),
    { shape: "box", size: [2 * SX - 48, SY1 - SY0 - 18, 24], pos: [0, -9, (SZ1 - SZ0) / 2 - 12] },
  ];
  const arm = (g: number): PartPiece[] => [
    { shape: "box", size: [55, 28, 490], pos: [g * (AX - LX), 655 - 335, 0] },
    { shape: "box", size: [42, 641, 45], pos: [0, 320.5 - 335, 230 - 15] },
  ];
  const parts: CustomPart[] = [
    { id: "S", name: "Seat", size: [2 * SX, SY1 - SY0, SZ1 - SZ0], pos: [0, (SY0 + SY1) / 2, (SZ0 + SZ1) / 2], pieces: [...seatRails, ...seatSlats], material: "wood" },
    { id: "B", name: "Back frame", size: [2 * LX + 40, 820, 120], pos: bc, pieces: [...backLegs, ...slats].map(rel), material: "wood" },
    ...[-1, 1].map((g, i): CustomPart => ({ id: `A${i}`, name: "Armrest with front leg", size: [80, 670, 490], pos: [g * LX, 335, 15], pieces: arm(g), material: "wood" })),
  ];
  const yB = (SY0 + SY1) / 2 - 8;
  const steps: CustomStep[] = [
    {
      title: "Tap a dowel into the front of each seat rail",
      detail: "Lay the seat upside down on a rug. One dowel in the end of each side rail at the front.",
      add: ["S"],
      fix: [{ kind: "dowel", count: 2, len: 30, dia: 8, on: "S", at: [-1, 1].map((g) => pt(g * (SX - 12), yB, SZ1)), dir: [0, 0, 1] }],
      tools: ["hammer"],
      warnings: ["floor"],
    },
    {
      title: "Bolt the back frame to the seat",
      detail: "A barrel nut in each side rail with its slot facing the bolt, then a long bolt through each back leg. Tighten with the Allen key.",
      add: ["B"],
      fix: [
        { kind: "nut", name: "Barrel nut", count: 2, len: 14, dia: 10, on: "S", at: [-1, 1].map((g) => pt(g * (SX - 12), yB, SZ0 + 30)), dir: [0, -1, 0] },
        ...[-1, 1].map((g): CustomFix => ({ kind: "bolt", count: 1, len: 70, dia: 6, on: "B", at: [pt(g * (LX + 20), yB, SZ0 + 30)], dir: [-g, 0, 0] })),
      ],
      tools: ["flathead", "allen"],
      from: { B: [0, 0, -300] },
    },
    {
      title: "Fit the armrests and bolt them to the back legs",
      detail: "Push each front leg onto its seat dowel, then a long bolt through the back of the armrest with a washer between it and the leg, into a sleeve nut from outside the leg.",
      add: ["A0", "A1"],
      fix: [
        ...[0, 1].map((i): CustomFix => ({ kind: "washer", count: 1, len: 2, dia: 18, on: `A${i}`, at: [pt((i ? 1 : -1) * (AX + 28), 655, -215)], dir: [i ? -1 : 1, 0, 0] })),
        ...[0, 1].map((i): CustomFix => ({ kind: "bolt", count: 1, len: 70, dia: 6, on: `A${i}`, at: [pt((i ? 1 : -1) * (AX + 30), 655, -215)], dir: [i ? -1 : 1, 0, 0], mate: "B" })),
        ...[0, 1].map((i): CustomFix => ({ kind: "nut", name: "Sleeve nut", count: 1, len: 20, dia: 10, on: "B", at: [pt((i ? 1 : -1) * (LX - 20), 655, -215)], dir: [i ? 1 : -1, 0, 0] })),
      ],
      tools: ["allen"],
    },
    {
      title: "Bolt the front legs to the seat",
      detail: "A barrel nut in the front of each seat rail, then a long bolt through each front leg. Tighten every bolt once more.",
      fix: [
        { kind: "nut", name: "Barrel nut", count: 2, len: 14, dia: 10, on: "S", at: [-1, 1].map((g) => pt(g * (SX - 12), yB, SZ1 - 30)), dir: [0, -1, 0] },
        ...[0, 1].map((i): CustomFix => ({ kind: "bolt", count: 1, len: 70, dia: 6, on: `A${i}`, at: [pt((i ? 1 : -1) * (LX + 21), yB, SZ1 - 30)], dir: [i ? -1 : 1, 0, 0] })),
      ],
      tools: ["flathead", "allen"],
    },
  ];
  return { parts, steps };
}

/* ---------------------------------------------------------------- table */

function tableRecipe(s: ProductSpec): CustomParams {
  const W = Math.round(s.size.w * 10) || 1430, D = Math.round(s.size.d * 10) || 750, H = 730;
  const TT = 22, RH = 50;
  const ty = H - TT / 2;
  const n = Math.round(W / 70);
  const slatW = (W - (n - 1) * 8) / n;
  const topPieces: PartPiece[] = [
    ...Array.from({ length: n }, (_, i): PartPiece => ({ shape: "box", size: [slatW, TT, D], pos: [-W / 2 + slatW / 2 + i * (slatW + 8), 0, 0] })),
    ...[-1, 1].map((g): PartPiece => ({ shape: "box", size: [W - 40, RH, 30], pos: [0, -TT / 2 - RH / 2, g * (D / 2 - 45)] })),
    { shape: "box", size: [W - 260, 40, 40], pos: [0, -TT / 2 - 20, 0] },
  ];
  const topY = (H - TT - RH + H) / 2; // centre of the top with its rails
  const topRel = topPieces.map((p): PartPiece => ({ ...p, pos: [p.pos[0], p.pos[1] + ty - topY, p.pos[2]] }));
  const LX = W / 2 - 160; // leg frames, set in from the ends
  const LZ = D / 2 - 90;
  const legH = H - TT;
  const frame: PartPiece[] = [
    ...[-1, 1].map((g): PartPiece => ({ shape: "box", size: [50, legH, 50], pos: [0, 0, g * LZ] })),
    { shape: "box", size: [45, 70, 2 * LZ - 50], pos: [0, legH / 2 - 35, 0] },
    { shape: "box", size: [40, 50, 2 * LZ - 50], pos: [0, 160 - legH / 2, 0] },
  ];
  // the braces run from the top's middle rail down to each frame's lower rail
  const bx0 = 300, by0 = H - TT - 40, bx1 = LX - 25, by1 = 185;
  const brace = (g: number): CustomPart => {
    const dx = bx1 - bx0, dy = by0 - by1;
    const len = Math.hypot(dx, dy);
    return { id: `X${g < 0 ? 0 : 1}`, name: "Brace", size: [len, 40, 36], pos: [g * (bx0 + bx1) / 2, (by0 + by1) / 2, 0], rot: [0, 0, -g * Math.atan2(dy, dx)], material: "wood" };
  };
  const parts: CustomPart[] = [
    { id: "T", name: "Table top", size: [W, TT + RH, D], pos: [0, topY, 0], pieces: topRel, material: "wood" },
    ...[-1, 1].map((g, i): CustomPart => ({ id: `F${i}`, name: "Leg frame", size: [50, legH, 2 * LZ + 50], pos: [g * LX, legH / 2, 0], pieces: frame, material: "wood" })),
    brace(-1),
    brace(1),
  ];
  const jy = H - TT - RH / 2;
  const steps: CustomStep[] = [
    { title: "Lay the top upside down on a rug", detail: "Slats down, rails up, on something soft so the surface doesn't get scratched.", add: ["T"], pose: "-y", warnings: ["floor"] },
    { title: "Stand the two leg frames on the top", detail: "Legs pointing up, each frame between the edge rails near an end.", add: ["F0", "F1"] },
    {
      title: "Bolt the leg frames to the edge rails",
      detail: "At each of the four joints: a long bolt with a washer through the edge rail into the frame, and a sleeve nut from the other side. One Allen key holds the nut while the other turns the bolt.",
      fix: [
        ...[-1, 1].map((gz): CustomFix => ({ kind: "washer", count: 2, len: 2, dia: 18, at: [-1, 1].map((gx) => pt(gx * LX, jy, gz * (D / 2 - 30))), dir: [0, 0, -gz] })),
        ...[-1, 1].map((gz): CustomFix => ({ kind: "bolt", count: 2, len: 100, dia: 6, at: [-1, 1].map((gx) => pt(gx * LX, jy, gz * (D / 2 - 30))), dir: [0, 0, -gz] })),
        { kind: "nut", name: "Sleeve nut", count: 4, len: 20, dia: 10, at: [-1, 1].flatMap((gx) => [-1, 1].map((gz) => pt(gx * LX, jy, gz * 60))), dir: [0, 0, 1] },
      ],
      tools: ["allen"],
    },
    { title: "Lay the two braces in", detail: "The angled end on the middle rail, the other end against the frame's lower rail.", add: ["X0", "X1"] },
    {
      title: "Screw the braces to the middle rail",
      detail: "One screw through the top end of each brace.",
      fix: [{ kind: "screw", count: 2, len: 60, dia: 6, at: [-1, 1].map((g) => pt(g * (bx0 + 15), by0 - 30, 0)), dir: [0, 1, 0] }],
      tools: ["allen"],
    },
    {
      title: "Bolt the braces to the leg frames",
      detail: "A barrel nut in the foot of each brace, slot facing the bolt, then a bolt through the frame's lower rail into it.",
      fix: [
        { kind: "nut", name: "Barrel nut", count: 2, len: 14, dia: 10, at: [-1, 1].map((g) => pt(g * (bx1 - 40), by1 + 20, 0)), dir: [0, 0, -1] },
        ...[-1, 1].map((g): CustomFix => ({ kind: "bolt", count: 1, len: 60, dia: 6, at: [pt(g * (LX + 20), by1 - 15, 0)], dir: [-g, 0, 0] })),
      ],
      tools: ["flathead", "allen"],
    },
    { title: "Turn the table over", detail: "Lift it together by the frames, not the top, and stand it on all four legs.", pose: "+y", people: 2, kind: "standup" },
  ];
  return { parts, steps };
}

const family: Family = {
  names: ["ASKHOLMEN"],
  recipe(s) {
    const slug = s.slug ?? "";
    if (/fold/i.test(s.variant) || slug === "askholmen-chair-outdoor" || slug === "askholmen-table-outdoor-60-x-62") return null;
    if (s.archetype === "seat" && s.seat?.arms) return chairRecipe();
    if (s.archetype === "table" && s.size.w > 100) return tableRecipe(s);
    return null;
  },
};
export default family;
