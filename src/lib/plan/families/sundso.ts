import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, Vec3 } from "../../types";

/**
 * SUNDSÖ, read from the cabinet's manual. The steel cabinet slots together: both sides drop onto the base frame's
 * corner posts, the back slides in between them, the top clicks down onto tabs and two tabs are bent over to lock
 * it. Lying on its back it gets two screws at the bottom and four feet tapped into the base; stood up, the bottom
 * panel drops in and is screwed to the sides, the shelves rest on clips, and the door turns on a pin at the bottom
 * and a sprung pin at the top. Two screws through the back hold it to the wall. The table and the folding chair are
 * sold ready to use, with no assembly manual, so they keep their old guides.
 */

const W = 600, H = 860, D = 350;
const T = 20; // steel panels, drawn thicker than they are so they read
const FOOT = 12; // feet under the base
const BASE = 50; // base frame height
const Y0 = FOOT + BASE; // bottom of the sides
const TOP = 20;
const YT = H - TOP; // top of the sides
const DOOR = 20;

const box = (size: Vec3, pos: Vec3): PartPiece => ({ shape: "box", size, pos });

function cabinet(): CustomParams {
  const xs = W / 2 - T / 2;
  const iw = W - 2 * T;
  const zIn = D / 2 - DOOR; // the door sits between the sides at the front
  const zb = -D / 2 + 6;
  // the base: a rail along the front and the back, joined at the ends, with a post at each corner for the sides
  const by = FOOT + BASE / 2;
  const basePieces: PartPiece[] = [
    box([W, BASE, 30], [0, by, D / 2 - 15]),
    box([W, BASE, 30], [0, by, -D / 2 + 15]),
    ...[-1, 1].map((sx) => box([30, BASE, D - 60], [sx * (W / 2 - 15), by, 0])),
  ];
  const parts: CustomPart[] = [
    { id: "F", name: "Base frame", size: [W, BASE, D], pos: [0, by, 0], pieces: basePieces.map((p) => ({ ...p, pos: [p.pos[0], p.pos[1] - by, p.pos[2]] as Vec3 })), material: "metal" },
    ...[-1, 1].map((sx, i): CustomPart => ({ id: `S${i}`, name: "Side", size: [T, YT - Y0, D], pos: [sx * xs, (Y0 + YT) / 2, 0], material: "metal" })),
    { id: "K", name: "Back", size: [iw, YT - Y0, 12], pos: [0, (Y0 + YT) / 2, zb], material: "metal" },
    { id: "P", name: "Top", size: [W, TOP, D], pos: [0, H - TOP / 2, 0], material: "metal" },
    { id: "B", name: "Bottom panel", size: [iw, 16, zIn - zb - 6], pos: [0, Y0 + 8, (zIn + zb + 6) / 2], material: "metal" },
  ];
  const shelfYs = [Y0 + 260, Y0 + 520];
  shelfYs.forEach((y, i) => parts.push({ id: `L${i}`, name: "Shelf", size: [iw - 4, 16, zIn - zb - 16], pos: [0, y, (zIn + zb + 6) / 2], material: "metal" }));
  const dw = iw - 4, dh = YT - Y0 - 4;
  // the door has a folded edge along its hinge side, which is also the handle
  const doorPieces: PartPiece[] = [box([dw, dh, 6], [0, 0, DOOR / 2 - 3]), box([30, dh, DOOR], [dw / 2 - 15, 0, 0])];
  parts.push({ id: "D", name: "Door", size: [dw, dh, DOOR], pos: [0, (Y0 + YT) / 2, D / 2 - DOOR / 2], pieces: doorPieces, material: "metal" });

  const xh = W / 2 - T - 20; // hinge side, on the right
  const xi = W / 2 - T; // inner face of a side
  const screwsBottom: CustomFix = {
    kind: "screw",
    count: 2,
    len: 10,
    dia: 4,
    at: [-1, 1].map((sx) => [sx * 150, Y0, zb] as Vec3),
    dir: [0, -1, 0],
    on: "K",
    mate: "F",
  };
  const feet: CustomFix = {
    kind: "foot",
    count: 4,
    at: [-1, 1].flatMap((sx) => [-1, 1].map((sz) => [sx * (W / 2 - 15), FOOT, sz * (D / 2 - 15)] as Vec3)),
    dir: [0, 1, 0],
    on: "F",
  };
  const sideScrews: CustomFix[] = [-1, 1].map((sx, i) => ({
    kind: "screw",
    count: 2,
    len: 10,
    dia: 4,
    at: [-1, 1].map((sz) => [sx * xi, Y0 + 12, sz * 110 - 10] as Vec3),
    dir: [sx, 0, 0],
    on: "B",
    mate: `S${i}`,
  }));
  const clips: CustomFix[] = [-1, 1].map((sx, i) => ({
    kind: "clip",
    name: "Shelf clip",
    count: 4,
    len: 22,
    dia: 12,
    at: shelfYs.flatMap((y) => [zb + 50, zIn - 40].map((z) => [sx * xi, y - 10, z] as Vec3)),
    dir: [sx, 0, 0],
    on: `S${i}`,
  }));
  const steps: CustomStep[] = [
    {
      title: "Lower the sides onto the base frame",
      detail: "Each side drops over the two posts at its end of the frame. The rows of slots face in.",
      add: ["F", "S0", "S1"],
      from: { S0: [0, 400, 0], S1: [0, 400, 0] },
    },
    {
      title: "Slide the back in between the sides",
      detail: "Hook its edge into one side first, then swing it across until it sits in the folds of both.",
      add: ["K"],
      from: { K: [0, 0, -300] },
    },
    {
      title: "Click the top on",
      detail: "Lower it over the four tabs at the top of the sides and back, then push it towards the back until it clicks.",
      add: ["P"],
      warnings: ["hand"],
    },
    {
      title: "Bend the two tabs up under the top",
      detail: "With a flat screwdriver, at the front. They stop the top sliding off again.",
      tools: ["flathead"],
    },
    {
      title: "Lay it on its back and screw the back to the base",
      detail: "On a rug. Two screws inside, along the bottom edge of the back.",
      fix: [screwsBottom],
      tools: ["screwdriver"],
      pose: "+z",
      warnings: ["floor"],
    },
    {
      title: "Tap the feet into the base",
      detail: "One in each corner, under the base. Lay a block of wood on each and tap it with a hammer.",
      fix: [feet],
      tools: ["hammer"],
    },
    { title: "Stand it up", detail: "Tip it forward onto its feet.", pose: "+y" },
    {
      title: "Lay the bottom panel in",
      detail: "Folded edge at the front, pointing down. Push it down until its tab locks.",
      add: ["B"],
    },
    {
      title: "Screw the bottom panel to the sides",
      detail: "Two screws into each side, low down near the front and the back.",
      fix: sideScrews,
      tools: ["screwdriver"],
    },
    {
      title: "Level the cabinet on its feet",
      detail: "Stand it where it goes and turn the feet until it doesn't rock.",
      warnings: ["square"],
    },
    {
      title: "Hook in the shelf clips",
      detail: "Four for each shelf, at the same height in the slots at the front and the back of both sides. Push each one down until it sits.",
      fix: clips,
    },
    { title: "Lay the shelves on the clips", detail: "Folded edges pointing down.", add: ["L0", "L1"] },
    {
      title: "Push the lower hinge pin into the bottom",
      detail: "On the side the door will hang from: the right in the drawing, or the left if you want it to open the other way.",
      fix: [{ kind: "pin", name: "Lower hinge pin", count: 1, len: 24, dia: 8, at: [[xh, Y0 + 16, zIn - 12]], dir: [0, -1, 0], on: "B" }],
    },
    {
      title: "Set the door on the pin",
      detail: "Tilt the door, drop the hole at its bottom corner over the pin, then swing it up against the side.",
      add: ["D"],
      from: { D: [200, 0, 300] },
    },
    {
      title: "Push the sprung pin into the top of the door",
      detail: "Squeeze it, slide it into the door's top corner and let it spring up into the hole under the top.",
      fix: [{ kind: "clip", name: "Upper hinge pin", count: 1, len: 50, dia: 16, at: [[xh, YT - 2, D / 2 - DOOR / 2]], dir: [0, -1, 0], on: "D", mate: "P" }],
      warnings: ["hand"],
    },
    {
      title: "Screw the bumpers inside the door",
      detail: "One near the top and one near the bottom, on the edge that closes. They stop the door banging on the sides.",
      fix: [
        { kind: "washer", name: "Door bumper", count: 2, len: 6, dia: 14, at: [YT - 60, Y0 + 60].map((y) => [-dw / 2 + 30, y, D / 2 - DOOR] as Vec3), dir: [0, 0, 1], on: "D" },
        { kind: "screw", count: 2, len: 12, dia: 3.5, at: [YT - 60, Y0 + 60].map((y) => [-dw / 2 + 30, y, D / 2 - DOOR - 6] as Vec3), dir: [0, 0, 1], on: "D" },
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Push the catch into the bottom",
      detail: "Into the square hole at the front, on the side the door closes against.",
      fix: [{ kind: "clip", name: "Door catch", count: 1, len: 14, dia: 14, at: [[-xh, Y0 + 16, zIn - 12]], dir: [0, -1, 0], on: "B" }],
    },
    {
      title: "Cap the holes at the front",
      detail: "One cap in the hole on the front edge of each side.",
      fix: [{ kind: "cap", count: 2, len: 6, dia: 10, at: [-1, 1].map((sx) => [sx * xs, (Y0 + YT) / 2, D / 2] as Vec3), dir: [0, 0, -1] }],
    },
  ];
  // the wall fixing: two screws through the back near the top
  const wallPts: Vec3[] = [-1, 1].map((sx) => [sx * (iw / 2 - 60), YT - 60, zb - 6] as Vec3);
  steps.push({
    title: "Fix it to the wall",
    detail: "Two screws through the holes near the top of the back. Wall screws and plugs aren't included: pick ones made for your wall.",
    fix: [
      { kind: "plug", count: 2, at: wallPts, dir: [0, 0, -1] },
      { kind: "screw", count: 2, len: 50, dia: 5, at: wallPts.map((p) => [p[0], p[1], p[2] + 8] as Vec3), dir: [0, 0, -1], on: "K" },
    ],
    tools: ["screwdriver", "drill", "pencil"],
    wall: true,
    warnings: ["wall", "tip"],
  });
  return { parts, steps };
}

const family: Family = {
  names: ["SUNDSÖ", "SUNDSO"],
  recipe(s) {
    if (/^cabinet/i.test(s.variant)) return cabinet();
    return null; // the table and the folding chair come ready to use
  },
};
export default family;
