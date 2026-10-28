import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, PartPiece, ProductSpec, Vec3 } from "../../types";

/*
 * HÄGERNÄS stool, read from its manual. Two leg frames (two legs and a rail, glued at the factory) and two loose rails.
 * Dowels go into the ends of the loose rails, six seat brackets screw into the four rails by hand, then upside down
 * the loose rails go between the frames and four long bolts pull them tight. Stood up, a dowel goes into the top of
 * each leg, and upside down again the frame is lowered onto the seat and the brackets are screwed to it.
 * IKEA's sizes: 32 x 32 cm, 45 high.
 */

const fix = (kind: CustomFix["kind"], at: Vec3[], dir: Vec3, o: Partial<CustomFix> = {}): CustomFix => ({ kind, count: at.length, at, dir, ...o });

function recipe(s: ProductSpec): CustomParams {
  const W = Math.round(s.size.w * 10) || 320, H = Math.round(s.size.h * 10) || 450;
  const T = 20, L = 38, rt = 18, rh = 80;
  const yS = H - T; // underside of the seat, top of the legs and rails
  const xl = W / 2 - 10 - L / 2; // leg centres
  const yr = yS - rh / 2;
  const span = 2 * xl - L; // a rail between two legs
  const parts: CustomPart[] = [];
  for (const [i, sx] of [[0, -1], [1, 1]] as const) {
    const c: Vec3 = [sx * xl, yS / 2, 0];
    const pieces: PartPiece[] = [
      { shape: "box", size: [L, yS, L], pos: [0, 0, -xl] },
      { shape: "box", size: [L, yS, L], pos: [0, 0, xl] },
      { shape: "box", size: [rt, rh, span], pos: [0, yr - c[1], 0] },
    ];
    parts.push({ id: `F${i}`, name: "Leg frame", size: [L, yS, 2 * xl + L], pos: c, material: "wood", pieces });
  }
  for (const [i, sz] of [[0, -1], [1, 1]] as const) parts.push({ id: `R${i}`, name: "Rail", size: [span, rh, rt], pos: [0, yr, sz * xl], material: "wood" });
  parts.push({ id: "S", name: "Seat", size: [W, T, W], pos: [0, H - T / 2, 0], material: "wood" });

  const xIn = xl - rt / 2; // inner faces of the rails
  const railDowels = [0, 1].flatMap((i) =>
    [-1, 1].map((sx) => fix("dowel", [yr - 18, yr + 18].map((y): Vec3 => [sx * (span / 2), y, (i ? 1 : -1) * xl]), [sx, 0, 0], { on: `R${i}` })),
  );
  const bracketsLoose = [0, 1].map((i) => fix("stud", [[0, yS - 12, (i ? 1 : -1) * xIn]], [0, 0, i ? 1 : -1], { on: `R${i}`, len: 20, dia: 20, name: "Seat bracket" }));
  const bracketsFrame = [0, 1].map((i) => fix("stud", [-60, 60].map((z): Vec3 => [(i ? 1 : -1) * xIn, yS - 12, z]), [i ? 1 : -1, 0, 0], { on: `F${i}`, len: 20, dia: 20, name: "Seat bracket" }));
  const bolts = [-1, 1].flatMap((sx) => [0, 1].map((i) => fix("bolt", [[sx * (xl + L / 2), yr, (i ? 1 : -1) * xl]], [-sx, 0, 0], { on: sx < 0 ? "F0" : "F1", mate: `R${i}`, len: 70, dia: 6 })));
  const corners = [-1, 1].flatMap((sx) => [-1, 1].map((sz): Vec3 => [sx * xl, yS, sz * xl]));
  const screws: Vec3[] = [
    [0, yS, -xIn + 14],
    [0, yS, xIn - 14],
    ...[-1, 1].flatMap((sx) => [-60, 60].map((z): Vec3 => [sx * (xIn - 14), yS, z])),
  ];
  return {
    parts,
    steps: [
      {
        title: "Tap the dowels into the loose rails",
        detail: "Lay the two loose rails on a rug. Two dowels go into each end, eight in all.",
        fix: railDowels,
        wait: ["R0", "R1"],
        tools: ["hammer"],
        warnings: ["floor"],
      },
      {
        title: "Screw a seat bracket into each loose rail",
        detail: "Into the hole on the inside face, near the top edge, by hand until it sits tight.",
        fix: bracketsLoose,
      },
      {
        title: "Screw two seat brackets into each leg frame",
        detail: "Into the holes on the inside of the frame's rail, by hand.",
        fix: bracketsFrame,
        wait: ["F0", "F1"],
      },
      {
        title: "Bolt the rails between the leg frames",
        detail: "Upside down on the rug. Push the rails' dowels into the legs, then a long bolt through each leg into a rail. Tighten them with the Allen key.",
        add: ["F0", "F1", "R0", "R1"],
        fix: bolts,
        tools: ["allen"],
        pose: "-y",
        check: "square",
      },
      {
        title: "Tap a dowel into the top of each leg",
        detail: "Turn the frame the right way up first.",
        fix: [0, 1].map((i) => fix("dowel", corners.filter((c) => (c[0] > 0) === (i === 1)), [0, -1, 0], { on: `F${i}`, mate: "S" })),
        tools: ["hammer"],
        pose: "+y",
      },
      {
        title: "Lower the frame onto the seat",
        detail: "Lay the seat upside down on the rug and turn the frame over onto it, so the dowels find their holes.",
        add: ["S"],
        from: { S: [0, 300, 0] },
        pose: "-y",
      },
      {
        title: "Screw the brackets to the seat",
        detail: "Six screws, one through each bracket into the seat.",
        fix: [fix("screw", screws, [0, 1, 0], { len: 16, dia: 4, mate: "S" })],
        tools: ["screwdriver"],
      },
      { title: "Stand it up", detail: "It stacks on another HÄGERNÄS stool.", pose: "+y" },
    ],
  };
}

const family: Family = {
  names: ["HÄGERNÄS", "HAGERNAS"],
  recipe(s) {
    if (!/stool/i.test(`${s.slug ?? ""} ${s.variant}`)) return null;
    return recipe(s);
  },
};
export default family;
