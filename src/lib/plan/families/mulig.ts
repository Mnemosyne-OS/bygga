import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";

/**
 * MULIG clothes rack, read from its manual. Everything is put together lying on the floor: the two uprights are
 * pushed into the bent top rail until their spring buttons click and each is held with a small screw, a bent foot
 * clicks onto the bottom of each upright, and the lower rail is bolted between the feet with two Allen bolts.
 * Then the rack is stood up. The drying rack comes assembled (no manual), so it keeps its old guide.
 */

const at = (kind: CustomFix["kind"], pts: Vec3[], dir: Vec3, on?: string, mate?: string, o: Partial<CustomFix> = {}): CustomFix => ({ kind, count: pts.length, at: pts, dir, on, mate, ...o });

function clothesRack(s: ProductSpec): CustomParams {
  // IKEA: 99 wide, 46 deep, 152 high
  const W = Math.round(s.size.w * 10) || 990, H = Math.round(s.size.h * 10) || 1520, D = Math.round(s.size.d * 10) || 460;
  const T = 22;
  const xu = W / 2 - 25; // uprights and feet
  const yTop = H - T / 2, yJoin = yTop - 110; // the top rail's bent ends meet the uprights here
  const yFoot = 190; // top of the feet
  const zl = D / 2 - T / 2 - 15;
  const rail: PartPiece[] = [
    { shape: "cyl", size: [T, 2 * xu - 60, T], pos: [0, 0, 0], rot: [0, 0, Math.PI / 2] },
    ...[-1, 1].map((sx): PartPiece => ({ shape: "cyl", size: [T, 110, T], pos: [sx * xu, -55, 0] })),
    ...[-1, 1].map((sx): PartPiece => ({ shape: "box", size: [40, T, T], pos: [sx * (xu - 20), -8, 0] })), // the bends
  ];
  const foot = (sx: number): CustomPart => ({
    id: sx < 0 ? "FL" : "FR",
    name: "Foot",
    size: [T, yFoot + T / 2, D],
    pos: [sx * xu, (yFoot + T / 2) / 2, 0],
    material: "metal",
    pieces: [
      { shape: "cyl", size: [T, 2 * zl - 40, T], pos: [0, yFoot - (yFoot + T / 2) / 2, 0], rot: [Math.PI / 2, 0, 0] },
      ...[-1, 1].map((sz): PartPiece => ({ shape: "cyl", size: [T, yFoot, T], pos: [0, yFoot / 2 - (yFoot + T / 2) / 2, sz * zl] })),
      ...[-1, 1].map((sz): PartPiece => ({ shape: "box", size: [T, T, 40], pos: [0, yFoot - 8 - (yFoot + T / 2) / 2, sz * (zl - 18)] })),
    ],
  });
  const upY0 = yFoot + T / 2, upY1 = yJoin;
  const parts: CustomPart[] = [
    { id: "T", name: "Top rail", size: [2 * xu + T, 110 + T / 2, T], pos: [0, yTop - 55 + T / 4, 0], material: "metal", pieces: rail.map((p) => ({ ...p, pos: [p.pos[0], p.pos[1] + 55 - T / 4, p.pos[2]] as Vec3 })) },
    ...[-1, 1].map((sx): CustomPart => ({ id: sx < 0 ? "UL" : "UR", name: "Upright", shape: "cyl", material: "metal", size: [T, upY1 - upY0, T], pos: [sx * xu, (upY0 + upY1) / 2, 0] })),
    foot(-1),
    foot(1),
    { id: "B", name: "Lower rail", shape: "cyl", material: "metal", size: [T, 2 * xu - T, T], pos: [0, yFoot + T, 0], rot: [0, 0, Math.PI / 2] },
  ];
  const steps: CustomStep[] = [
    {
      title: "Push the uprights into the top rail",
      detail: "Lay everything on a rug. Press the spring button on each upright and slide it into an end of the rail until the button clicks out of the hole.",
      add: ["T", "UL", "UR"],
      pose: "+z",
      warnings: ["floor", "hand"],
    },
    {
      title: "Screw each upright to the rail",
      detail: "One small screw through the hole next to each joint.",
      fix: [-1, 1].map((sx) => at("screw", [[sx * xu, yJoin + 30, T / 2]], [0, 0, -1], "T", sx < 0 ? "UL" : "UR", { len: 12, dia: 4 })),
      tools: ["screwdriver"],
    },
    {
      title: "Click a foot onto each upright",
      detail: "Press the spring button at the bottom of the upright and push the foot on until it clicks. Both feet point the same way.",
      add: ["FL", "FR"],
      warnings: ["hand"],
    },
    {
      title: "Bolt the lower rail between the feet",
      detail: "One bolt through the bottom of each upright, just above the foot, into the end of the rail. Tighten them with the Allen key.",
      add: ["B"],
      fix: [-1, 1].map((sx) => at("bolt", [[sx * (xu + T / 2), yFoot + T, 0]], [-sx, 0, 0], sx < 0 ? "UL" : "UR", "B", { len: 30, dia: 6 })),
      tools: ["allen"],
    },
    { title: "Stand the rack up", detail: "Lift it by the top rail onto its feet. It holds up to 20 kg.", pose: "+y" },
  ];
  return { parts, steps };
}

const family: Family = {
  names: ["MULIG"],
  recipe(s) {
    if (/clothes-rack/.test(s.slug ?? "")) return clothesRack(s);
    return null;
  },
};
export default family;
