import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, PartItem, ProductSpec, Vec3 } from "../../types";
import { buildCustom } from "../custom";

/**
 * BERGMUND, read from the dining chair's manual. The cover flap at the foot of the backrest is folded up first. With
 * the padded seat upside down, the front legs drop into its corner brackets and each takes a bolt with a spring
 * washer and a washer, by hand. The backrest's two pins go into the back of the seat, the chair is laid on its back,
 * the back legs slide onto the pins in the rear corners and take their bolts. Stood on a table, all four bolts are
 * tightened with the Allen key, and the cover flap is pulled down over the joint.
 */

const LEG = 45;
const BOLT = { name: "Allen bolt", len: 60, dia: 6 };

const fx = (kind: CustomFix["kind"], at: Vec3[], dir: Vec3, on: string | undefined, o: Partial<CustomFix> = {}): CustomFix => ({ kind, count: at.length, at, dir, on, ...o });

function chair(s: ProductSpec): CustomParams {
  // IKEA: 52 wide, 59 deep, 95 high, seat 51 high and 41 deep
  const W = s.size.w * 10, D = s.size.d * 10, H = s.size.h * 10;
  const seatTop = 510, seatBot = 430;
  const zBackFace = D / 2 - 410; // front face of the backrest, 41 cm behind the front of the seat
  const BT = 70, lean = 110;
  const xl = W / 2 - LEG / 2 - 6;
  const zf = D / 2 - LEG / 2 - 8, zb = zBackFace + LEG / 2 - 8;
  const backH = H - seatBot, ang = Math.atan2(lean, backH);
  const parts: CustomPart[] = [
    { id: "SEAT", name: "Seat", size: [W, seatTop - seatBot, D / 2 - zBackFace], pos: [0, (seatTop + seatBot) / 2, (D / 2 + zBackFace) / 2], material: "soft" },
    { id: "LEG_FL", name: "Front leg", size: [LEG, seatBot, LEG], pos: [-xl, seatBot / 2, zf], material: "wood" },
    { id: "LEG_FR", name: "Front leg", size: [LEG, seatBot, LEG], pos: [xl, seatBot / 2, zf], material: "wood" },
    {
      id: "BACK",
      name: "Backrest",
      size: [W - 20, Math.hypot(backH, lean), BT],
      pos: [0, (seatBot + H) / 2, zBackFace - BT / 2 - lean / 2],
      rot: [-ang, 0, 0],
      material: "soft",
    },
    { id: "LEG_BL", name: "Back leg", size: [LEG, seatBot, LEG], pos: [-xl, seatBot / 2, zb], material: "wood" },
    { id: "LEG_BR", name: "Back leg", size: [LEG, seatBot, LEG], pos: [xl, seatBot / 2, zb], material: "wood" },
  ];
  // each bolt goes diagonally through the corner bracket inside the seat's frame into the top of its leg
  const corner = (sx: number, z: number, sz: number): { at: Vec3; dir: Vec3 } => ({ at: [sx * (xl - 45), seatBot - 18, z - sz * 45], dir: [sx * Math.SQRT1_2, 0, sz * Math.SQRT1_2] });
  const bolts = (legs: [string, number, number, number][]): CustomFix[] =>
    legs.flatMap(([id, sx, z, sz]) => {
      const c = corner(sx, z, sz);
      return [
        fx("washer", [c.at], c.dir, "SEAT", { name: "Spring washer", len: 2, dia: 12, mate: id }),
        fx("washer", [c.at], c.dir, "SEAT", { len: 1.5, dia: 16, mate: id }),
        fx("bolt", [c.at], c.dir, "SEAT", { ...BOLT, mate: id }),
      ];
    });
  const front: [string, number, number, number][] = [["LEG_FL", -1, zf, 1], ["LEG_FR", 1, zf, 1]];
  const back: [string, number, number, number][] = [["LEG_BL", -1, zb, -1], ["LEG_BR", 1, zb, -1]];

  return {
    parts,
    steps: [
      {
        title: "Fold the cover up off the backrest's foot",
        detail: "Turn the flap at the bottom of the backrest inside out, up over the back, so its two pins stand free.",
      },
      {
        title: "Push the front legs into the seat's corners",
        detail: "Lay the seat upside down on a rug. Each leg's notch slides down over the bracket in a front corner.",
        add: ["SEAT", "LEG_FL", "LEG_FR"],
        pose: "-y",
        warnings: ["floor"],
      },
      {
        title: "Bolt the front legs in by hand",
        detail: "A spring washer and a washer on each bolt, then turn it in through the bracket with your fingers only.",
        fix: bolts(front),
        warnings: ["loose"],
      },
      {
        title: "Push the backrest's pins into the seat",
        detail: "Both pins into the holes at the back of the seat frame, then lay the chair on its back.",
        add: ["BACK"],
        from: { BACK: [0, -300, -200] },
      },
      {
        title: "Slide the back legs onto the pins",
        detail: "The groove in the top of each leg goes over a pin, into the rear corner. Keep the legs straight, not splayed.",
        add: ["LEG_BL", "LEG_BR"],
        pose: "+z",
        from: { LEG_BL: [0, -300, 0], LEG_BR: [0, -300, 0] },
      },
      { title: "Bolt the back legs in by hand", detail: "The same way, washers first, fingers only.", fix: bolts(back), warnings: ["loose"] },
      {
        title: "Stand it on a table and tighten the bolts",
        detail: "With all four legs on a flat table top, tighten each bolt firmly with the Allen key. Not with a drill.",
        pose: "+y",
        tools: ["allen"],
        check: "square",
      },
      { title: "Pull the cover flap down", detail: "Fold it back down over the foot of the backrest and fasten it under the seat at both sides." },
    ],
  };
}

const family: Family = {
  names: ["BERGMUND"],
  build(b, s) {
    if (!/chair/i.test(`${s.variant} ${s.slug ?? ""}`) || /arm/i.test(s.variant)) return false;
    const r = chair(s);
    buildCustom(b, { ...s, custom: r });
    // the backrest is handled on its own in the first step, before the seat comes out of the box
    const p = r.parts.find((q) => q.id === "BACK")!;
    const it = b.items.find((x): x is PartItem => x.kind === "part" && x.final.pos.every((v, k) => Math.abs(v - p.pos[k]) < 0.5));
    if (it && b.steps[0]) {
      b.steps[0].scene = "backrest";
      it.states.unshift({ step: 0, scene: "backrest", pos: it.final.pos, rot: it.final.rot, from: [0, 200, 0], delay: 0.15 });
    }
    return true;
  },
};
export default family;
