import type { Family } from "./family";
import type { CustomParams, CustomPart, PartPiece, ProductSpec, Vec3 } from "../../types";

/**
 * GUNDE, read from the folding stool's manual. The stool comes assembled: the manual only shows opening it, legs
 * apart, then pressing the seat down at both ends until its two catches click, with fingers kept clear of the
 * hinges. The folding chair has no manual (it is assembled too), so it keeps its old guide.
 */

const TUBE = 18;

/** A round tube from a to b in the y-z plane, as a piece of the part centred at c. */
function tubeYZ(a: Vec3, b: Vec3, c: Vec3): PartPiece {
  const dy = b[1] - a[1], dz = b[2] - a[2];
  return { shape: "cyl", size: [TUBE, Math.hypot(dy, dz), TUBE], pos: [(a[0] + b[0]) / 2 - c[0], (a[1] + b[1]) / 2 - c[1], (a[2] + b[2]) / 2 - c[2]], rot: [Math.atan2(dz, dy), 0, 0] };
}

function stool(s: ProductSpec): CustomParams {
  // IKEA: 34 wide, 32 deep, 45 high, seat 30 x 29
  const W = Math.round(s.size.w * 10) || 340, D = Math.round(s.size.d * 10) || 320, H = Math.round(s.size.h * 10) || 450;
  const sw = 300, sd = 290, st = 24;
  const ySeat = H - st;
  const c: Vec3 = [0, H / 2, 0];
  const xo = W / 2 - TUBE / 2, xi = xo - TUBE - 2;
  const zf = D / 2 - TUBE / 2;
  const frame: PartPiece[] = [
    // two crossing legs a side, the outer pair and the inner pair, with a rail along the floor at each end
    ...[-1, 1].flatMap((sx) => [tubeYZ([sx * xo, 0, -zf], [sx * xo, ySeat, zf - 30], c), tubeYZ([sx * xi, 0, zf], [sx * xi, ySeat, -zf + 30], c)]),
    { shape: "cyl", size: [TUBE, 2 * xo, TUBE], pos: [0, TUBE / 2 - c[1], -zf], rot: [0, 0, Math.PI / 2] },
    { shape: "cyl", size: [TUBE, 2 * xi, TUBE], pos: [0, TUBE / 2 - c[1], zf], rot: [0, 0, Math.PI / 2] },
    { shape: "box", size: [sw, st, sd], pos: [0, ySeat + st / 2 - c[1], 0], material: "board" },
    { shape: "box", size: [90, 4, 24], pos: [0, H + 1 - c[1], -sd / 2 + 40], material: "metal" },
  ];
  const parts: CustomPart[] = [{ id: "S", name: "Folding stool", size: [W, H, D], pos: c, pieces: frame, material: "metal" }];
  return {
    parts,
    steps: [
      {
        title: "Unfold the stool",
        detail: "It comes assembled. Hold it by the seat and let the legs swing apart until they stand on the floor.",
        add: ["S"],
        from: { S: [0, 200, 0] },
        warnings: ["hand"],
      },
      {
        title: "Press the seat down until it clicks",
        detail: "Push down at both ends of the seat: the two catches underneath click shut and lock it open. Keep your fingers away from the hinges.",
        warnings: ["hand"],
      },
    ],
  };
}

const family: Family = {
  names: ["GUNDE"],
  recipe(s) {
    if (/gunde-folding-stool/.test(s.slug ?? "")) return stool(s);
    return null;
  },
};
export default family;
