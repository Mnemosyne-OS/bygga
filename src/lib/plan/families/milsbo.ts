import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";

/**
 * MILSBO, read from its two manuals (73x175 and 101x100). A steel frame on four cast legs: levelling feet into the
 * legs, rails bolted between them into a base, the bottom plate laid in, then the corner posts bolted on (the wide
 * one adds a middle post at the back) and the top frame bolted over them. Two people lower each glass pane into the
 * frame and it is held with plastic clips; the top goes on, the doors drop onto hinge pins, the handles and lock are
 * screwed on and two brackets hold it to the wall. Glass shelves rest on clip-on supports.
 */

const P = 24; // posts

function doorPart(id: string, w: number, h: number, pos: Vec3): CustomPart {
  const f = 26;
  const pieces: PartPiece[] = [
    { shape: "box", size: [f, h, 20], pos: [-w / 2 + f / 2, 0, 0], material: "metal" },
    { shape: "box", size: [f, h, 20], pos: [w / 2 - f / 2, 0, 0], material: "metal" },
    { shape: "box", size: [w - 2 * f, f, 20], pos: [0, h / 2 - f / 2, 0], material: "metal" },
    { shape: "box", size: [w - 2 * f, f, 20], pos: [0, -h / 2 + f / 2, 0], material: "metal" },
    { shape: "box", size: [w - 2 * f, h - 2 * f, 4], pos: [0, 0, 0], material: "glass" },
  ];
  return { id, name: "Glass door", size: [w, h, 20], pos, material: "glass", pieces };
}

function recipe(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const tall = H > 1400;
  const legH = tall ? 150 : 220;
  const railH = 40;
  const yB = legH; // top of the base
  const yTop = H - 22; // underside of the top
  const xs = W / 2 - P / 2, zs = D / 2 - P / 2;
  const parts: CustomPart[] = [];
  const metal = (id: string, name: string, size: Vec3, pos: Vec3, o: Partial<CustomPart> = {}) => parts.push({ id, name, size, pos, material: "metal", ...o });
  const corners: [number, number][] = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  corners.forEach(([sx, sz], i) => metal(`L${i}`, "Leg", [36, legH, 36], [sx * (W / 2 - 18), legH / 2, sz * (D / 2 - 18)]));
  metal("rF", "Long rail", [W - 72, railH, 16], [0, yB - railH / 2, D / 2 - 12]);
  metal("rB", "Long rail", [W - 72, railH, 16], [0, yB - railH / 2, -D / 2 + 12]);
  metal("rL", "Short rail", [16, railH, D - 72], [-W / 2 + 12, yB - railH / 2, 0]);
  metal("rR", "Short rail", [16, railH, D - 72], [W / 2 - 12, yB - railH / 2, 0]);
  metal("bot", "Bottom plate", [W - 20, 4, D - 20], [0, yB + 2, 0]);
  const postH = yTop - yB - 4 - P;
  corners.forEach(([sx, sz], i) => metal(`P${i}`, "Post", [P, postH, P], [sx * xs, yB + 4 + postH / 2, sz * zs]));
  const mid = !tall; // the wide cabinet has a middle post at the back, between the two back panes
  if (mid) metal("Pm", "Middle post", [P, postH, P], [0, yB + 4 + postH / 2, -zs]);
  const tf: PartPiece[] = [
    { shape: "box", size: [W, P, P], pos: [0, 0, zs] },
    { shape: "box", size: [W, P, P], pos: [0, 0, -zs] },
    { shape: "box", size: [P, P, D - 2 * P], pos: [-xs, 0, 0] },
    { shape: "box", size: [P, P, D - 2 * P], pos: [xs, 0, 0] },
  ];
  metal("tf", "Top frame", [W, P, D], [0, yTop - P / 2, 0], { pieces: tf });
  metal("top", "Top", [W + 10, 22, D + 10], [0, H - 11, 0]);
  const gy = yB + 4 + postH / 2, gh = postH;
  for (const [id, sx] of [["gL", -1], ["gR", 1]] as const) parts.push({ id, name: "Glass side", size: [5, gh, D - 2 * P], pos: [sx * xs, gy, 0], material: "glass" });
  const backs = mid ? ["gB0", "gB1"] : ["gB0"];
  const bw = mid ? W / 2 - P - P / 2 : W - 2 * P;
  backs.forEach((id, i) => parts.push({ id, name: "Glass back", size: [bw, gh, 5], pos: [mid ? (i ? 1 : -1) * (P / 4 + W / 4) : 0, gy, -zs], material: "glass" }));
  const dw = W / 2 - P / 2 - 2;
  parts.push(doorPart("dL", dw, gh, [-W / 4 + P / 4, gy, D / 2 + 10]));
  parts.push(doorPart("dR", dw, gh, [W / 4 - P / 4, gy, D / 2 + 10]));
  const nShelf = tall ? 3 : 2;
  const shelfY = Array.from({ length: nShelf }, (_, i) => yB + 4 + (gh * (i + 1)) / (nShelf + 1));
  shelfY.forEach((y, i) => parts.push({ id: `sh${i}`, name: "Glass shelf", size: [W - 2 * P - 10, 6, D - 2 * P - 20], pos: [0, y, 0], material: "glass" }));

  const fix = (kind: CustomFix["kind"], at: Vec3[], dir: Vec3, o: Partial<CustomFix> = {}): CustomFix => ({ kind, count: at.length, at, dir, ...o });
  const bolt = { kind: "bolt" as const, len: 12, dia: 6 };
  const legPts = corners.map(([sx, sz]) => [sx * (W / 2 - 18), 0, sz * (D / 2 - 18)] as Vec3);
  // two bolts at each leg, one into each rail end
  const railBolts: Vec3[] = corners.flatMap(([sx, sz]) => [[sx * (W / 2 - 36), yB - railH / 2, sz * (D / 2 - 12)], [sx * (W / 2 - 12), yB - railH / 2, sz * (D / 2 - 36)]] as Vec3[]);
  const postBolt = (i: number): Vec3 => [corners[i][0] * xs, yB, corners[i][1] * zs];
  const clips = (pts: Vec3[], dir: Vec3, name: string): CustomFix[] => [fix("clip", pts, dir, { name, len: 20, dia: 16 }), fix("screw", pts.map((p) => [p[0] - dir[0] * 2, p[1], p[2] - dir[2] * 2] as Vec3), dir, { len: 10, dia: 4 })];
  const sideClips = (sx: number): Vec3[] => [yB + 40, yTop - P - 40].flatMap((y) => [-1, 1].map((sz) => [sx * (xs - P / 2), y, sz * (zs - 60)] as Vec3));
  const nB = tall ? 4 : 2;
  const backB: Vec3[] = !tall ? [] : backs.flatMap((_, i) => {
    const x = mid ? (i ? 1 : -1) * (P / 4 + W / 4) : 0;
    return [yB + 40, yTop - P - 40].slice(0, nB / backs.length > 1 ? 2 : 1).flatMap((y) => (tall ? [-1, 1].map((k) => [x + k * bw * 0.3, y, -zs + P / 2] as Vec3) : [[x, y, -zs + P / 2] as Vec3]));
  });
  const backA: Vec3[] = tall ? [-1, 0, 1].map((k) => [k * bw * 0.35, yB + 4 + gh / 2, -zs + P / 2] as Vec3) : [-1, 1].map((k) => [k * 6, yB + 4 + gh / 2, -zs + P / 2] as Vec3);
  const hingeX = (sx: number) => sx * (xs - 10);
  const supports: Vec3[] = shelfY.flatMap((y) => [-1, 1].flatMap((sx) => [-1, 1].map((sz) => [sx * (xs - P / 2), y - 5, sz * (zs - 60)] as Vec3)));
  const steps: CustomStep[] = [
    { title: "Screw the feet into the legs", detail: "Lay the four legs on a rug and turn a levelling foot into the bottom of each, by hand.", add: ["L0", "L1", "L2", "L3"], fix: [fix("foot", legPts, [0, 1, 0], { name: "Levelling foot", len: 25, dia: 22 })], warnings: ["floor"] },
    { title: "Push the rails into the legs", detail: "Two long and two short rails, each end into the slot at the top of a leg.", add: ["rF", "rB", "rL", "rR"] },
    { title: "Bolt the base together", detail: "Eight bolts with the Allen key, two at each leg.", fix: [fix("bolt", railBolts.filter((p) => Math.abs(p[2]) > D / 2 - 20), [0, 0, 0], { ...bolt }), fix("bolt", railBolts.filter((p) => Math.abs(p[2]) <= D / 2 - 20), [0, 0, 0], { ...bolt })].map((f) => ({ ...f, dir: [f.at![0][0] > 0 ? -1 : 1, 0, 0] as Vec3 })), tools: ["allen"], check: "square" },
    { title: "Lay the bottom plate in", detail: "Its corner cut-outs fit round the tops of the legs.", add: ["bot"] },
    { title: "Bolt on the back posts", detail: "Stand each post on its back corner and bolt it from underneath, two long bolts each.", add: ["P0", "P1"], fix: [fix("bolt", [0, 1].flatMap((i) => [-8, 8].map((dx) => { const p = postBolt(i); return [p[0] + dx, yB - railH, p[2]] as Vec3; })), [0, 1, 0], { len: 50, dia: 6 })], tools: ["allen"] },
    { title: "Bolt on the front posts", detail: "The same way at the front, two bolts each.", add: ["P2", "P3"], fix: [fix("bolt", [2, 3].flatMap((i) => [-8, 8].map((dx) => { const p = postBolt(i); return [p[0] + dx, yB - railH, p[2]] as Vec3; })), [0, 1, 0], tall ? { ...bolt } : { name: "Post screw", len: 16, dia: 5 })].map((f) => (tall ? f : { ...f, kind: "screw" as const })), tools: ["allen"] },
    ...(mid ? [{ title: "Fit the middle post at the back", detail: "Clip it into the bottom plate and fix it with one screw.", add: ["Pm"], fix: [fix("screw", [[0, yB, -zs]], [0, 1, 0], { len: 10, dia: 4 })], tools: ["screwdriver"] as CustomStep["tools"] }] : []),
    { title: "Bolt the top frame on together", detail: "One of you holds the posts upright while the other lowers the frame onto them. One bolt into each post.", add: ["tf"], fix: [fix("bolt", corners.map(([sx, sz]) => [sx * xs, yTop, sz * zs] as Vec3), [0, -1, 0], { ...bolt })], tools: ["allen"], people: 2, warnings: ["two"] },
    { title: "Lower a glass side in together", detail: "Tilt it in from the front and set it down into the channel in the bottom. Never stand glass on a hard floor.", add: ["gL"], people: 2, warnings: ["two", "hand"], from: { gL: [0, 0, 420] } },
    { title: "Clip the glass side in", detail: "Four clips, each screwed to the frame.", fix: clips(sideClips(-1), [-1, 0, 0], "Glass clip"), tools: ["screwdriver"] },
    { title: "Lower in the other glass side together", add: ["gR"], people: 2, warnings: ["two", "hand"], from: { gR: [0, 0, 420] } },
    { title: "Clip it in", detail: "Four more clips.", fix: clips(sideClips(1), [1, 0, 0], "Glass clip"), tools: ["screwdriver"] },
    { title: mid ? "Lower the back panes in together" : "Lower the back pane in together", detail: "From the front, into the back channel.", add: backs, people: 2, warnings: ["two", "hand"], from: Object.fromEntries(backs.map((id) => [id, [0, 0, 420] as Vec3])) },
    { title: mid ? "Clip the back panes in" : "Clip the back pane in", detail: "The wide clips at the top and bottom, the narrow ones up the middle.", fix: [...(backB.length ? clips(backB, [0, 0, -1], "Glass clip") : []), ...clips(backA, [0, 0, -1], "Narrow glass clip")], tools: ["screwdriver"] },
    { title: "Screw the top on", detail: "Lay it on the top frame and screw it from underneath.", add: ["top"], fix: [fix("screw", [-1, 1].flatMap((sx) => [-1, 1].map((sz) => [sx * (xs - 40), yTop - P, sz * (zs - 40)] as Vec3)), [0, 1, 0], { len: 10, dia: 4, on: "tf" })], tools: ["screwdriver"] },
    {
      title: "Fit the hinge pins",
      detail: "A bushing into the bottom plate and a pin through the top frame at each front corner.",
      fix: [fix("clip", [-1, 1].map((sx) => [hingeX(sx), yB + 4, D / 2 - 6] as Vec3), [0, -1, 0], { name: "Hinge bushing", len: 10, dia: 12 }), fix("pin", [-1, 1].map((sx) => [hingeX(sx), yTop - P, D / 2 - 6] as Vec3), [0, -1, 0], { name: "Hinge pin", len: 40, dia: 8 })],
    },
    { title: "Hang the doors together", detail: "Lift each door onto its bottom bushing and swing the top under the pin, then push the pin down into it.", add: ["dL", "dR"], people: 2, warnings: ["two", "hand"], from: { dL: [0, 0, 400], dR: [0, 0, 400] } },
    {
      title: "Screw on the handles and the lock",
      detail: "Two screws from inside each door into its handle, then the lock and its catch with two screws each. The keys come in the bag.",
      fix: [
        fix("handle", [[-30, gy, D / 2 + 20], [30, gy, D / 2 + 20]], [0, 0, -1], { len: 120, dia: 14, twist: Math.PI / 2 }),
        fix("screw", [-1, 1].flatMap((k) => [-45, 45].map((dy) => [k * 30, gy + dy, D / 2] as Vec3)), [0, 0, 1], { len: 16, dia: 4, name: "Handle screw" }),
        fix("clip", [[30, gy - 140, D / 2 + 20]], [0, 0, -1], { name: "Lock", len: 30, dia: 20 }),
        fix("screw", [[30, gy - 160, D / 2], [30, gy - 120, D / 2]], [0, 0, 1], { len: 10, dia: 4 }),
        ...(tall ? [fix("bolt", [[-10, gy - 140, D / 2], [-10, gy - 170, D / 2]], [1, 0, 0], { name: "Lock catch", len: 12, dia: 6 })] : []),
      ],
      tools: ["screwdriver", "allen"],
    },
    { title: "Level it", detail: "Turn the feet until the doors meet evenly at the top and bottom." },
    {
      title: "Fix it to the wall",
      detail: "Screw the two brackets under the top frame at the back, then into the wall. Wall screws and plugs aren't included: pick ones made for your wall.",
      fix: [
        fix("angle", [-1, 1].map((sx) => [sx * (xs - 60), yTop - P, -D / 2] as Vec3), [0, 1, 0], { name: "Wall bracket", len: 80, dia: 30 }),
        fix("screw", [-1, 1].map((sx) => [sx * (xs - 60), yTop - P - 2, -D / 2 + 12] as Vec3), [0, 1, 0], { len: 10, dia: 4, on: "tf" }),
        fix("plug", [-1, 1].map((sx) => [sx * (xs - 60), yTop - 60, -D / 2 - 50] as Vec3), [0, 0, -1], { len: 35, dia: 8 }),
        fix("screw", [-1, 1].map((sx) => [sx * (xs - 60), yTop - 60, -D / 2 - 6] as Vec3), [0, 0, -1], { len: 50, dia: 5 }),
      ],
      tools: ["drill", "screwdriver", "pencil"],
      wall: true,
      warnings: ["wall", "tip"],
    },
    { title: "Clip on the shelf supports", detail: `${supports.length} supports, four for each shelf, at the same height.`, fix: [fix("pin", supports.filter((p) => p[0] < 0), [-1, 0, 0], { name: "Shelf support", len: 14, dia: 16 }), fix("pin", supports.filter((p) => p[0] > 0), [1, 0, 0], { name: "Shelf support", len: 14, dia: 16 })] },
    { title: "Lay the glass shelves on", detail: "Tilt each one in through the door and lower it onto its supports.", add: shelfY.map((_, i) => `sh${i}`), warnings: ["hand"] },
  ];
  return { parts, steps };
}

const family: Family = {
  names: ["MILSBO"],
  recipe(s) {
    // 101x186 has no manual found; the 101 one in the box is 100 high
    if (/milsbo-glass-door-cabinet-(73-x-175|101-x-100)/.test(s.slug ?? "")) return recipe(s);
    return null;
  },
};
export default family;
