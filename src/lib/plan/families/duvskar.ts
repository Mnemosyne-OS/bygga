import type { Family } from "./family";
import type { CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";

/**
 * DUVSKÄR, read from the table's manual. The table comes folded, with no fittings: both leg frames are hinged to
 * the underside of the top. Lying upside down on a rug, one pair of legs swings up and its brace is lifted into
 * place, then the other pair swings up and the legs are pulled apart until the brace clicks and locks. The chair
 * is sold ready to use, with no manual, so it keeps its old guide.
 */

const TUBE = 22;

/** A round steel tube from a to b, in the y-z plane or the x-y plane. */
function tube(a: Vec3, b: Vec3, dia = TUBE): PartPiece {
  const d: Vec3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const len = Math.hypot(...d);
  const rot: Vec3 = Math.abs(d[0]) < 1e-6 ? [Math.atan2(d[2], d[1]), 0, 0] : [0, 0, Math.atan2(-d[0], d[1])];
  return { shape: "cyl", size: [dia, len, dia], pos: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], rot, material: "metal" };
}

/** A part from tubes placed in the finished product, centred on their bounds. */
function frame(id: string, name: string, segs: [Vec3, Vec3][]): CustomPart {
  const pts = segs.flat();
  const lo = [0, 1, 2].map((i) => Math.min(...pts.map((p) => p[i])) - TUBE / 2);
  const hi = [0, 1, 2].map((i) => Math.max(...pts.map((p) => p[i])) + TUBE / 2);
  const pos = lo.map((v, i) => (v + hi[i]) / 2) as Vec3;
  const pieces = segs.map(([a, b]) => tube([a[0] - pos[0], a[1] - pos[1], a[2] - pos[2]], [b[0] - pos[0], b[1] - pos[1], b[2] - pos[2]]));
  return { id, name, size: hi.map((v, i) => v - lo[i]) as Vec3, pos, pieces, material: "metal" };
}

function table(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const tt = 30; // slats and the tube rim round them
  const yU = H - tt;
  const yb = yU - TUBE / 2; // hinge bar under the top
  const xt = W / 2 - 70, xf = W / 2 - 25; // leg top and foot, splayed out a little
  const zl = D / 2 - 70;
  const slats = 6, gap = 6;
  const sw = (D - 40 - gap * (slats - 1)) / slats;
  const top: PartPiece[] = [];
  for (let i = 0; i < slats; i++) top.push({ shape: "box", size: [W - 40, 18, sw], pos: [0, tt / 2 - 9, -D / 2 + 20 + sw / 2 + i * (sw + gap)], material: "wood" });
  // the steel rim, drawn as four tubes
  top.push(
    { shape: "box", size: [W, tt, 20], pos: [0, 0, -D / 2 + 10], material: "metal" },
    { shape: "box", size: [W, tt, 20], pos: [0, 0, D / 2 - 10], material: "metal" },
    { shape: "box", size: [20, tt, D - 40], pos: [-W / 2 + 10, 0, 0], material: "metal" },
    { shape: "box", size: [20, tt, D - 40], pos: [W / 2 - 10, 0, 0], material: "metal" },
  );
  const parts: CustomPart[] = [{ id: "T", name: "Table top", size: [W, tt, D], pos: [0, H - tt / 2, 0], pieces: top, material: "wood" }];
  const legs = (sx: number): [Vec3, Vec3][] => [
    [[sx * xt, yb, -zl], [sx * xt, yb, zl]],
    [[sx * xt, yb, -zl], [sx * xf, 0, -zl]],
    [[sx * xt, yb, zl], [sx * xf, 0, zl]],
  ];
  parts.push(frame("A", "Leg frame", legs(-1)), frame("B", "Leg frame", legs(1)));
  // the brace runs between the two frames at the back, in two halves that lock in the middle
  const yr = yb - 60;
  const xr = xt + ((xf - xt) * 60) / yb;
  parts.push(frame("C", "Brace", [[[-xr + TUBE, yr, -zl], [xr - TUBE, yr, -zl]]]));
  const steps: CustomStep[] = [
    {
      title: "Lay the table upside down and swing up one pair of legs",
      detail: "On a rug, slats down. The leg frames are already hinged to the top.",
      add: ["T", "A"],
      pose: "-y",
      warnings: ["floor"],
    },
    {
      title: "Lift the brace into its clip",
      detail: "Raise the brace from the first pair of legs and push it up into the clip under the top.",
      add: ["C"],
      warnings: ["hand"],
    },
    {
      title: "Swing up the other pair of legs",
      detail: "Check the lock on the brace is open before you lift them.",
      add: ["B"],
    },
    {
      title: "Pull the legs apart until the brace clicks",
      detail: "Hold one leg of each pair and pull them away from each other. The lock snaps shut when the brace is straight.",
      warnings: ["hand"],
    },
    { title: "Turn the table the right way up", detail: "To fold it again, open the lock on the brace first, then fold the legs in.", pose: "+y" },
  ];
  return { parts, steps };
}

const family: Family = {
  names: ["DUVSKÄR", "DUVSKAR"],
  recipe(s) {
    if (/table/i.test(s.variant)) return table(s);
    return null; // the chair comes ready to use
  },
};
export default family;
