import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";
import { HW, PlanBuilder, type FitOpts, type HwDef } from "../builder";
import { buildCustom } from "../custom";

/**
 * SONGESAND, read from its manuals. The nightstand is a cabinet with a door under an open shelf: the sides are
 * fixed to the bottom and the plinth with cam locks while it stands upside down, the back slides down into grooves,
 * the top goes on with cam locks, the back is clipped, then the door is hung on two hinges and the shelf drops onto
 * four pins in the open space at the top. The beds are built from their manuals too: the queen and 160 from the
 * queen's, the twin with storage boxes from its own (a one-panel headboard on double cam bolts, side rails on round
 * connectors, a ready-made footboard, a top cap, a centre bar) and the box set's (two boxes built on their fronts).
 * The chests and the wardrobe have no manual we could find and keep their old guides.
 */

type Fx = Omit<CustomFix, "count" | "at"> & { at: Vec3[] };
const fx = (f: Fx): CustomFix => ({ ...f, count: f.at.length });

function nightstand(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const T = 16, TT = 20; // panels, top
  const Wc = W - 24, Dc = D - 15; // the carcass under the top's overhang
  const zc = -7.5; // carcass centre front to back (the top overhangs at the front)
  const zF = zc + Dc / 2, zB = zc - Dc / 2;
  const xS = Wc / 2 - T / 2;
  const xIn = Wc / 2 - T;
  const hs = H - TT; // sides' height
  const P = 60; // plinth
  const yB = P + T / 2; // bottom panel centre
  const yShelf = Math.round(H * 0.72);
  const yDoorTop = yShelf - T / 2 - 4;
  const iw = 2 * xIn;
  const dTop = yDoorTop, dBot = P + 2;
  const doorH = dTop - dBot, doorW = iw - 4, dt = 18;
  const rail = 60;
  const doorPieces: PartPiece[] = [
    { shape: "box", size: [doorW, rail, dt], pos: [0, doorH / 2 - rail / 2, 0] },
    { shape: "box", size: [doorW, rail, dt], pos: [0, -doorH / 2 + rail / 2, 0] },
    { shape: "box", size: [rail, doorH - 2 * rail, dt], pos: [-doorW / 2 + rail / 2, 0, 0] },
    { shape: "box", size: [rail, doorH - 2 * rail, dt], pos: [doorW / 2 - rail / 2, 0, 0] },
    { shape: "box", size: [doorW - 2 * rail, doorH - 2 * rail, 8], pos: [0, 0, -4] },
  ];
  const parts: CustomPart[] = [
    { id: "bottom", name: "Bottom", size: [iw, T, Dc - 10], pos: [0, yB, zc + 5] },
    { id: "plinth", name: "Plinth", size: [iw, P, T], pos: [0, P / 2, zF - T / 2 - 6] },
    { id: "L", name: "Side panel", size: [T, hs, Dc], pos: [-xS, hs / 2, zc] },
    { id: "R", name: "Side panel", size: [T, hs, Dc], pos: [xS, hs / 2, zc] },
    { id: "back", name: "Back panel", size: [iw + 12, hs - P, 3], pos: [0, P + (hs - P) / 2, zB + 12], material: "fiber" },
    { id: "top", name: "Top", size: [W, TT, D], pos: [0, H - TT / 2, 0] },
    { id: "door", name: "Door", size: [doorW, doorH, dt], pos: [0, (dTop + dBot) / 2, zF - dt / 2], pieces: doorPieces },
    { id: "shelf", name: "Shelf", size: [iw - 2, T, Dc - 30], pos: [0, yShelf, zc + 5] },
  ];
  const zs = (Dc - 10) / 2 - 50;
  const zPl = zF - T / 2 - 6;
  const sx2 = [-1, 1];
  const camBolts = (sx: number) =>
    fx({ kind: "camScrew", at: [...[-zs, zs].map((z) => [sx * xIn, yB, zc + 5 + z] as Vec3), [sx * xIn, P / 2 - 12, zPl] as Vec3], dir: [sx, 0, 0], on: sx < 0 ? "L" : "R" });
  const steps: CustomStep[] = [
    {
      title: "Tap dowels into the bottom and the plinth",
      detail: "Lay both on a rug. Two dowels into each end of the bottom, one into each end of the plinth.",
      add: ["bottom", "plinth"],
      fix: [
        fx({ kind: "dowel", at: sx2.flatMap((sx) => [-zs, zs].map((z) => [sx * xIn, yB, zc + 5 + z] as Vec3)), dir: [-1, 0, 0], on: "bottom" }),
        fx({ kind: "dowel", at: sx2.map((sx) => [sx * xIn, P / 2 + 12, zPl] as Vec3), dir: [-1, 0, 0], on: "plinth" }),
      ].map((f) => ({ ...f, dir: undefined })),
      tools: ["hammer"],
      pose: "-y",
      warnings: ["floor"],
    },
    {
      title: "Screw cam bolts into a side and fit it",
      detail: "Three bolts near the bottom end of each side. With it all upside down, push one side's bolts into the bottom's holes and turn the two cam locks.",
      add: ["L"],
      fix: [camBolts(-1), fx({ kind: "cam", at: [-zs, zs].map((z) => [-xIn + 30, yB - T / 2, zc + 5 + z] as Vec3), dir: [0, 1, 0], dia: 15, on: "bottom" })],
      tools: ["screwdriver"],
    },
    {
      title: "Fit the plinth and lock it",
      detail: "Onto the dowels at the front, then one cam lock from behind.",
      fix: [fx({ kind: "cam", at: [[-xIn + 30, P / 2 - 12, zPl - T / 2]], dir: [0, 0, 1], dia: 15, on: "plinth" })],
      tools: ["screwdriver"],
    },
    {
      title: "Fit the other side",
      detail: "Turn the frame over onto the first side, then push the second side onto the dowels and turn its three cam locks.",
      add: ["R"],
      fix: [
        camBolts(1),
        fx({ kind: "cam", at: [-zs, zs].map((z) => [xIn - 30, yB - T / 2, zc + 5 + z] as Vec3), dir: [0, 1, 0], dia: 15, on: "bottom" }),
        fx({ kind: "cam", at: [[xIn - 30, P / 2 - 12, zPl - T / 2]], dir: [0, 0, 1], dia: 15, on: "plinth" }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Push the back guides into the sides",
      detail: "Two into the back edge of each side, pegs into the holes. Then turn the frame the right way up.",
      fix: sx2.map((sx) => fx({ kind: "clip", name: "Back guide", len: 40, dia: 12, at: [P + 80, hs - 80].map((y) => [sx * xS, y, zB] as Vec3), dir: [0, 0, 1], on: sx < 0 ? "L" : "R" })),
    },
    {
      title: "Slide the back down into the grooves",
      detail: "From the top, smooth side facing in, all the way down onto the bottom.",
      add: ["back"],
      pose: "+y",
      from: { back: [0, 420, 0] },
    },
    {
      title: "Tap dowels into the tops of the sides",
      detail: "Two in each.",
      fix: sx2.map((sx) => fx({ kind: "dowel", at: [-1, 1].map((k) => [sx * xS, hs, zc + k * (Dc / 2 - 60)] as Vec3), dir: [0, -1, 0], on: sx < 0 ? "L" : "R" })),
      tools: ["hammer"],
    },
    {
      title: "Screw the cam bolts into the top",
      detail: "Four, into the holes on its underside.",
      fix: [fx({ kind: "camScrew", at: sx2.map((sx) => [sx * xS, hs, zc] as Vec3).flatMap((p) => [-1, 1].map((k) => [p[0], p[1], zc + k * (Dc / 2 - 110)] as Vec3)), dir: [0, 1, 0], on: "top" })],
      tools: ["screwdriver"],
    },
    {
      title: "Put the top on and lock it",
      detail: "Down onto the dowels and bolts, then turn the four cam locks inside the sides.",
      add: ["top"],
      fix: [fx({ kind: "cam", at: sx2.flatMap((sx) => [-1, 1].map((k) => [sx * xIn, hs - 30, zc + k * (Dc / 2 - 110)] as Vec3)), dir: [-1, 0, 0], dia: 15 })].map((f) => ({
        ...f,
        dir: undefined,
      })),
      tools: ["screwdriver"],
    },
    {
      title: "Fix the back to the bottom",
      detail: "Push the two plastic fasteners through the back into the bottom until they click.",
      fix: [fx({ kind: "clip", name: "Push fastener", len: 20, dia: 8, at: [-1, 1].map((k) => [k * (iw / 2 - 60), yB, zB + 10] as Vec3), dir: [0, 0, 1], on: "bottom" })],
    },
    {
      title: "Clip the back to the sides",
      detail: "Six clips through the back into the guides, three down each side, then press a wedge into each one.",
      fix: [fx({ kind: "clip", name: "Back clip", len: 14, dia: 12, at: sx2.flatMap((sx) => [P + 80, (P + hs) / 2, hs - 80].map((y) => [sx * (xIn + 2), y, zB + 10] as Vec3)), dir: [0, 0, 1] })],
    },
    {
      title: "Screw the hinge plates to the side",
      detail: "Inside the right-hand side at the front, two screws each.",
      fix: [
        fx({ kind: "plate", name: "Mounting plate", len: 12, dia: 36, at: [dBot + 90, dTop - 90].map((y) => [xIn, y, zF - 40] as Vec3), dir: [1, 0, 0], on: "R" }),
        fx({ kind: "screw", len: 14, dia: 4, at: [dBot + 90, dTop - 90].flatMap((y) => [-16, 16].map((dy) => [xIn, y + dy, zF - 40] as Vec3)), dir: [1, 0, 0], on: "R" }),
      ],
      tools: ["screwdriver"],
      pose: "+y",
    },
    {
      title: "Screw the hinges into the door",
      detail: "Lay the door face down. Each hinge cup into its hole, two screws each.",
      add: ["door"],
      fix: [
        fx({ kind: "hinge", at: [dBot + 90, dTop - 90].map((y) => [doorW / 2 - 25, y, zF - dt] as Vec3), dir: [0, 0, 1], on: "door" }),
        fx({ kind: "screw", len: 14, dia: 4, at: [dBot + 90, dTop - 90].flatMap((y) => [-22, 22].map((dy) => [doorW / 2 - 25, y + dy, zF - dt] as Vec3)), dir: [0, 0, 1], on: "door" }),
      ],
      tools: ["screwdriver"],
      from: { door: [0, 0, 400] },
    },
    { title: "Click the door onto the plates", detail: "Hook each hinge arm over its plate and press until it clicks. Turn the hinge screws to line the door up.", kind: "hinges" },
    {
      title: "Screw on the handle",
      detail: "Two screws from the inside of the door, on the side away from the hinges.",
      fix: [fx({ kind: "handle", len: 128, dia: 12, at: [[-doorW / 2 + 40, (dTop + dBot) / 2, zF]], dir: [0, 0, -1], on: "door", twist: Math.PI / 2 }), fx({ kind: "screw", len: 25, dia: 4, at: [-64, 64].map((dy) => [-doorW / 2 + 40, (dTop + dBot) / 2 + dy, zF - dt] as Vec3), dir: [0, 0, 1], on: "door" })],
      tools: ["screwdriver"],
    },
    {
      title: "Push in the shelf pins",
      detail: "Four, at the bottom of the open space at the top, two in each side.",
      fix: [fx({ kind: "pin", dia: 5, at: sx2.flatMap((sx) => [-1, 1].map((k) => [sx * xIn, yShelf - T / 2 - 3, zc + 5 + k * (Dc / 2 - 60)] as Vec3)), dir: [-1, 0, 0] })].map((f) => ({ ...f, dir: undefined })),
    },
    { title: "Slide the shelf in", detail: "Onto the pins from the front, then turn each pin a quarter so it locks the shelf.", add: ["shelf"], from: { shelf: [0, 0, 300] } },
  ];
  return { parts, steps: splitSides(steps) };
}

/**
 * The bed frame: the headboard is built lying on its back (panels, rails, then the posts with cam locks), stood
 * against the wall, and the side rails are bolted to it through the posts and locked with big round connectors
 * inside the rails. Two people bolt the footboard on the same way, the cap goes on top of the headboard, then the
 * slat supports, the centre beam on its leg and the slats.
 */
function bed(s: ProductSpec): CustomParams {
  const queen = /queen/.test(s.slug ?? "");
  // IKEA's page for the queen: 165 x 208; the 160 x 200 is 167 x 207
  const W = queen ? 1650 : s.size.w * 10, L = queen ? 2080 : s.size.d * 10;
  const HH = (s.bed?.headH ?? 95) * 10, FH = 410;
  const PS = 70; // posts and footboard legs
  const xP = W / 2 - PS / 2, zH = -L / 2 + PS / 2, zFt = L / 2 - PS / 2;
  const yR0 = 200, yR1 = 380, yR = (yR0 + yR1) / 2; // side rails: 20 cm free under them
  const cap = 22, yTop = HH - cap;
  const iw = W - 2 * PS; // between the posts
  const yP0 = yR1, yP1 = yTop - 100; // infill panels
  const pw = iw / 2, stile = 45;
  const panel = (sx: number, id: string): CustomPart => ({
    id,
    name: "Headboard panel",
    size: [pw, yP1 - yP0, 16],
    pos: [sx * pw / 2, (yP0 + yP1) / 2, zH],
    pieces: [
      { shape: "box", size: [pw - stile, yP1 - yP0, 12], pos: [-sx * stile / 2, 0, 0] },
      { shape: "box", size: [stile, yP1 - yP0, 22], pos: [sx * (stile / 2 - pw / 2), 0, 0] },
    ],
  });
  const xRail = W / 2 - 25;
  const ySl = yR1 - 50; // slat supports, top
  const nSlats = s.bed?.slats ?? 17;
  const slatL = 2 * (xRail - 11) - 20;
  const slatZ = (i: number) => -L / 2 + PS + 60 + ((L - 2 * PS - 120) * i) / (nSlats - 1);
  const parts: CustomPart[] = [
    panel(-1, "pL"),
    panel(1, "pR"),
    { id: "lower", name: "Lower headboard rail", size: [iw, yR1 - yR0, 22], pos: [0, yR, zH], material: "wood" },
    { id: "upper", name: "Upper headboard rail", size: [iw, 100, 22], pos: [0, yTop - 50, zH], material: "wood" },
    { id: "postL", name: "Headboard post", size: [PS, yTop, PS], pos: [-xP, yTop / 2, zH], material: "wood" },
    { id: "postR", name: "Headboard post", size: [PS, yTop, PS], pos: [xP, yTop / 2, zH], material: "wood" },
    { id: "sideL", name: "Side rail", size: [22, yR1 - yR0, L - 2 * PS], pos: [-xRail, yR, 0], material: "wood" },
    { id: "sideR", name: "Side rail", size: [22, yR1 - yR0, L - 2 * PS], pos: [xRail, yR, 0], material: "wood" },
    {
      id: "foot",
      name: "Footboard",
      size: [W, FH, PS],
      pos: [0, FH / 2, zFt],
      material: "wood",
      pieces: [
        { shape: "box", size: [PS, FH, PS], pos: [-xP, 0, 0] },
        { shape: "box", size: [PS, FH, PS], pos: [xP, 0, 0] },
        { shape: "box", size: [iw, FH - yR0 + 20, 22], pos: [0, (yR0 - 20) / 2, 0] },
      ],
    },
    { id: "cap", name: "Headboard top", size: [W + 20, cap, 100], pos: [0, HH - cap / 2, zH], material: "wood" },
    ...[-1, 1].map((sx, i): CustomPart => ({ id: `sup${i}`, name: "Slat support", size: [25, 25, L - 2 * PS - 20], pos: [sx * (xRail - 11 - 12.5), ySl - 12.5, 0], material: "metal" })),
    { id: "beam", name: "Centre beam", size: [50, 40, L - 2 * PS - 20], pos: [0, ySl - 20, 0], material: "metal" },
    { id: "leg", name: "Centre leg", size: [40, ySl - 40, 40], pos: [0, (ySl - 40) / 2, 0], shape: "cyl", material: "metal" },
    ...Array.from({ length: nSlats }, (_, i): CustomPart => ({ id: `sl${i}`, name: "Slat", size: [slatL, 10, 64], pos: [0, ySl + 5, slatZ(i)], material: "wood" })),
  ];
  const slats = parts.filter((p) => p.name === "Slat").map((p) => p.id);
  const sx2 = [-1, 1];
  const ends = (y: number, n: number) => Array.from({ length: n }, (_, i) => -iw / 2 + (iw * (i + 0.5)) / n).map((x) => [x, y, zH] as Vec3);
  const railBolts = (z: number, dz: number, on: string): CustomFix =>
    fx({ kind: "bolt", len: 90, dia: 8, at: sx2.flatMap((sx) => [yR - 45, yR + 45].map((y) => [sx * xRail, y, z] as Vec3)), dir: [0, 0, dz], on });
  const connectors = (zEnd: number): CustomFix =>
    fx({ kind: "cam", name: "Bed connector", len: 18, dia: 34, at: sx2.flatMap((sx) => [yR - 45, yR + 45].map((y) => [sx * (xRail - 11), y, zEnd] as Vec3)), dir: [0, 0, 0] });
  const conn = (zEnd: number): CustomFix[] => sx2.map((sx) => ({ ...connectors(zEnd), at: connectors(zEnd).at!.filter((p) => Math.sign(p[0]) === sx), count: 2, dir: [sx, 0, 0] as Vec3 }));
  const zcH = -L / 2 + PS + 50, zcF = L / 2 - PS - 50;
  const supScrews = sx2.map((sx) => fx({ kind: "screw", len: 16, dia: 4, at: Array.from({ length: 8 }, (_, i) => [sx * (xRail - 11), ySl - 12, -L / 2 + PS + 40 + ((L - 2 * PS - 80) * i) / 7] as Vec3), dir: [sx, 0, 0], on: `sup${sx < 0 ? 0 : 1}` }));
  const steps: CustomStep[] = [
    {
      title: "Tap dowels into the headboard panels",
      detail: "Lay both panels on a rug, face down. Dowels into the holes along their top and bottom edges.",
      add: ["pL", "pR"],
      fix: [
        fx({ kind: "dowel", at: ends(yP0, 8), dir: [0, 1, 0] }),
        fx({ kind: "dowel", at: ends(yP1, 8), dir: [0, -1, 0] }),
      ],
      tools: ["hammer"],
      pose: "+z",
      warnings: ["floor"],
    },
    {
      title: "Screw the cam bolts into the panels",
      detail: "One into each edge of each panel, by hand until they stop.",
      fix: [
        ...["pL", "pR"].flatMap((on, i) => [yP0, yP1].map((y) => fx({ kind: "camScrew", at: [[ends(y, 2)[i][0] - 100, y, zH]], dir: [0, y === yP0 ? 1 : -1, 0], on }))),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Fit the lower rail and lock it",
      detail: "Push it onto the dowels and bolts along the panels' bottom edges, then turn the two cam locks in the rail.",
      add: ["lower"],
      fix: [fx({ kind: "cam", dia: 15, at: ends(yP0, 2).map((p) => [p[0] - 100, yP0 - 30, zH + 11] as Vec3), dir: [0, 0, -1], on: "lower" })],
      tools: ["screwdriver"],
    },
    {
      title: "Fit the upper rail and lock it",
      detail: "Turn the headboard round, then the same along the top edges.",
      add: ["upper"],
      fix: [fx({ kind: "cam", dia: 15, at: ends(yP1, 2).map((p) => [p[0] - 100, yP1 + 30, zH + 11] as Vec3), dir: [0, 0, -1], on: "upper" })],
      tools: ["screwdriver"],
    },
    {
      title: "Put bolts and dowels into the rail ends",
      detail: "A cam bolt into each end of both rails, and the dowels beside them.",
      fix: [
        ...sx2.flatMap((sx) => [
          fx({ kind: "camScrew", at: [[sx * iw / 2, yR - 40, zH]], dir: [-sx, 0, 0], on: "lower" }),
          fx({ kind: "camScrew", at: [[sx * iw / 2, yTop - 50, zH]], dir: [-sx, 0, 0], on: "upper" }),
          fx({ kind: "dowel", at: [yR + 30, yR + 70].map((y) => [sx * iw / 2, y, zH] as Vec3), dir: [-sx, 0, 0], on: "lower" }),
          fx({ kind: "dowel", at: [[sx * iw / 2, yTop - 25, zH]], dir: [-sx, 0, 0], on: "upper" }),
        ]),
      ],
      tools: ["screwdriver", "hammer"],
    },
    {
      title: "Fit the posts and lock them",
      detail: "One on each end, onto the dowels and bolts. Turn the two cam locks in each post.",
      add: ["postL", "postR"],
      fix: sx2.map((sx) => fx({ kind: "cam", dia: 15, at: [[sx * xP, yR - 40, zH + PS / 2], [sx * xP, yTop - 50, zH + PS / 2]], dir: [0, 0, -1], on: sx < 0 ? "postL" : "postR" })),
      tools: ["screwdriver"],
    },
    {
      title: "Push the rail guides into the posts",
      detail: "One plastic guide on the inside of each post, where the side rail will meet it.",
      fix: sx2.map((sx) => fx({ kind: "clip", name: "Rail guide", len: 40, dia: 14, at: [[sx * (xP - PS / 2), yR, zH + PS / 2]], dir: [0, 0, -1], on: sx < 0 ? "postL" : "postR" })),
    },
    {
      title: "Stand the headboard against the wall",
      detail: "Two of you lift it upright. Leave a little room behind it to reach the bolts.",
      pose: "+y",
      people: 2,
      warnings: ["two"],
    },
    {
      title: "Fit the connectors and dowels in the side rails",
      detail: "Two dowels into each end, then press a round connector into each of the eight big holes on the inside, arrow towards the end.",
      add: ["sideL", "sideR"],
      fix: [
        fx({ kind: "dowel", at: sx2.map((sx) => [sx * xRail, yR, -L / 2 + PS] as Vec3), dir: [0, 0, 1] }),
        fx({ kind: "dowel", at: sx2.map((sx) => [sx * xRail, yR, L / 2 - PS] as Vec3), dir: [0, 0, -1] }),
        ...conn(-L / 2 + PS + 40),
        ...conn(L / 2 - PS - 40),
      ],
      people: 2,
      from: { sideL: [-400, 0, 0], sideR: [400, 0, 0] },
    },
    {
      title: "Bolt the side rails to the headboard",
      detail: "Through the posts into the connectors, two bolts each side. Turn the connectors with a screwdriver to pull the joint tight.",
      fix: [{ ...railBolts(-L / 2, 1, "postL"), on: undefined }],
      tools: ["allen", "screwdriver"],
      people: 2,
      warnings: ["two"],
    },
    {
      title: "Bolt on the footboard",
      detail: "Push its two rail guides in first. One of you holds it while the other drives the bolts into the connectors and turns them tight.",
      add: ["foot"],
      fix: [
        fx({ kind: "clip", name: "Rail guide", len: 40, dia: 14, at: sx2.map((sx) => [sx * (xP - PS / 2), yR, zFt - PS / 2] as Vec3), dir: [0, 0, 1], on: "foot" }),
        { ...railBolts(L / 2, -1, "foot") },
      ],
      tools: ["allen", "screwdriver"],
      people: 2,
      warnings: ["two"],
    },
    {
      title: "Put the top on the headboard",
      detail: "Tap the dowels into the tops of the posts and the upper rail, screw three cam bolts into the top, press it on and turn the three cam locks from behind.",
      add: ["cap"],
      fix: [
        fx({ kind: "dowel", at: [-xP, -iw / 3, -iw / 8, iw / 6, iw / 3, xP].map((x) => [x, yTop, zH] as Vec3), dir: [0, -1, 0] }),
        fx({ kind: "camScrew", at: [-iw / 4, iw / 12, iw / 2.5].map((x) => [x, yTop, zH] as Vec3), dir: [0, 1, 0], on: "cap" }),
        fx({ kind: "cam", dia: 15, at: [-iw / 4, iw / 12, iw / 2.5].map((x) => [x, yTop - 30, zH - 11] as Vec3), dir: [0, 0, 1], on: "upper" }),
      ],
      tools: ["hammer", "screwdriver"],
    },
    {
      title: "Press the cover caps on",
      detail: "Over the bolt heads and holes on the outside of the posts and the headboard.",
      fix: [fx({ kind: "cap", len: 2, dia: 14, at: [...sx2.flatMap((sx) => [yR - 45, yR + 45].map((y) => [sx * xRail, y, -L / 2 - 1] as Vec3)), ...sx2.flatMap((sx) => [yR - 45, yR + 45].map((y) => [sx * xRail, y, L / 2 + 1] as Vec3)), [0, yTop - 50, zH - 12]], dir: [0, 0, 1] })],
    },
    {
      title: "Screw the slat supports to the side rails",
      detail: "Choose the height for your mattress first. Eight screws along each rail.",
      add: ["sup0", "sup1"],
      fix: supScrews,
      tools: ["screwdriver"],
    },
    {
      title: "Screw the beam brackets to the headboard and footboard",
      detail: "One in the middle of each, two screws each.",
      fix: [
        fx({ kind: "angle", name: "Beam bracket", len: 40, dia: 30, at: [[0, ySl - 20, zH + 11]], dir: [0, 0, -1], on: "lower" }),
        fx({ kind: "angle", name: "Beam bracket", len: 40, dia: 30, at: [[0, ySl - 20, zFt - 11]], dir: [0, 0, 1], on: "foot" }),
        fx({ kind: "screw", len: 16, dia: 4, at: [-30, 30].map((x) => [x, ySl - 30, zH + 11] as Vec3), dir: [0, 0, -1], on: "lower" }),
        fx({ kind: "screw", len: 16, dia: 4, at: [-30, 30].map((x) => [x, ySl - 30, zFt - 11] as Vec3), dir: [0, 0, 1], on: "foot" }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Fit the centre beam on its leg",
      detail: "Pull the beam out to length, set its ends in the brackets, clip the leg on under the middle and screw the ends down.",
      add: ["beam", "leg"],
      fix: [fx({ kind: "screw", len: 12, dia: 5, at: [zcH, zcF].flatMap((z) => [-12, 12].map((x) => [x, ySl, z + Math.sign(z) * 40] as Vec3)), dir: [0, -1, 0], on: "beam" })],
      tools: ["screwdriver"],
      check: "square",
    },
    {
      title: "Roll out the slats",
      detail: "Across the supports and the beam, then fix the end slats with a screw at each end so they can't move.",
      add: slats,
      fix: [fx({ kind: "screw", len: 16, dia: 4, at: [slatZ(0), slatZ(1), slatZ(nSlats - 2), slatZ(nSlats - 1)].flatMap((z) => sx2.map((sx) => [sx * (slatL / 2 - 20), ySl + 10, z] as Vec3)), dir: [0, -1, 0] })],
      tools: ["screwdriver"],
      people: 2,
    },
  ];
  return { parts, steps: splitSides(steps) };
}

/** Fittings given without a direction are split by side: dowels go into the panel's end, pins and cam locks into the side. */
function splitSides(steps: CustomStep[]): CustomStep[] {
  return steps.map((st) => {
    const fix: CustomFix[] = [];
    for (const f of st.fix ?? []) {
      if (f.dir || !f.at) {
        fix.push(f);
        continue;
      }
      for (const sx of [-1, 1]) {
        const at = f.at.filter((p) => Math.sign(p[0]) === sx);
        if (at.length) fix.push({ ...f, at, count: at.length, dir: [f.kind === "dowel" ? -sx : sx, 0, 0] });
      }
    }
    return { ...st, fix };
  });
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const spread = (a: number, c: number, n: number) => range(n).map((i) => (n === 1 ? (a + c) / 2 : a + ((c - a) * i) / (n - 1)));

/**
 * The twin bed with storage boxes (its own manual): the headboard lies on its back while the panel, the two rails and
 * the posts go together on double cam bolts, then it stands against the wall and the side rails and the ready-made
 * footboard are pulled on with round connectors. A cap goes on top, then the slat rails, the centre bar and the base.
 * IKEA's page: 109 x 96 x 196 cm.
 */
function twinBed(s: ProductSpec): CustomParams {
  const W = 1090, L = 1960;
  const xP = W / 2 - 30, iw = W - 120;
  const zH = -L / 2 + 20, zF = L / 2 - 20;
  const xR = xP, xIn = xR - 11;
  const ySl = 315, xSl = xIn - 12.5;
  const bl = 1880, nSl = 17;
  const parts: CustomPart[] = [
    { id: "panel", name: "Headboard panel", size: [iw, 440, 16], pos: [0, 600, zH] },
    { id: "lower", name: "Lower headboard rail", size: [iw, 140, 22], pos: [0, 310, zH] },
    { id: "upper", name: "Upper headboard rail", size: [iw, 120, 22], pos: [0, 880, zH] },
    { id: "postL", name: "Headboard post", size: [60, 940, 40], pos: [-xP, 470, zH] },
    { id: "postR", name: "Headboard post", size: [60, 940, 40], pos: [xP, 470, zH] },
    { id: "sideL", name: "Side rail", size: [22, 180, L - 80], pos: [-xR, 290, 0] },
    { id: "sideR", name: "Side rail", size: [22, 180, L - 80], pos: [xR, 290, 0] },
    {
      id: "foot",
      name: "Footboard",
      size: [W, 410, 40],
      pos: [0, 205, zF],
      pieces: [
        { shape: "box", size: [60, 410, 40], pos: [-xP, 0, 0] },
        { shape: "box", size: [60, 410, 40], pos: [xP, 0, 0] },
        { shape: "box", size: [iw, 300, 20], pos: [0, 55, 0] },
      ],
    },
    { id: "cap", name: "Headboard top", size: [W + 20, 20, 80], pos: [0, 950, zH] },
    { id: "railL", name: "Slat rail", size: [25, 25, L - 100], pos: [-xSl, ySl - 12.5, 0], material: "metal" },
    { id: "railR", name: "Slat rail", size: [25, 25, L - 100], pos: [xSl, ySl - 12.5, 0], material: "metal" },
    { id: "bar", name: "Centre bar", size: [2 * (xIn - 25), 15, 30], pos: [0, ySl - 7.5, 0], material: "metal" },
    {
      id: "base",
      name: "Slatted base",
      size: [960, 8, bl],
      pos: [0, ySl + 4, 0],
      material: "wood",
      pieces: range(nSl).map((i): PartPiece => ({ shape: "box", size: [960, 8, 60], pos: [0, 0, -bl / 2 + 30 + (i * (bl - 60)) / (nSl - 1)] })),
    },
  ];
  const sx2 = [-1, 1];
  const DB = { kind: "camScrew", len: 44, dia: 7, name: "Double cam bolt" } as const;
  const PCAM = { kind: "cam", len: 12, dia: 17 } as const; // the two in the panel are a different cam
  const CAM = { kind: "cam", len: 13, dia: 15 } as const;
  const camF = (on: string, at: Vec3[], back = false): CustomFix => fx({ ...CAM, on, at, dir: [0, 0, back ? 1 : -1] });
  const endBolts = (on: string, y: number) => fx({ ...DB, on, at: sx2.map((g) => [g * (iw / 2), y, zH] as Vec3), dir: [0, 0, 0] });
  // the bolts in the rail ends point into the rail from each end, so they're split by side
  const ends = (f: CustomFix): CustomFix[] => sx2.map((g) => ({ ...f, at: f.at!.filter((p) => Math.sign(p[0]) === g), count: f.at!.filter((p) => Math.sign(p[0]) === g).length, dir: [-g, 0, 0] as Vec3 }));
  const railCams = (on: string, ys: number[]) => camF(on, sx2.flatMap((g) => ys.map((y) => [g * (iw / 2 - 30), y, zH + 11] as Vec3)));
  const connY = [245, 335];
  const steps: CustomStep[] = [
    {
      title: "Tap dowels into the headboard panel",
      detail: "Lay it on a rug. Four along the bottom edge and four along the top edge.",
      add: ["panel"],
      fix: [
        fx({ kind: "dowel", on: "panel", at: spread(-400, 400, 4).map((x) => [x, 380, zH] as Vec3), dir: [0, 1, 0] }),
        fx({ kind: "dowel", on: "panel", at: spread(-400, 400, 4).map((x) => [x, 820, zH] as Vec3), dir: [0, -1, 0] }),
      ],
      tools: ["hammer"],
      pose: "+z",
      warnings: ["floor"],
    },
    {
      title: "Fit the double cam bolts into the panel",
      detail: "One in each long edge, held by a cam lock in the panel.",
      fix: [
        fx({ ...DB, on: "panel", at: [[-150, 380, zH]], dir: [0, 1, 0] }),
        fx({ ...DB, on: "panel", at: [[150, 820, zH]], dir: [0, -1, 0] }),
        fx({ ...PCAM, on: "panel", at: [[-150, 410, zH + 8], [150, 790, zH + 8]], dir: [0, 0, -1] }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Fit double cam bolts into the ends of the lower rail",
      detail: "One in each end, each held by a cam lock.",
      fix: [...ends(endBolts("lower", 345)), railCams("lower", [345])],
      tools: ["screwdriver"],
      wait: ["lower"],
    },
    { title: "Push the lower rail onto the panel", detail: "Onto the dowels and the bolt along the panel's bottom edge.", add: ["lower"], from: { lower: [0, -300, 0] } },
    { title: "Lock the cam lock", detail: "The one in the rail, over the panel's bolt.", fix: [camF("lower", [[-150, 350, zH + 11]])], tools: ["screwdriver"] },
    { title: "Turn it round and fit the upper rail", detail: "Onto the dowels and the bolt along the top edge.", add: ["upper"], from: { upper: [0, 300, 0] } },
    { title: "Lock the cam lock", fix: [camF("upper", [[150, 850, zH + 11]])], tools: ["screwdriver"] },
    {
      title: "Fit the other double cam bolts into the rail ends",
      detail: "One more in each end of the lower rail, one in each end of the upper rail, each with its cam lock.",
      fix: [...ends(endBolts("lower", 275)), ...ends(endBolts("upper", 900)), railCams("lower", [275]), railCams("upper", [900])],
      tools: ["screwdriver"],
    },
    {
      title: "Tap dowels into the rail ends",
      detail: "Two in each end of the lower rail, one in each end of the upper rail.",
      fix: [...ends(fx({ kind: "dowel", on: "lower", at: sx2.flatMap((g) => [250, 310].map((y) => [g * (iw / 2), y, zH] as Vec3)), dir: [0, 0, 0] })), ...ends(fx({ kind: "dowel", on: "upper", at: sx2.map((g) => [g * (iw / 2), 860, zH] as Vec3), dir: [0, 0, 0] }))],
      tools: ["hammer"],
    },
    { title: "Push the posts onto the rail ends", detail: "Both at once, onto the bolts and dowels.", add: ["postL", "postR"], from: { postL: [-300, 0, 0], postR: [300, 0, 0] } },
    { title: "Lock the cam locks", detail: "Four in the posts, over the lower rail's bolts.", fix: sx2.map((g) => camF(g < 0 ? "postL" : "postR", [275, 345].map((y) => [g * xP, y, zH + 20] as Vec3))), tools: ["screwdriver"] },
    { title: "Press the glides under the posts", detail: "One into the bottom end of each post.", fix: [fx({ kind: "glide", name: "Glide", len: 8, dia: 40, at: sx2.map((g) => [g * xP, 0, zH] as Vec3), dir: [0, 1, 0] })] },
    { title: "Turn it over and lock the last cam locks", detail: "One in each post, over the upper rail's bolts.", fix: sx2.map((g) => camF(g < 0 ? "postL" : "postR", [[g * xP, 900, zH - 20]], true)), tools: ["screwdriver"], pose: "-z" },
    {
      title: "Tap the dowels into the side rails",
      detail: "Two in each end.",
      fix: sx2.flatMap((g) => [-1, 1].map((e) => fx({ kind: "dowel", len: 40, dia: 10, on: g < 0 ? "sideL" : "sideR", at: [270, 310].map((y) => [g * xR, y, e * (L / 2 - 40)] as Vec3), dir: [0, 0, e] }))),
      tools: ["hammer"],
      pose: "+y",
      wait: ["sideL", "sideR"],
    },
    {
      title: "Press the connectors into the side rails",
      detail: "Two into the big holes at each end, arrow towards the end of the rail.",
      fix: sx2.map((g) => fx({ kind: "cam", name: "Bed connector", len: 18, dia: 34, on: g < 0 ? "sideL" : "sideR", at: [-1, 1].flatMap((e) => connY.map((y) => [g * xIn, y, e * (L / 2 - 80)] as Vec3)), dir: [g, 0, 0] })),
    },
    {
      title: "Stand the headboard against the wall and screw in the connector bolts",
      detail: "Two of you lift it upright. Two bolts into the inside face of each post, by hand.",
      fix: sx2.map((g) => fx({ kind: "stud", name: "Connector bolt", len: 45, dia: 8, on: g < 0 ? "postL" : "postR", at: connY.map((y) => [g * xR, y, -L / 2 + 40] as Vec3), dir: [0, 0, -1] })),
      people: 2,
      warnings: ["two", "wall"],
    },
    { title: "Fit a side rail to the headboard", detail: "Push it onto the dowels and bolts, then turn both connectors with the Allen key until the joint pulls tight.", add: ["sideL"], tools: ["allen"], people: 2, from: { sideL: [-300, 0, 300] } },
    { title: "Fit the other side rail", detail: "The same way, two connectors.", add: ["sideR"], tools: ["allen"], people: 2, from: { sideR: [300, 0, 300] } },
    { title: "Press the glides under the footboard", detail: "One into the bottom of each leg.", fix: [fx({ kind: "glide", name: "Glide", len: 8, dia: 40, on: "foot", at: sx2.map((g) => [g * xP, 0, zF] as Vec3), dir: [0, 1, 0] })], wait: ["foot"] },
    { title: "Screw the connector bolts into the footboard", detail: "Two into the inside of each leg.", fix: [fx({ kind: "stud", name: "Connector bolt", len: 45, dia: 8, on: "foot", at: sx2.flatMap((g) => connY.map((y) => [g * xR, y, L / 2 - 40] as Vec3)), dir: [0, 0, 1] })] },
    { title: "Push the footboard onto the side rails", detail: "Two of you: onto the dowels and bolts at the same time on both sides.", add: ["foot"], people: 2, warnings: ["two"], from: { foot: [0, 0, 500] } },
    { title: "Tighten the connectors at the foot", detail: "Turn each of the four with the Allen key until the joints are tight.", tools: ["allen"], kind: "cams" },
    {
      title: "Tap the plastic dowels into the top of the headboard",
      detail: "Five, along the top edge.",
      fix: [
        fx({ kind: "dowel", name: "Plastic dowel", len: 30, dia: 10, on: "upper", at: [-240, 0, 240].map((x) => [x, 940, zH] as Vec3), dir: [0, -1, 0] }),
        ...sx2.map((g) => fx({ kind: "dowel", name: "Plastic dowel", len: 30, dia: 10, on: g < 0 ? "postL" : "postR", at: [[g * xP, 940, zH]], dir: [0, -1, 0] })),
      ],
      tools: ["hammer"],
    },
    { title: "Screw the cam bolts into the top", detail: "Two, into the holes on its underside.", fix: [fx({ kind: "camScrew", len: 30, dia: 6, on: "cap", at: [-120, 120].map((x) => [x, 940, zH] as Vec3), dir: [0, 1, 0] })], tools: ["screwdriver"], wait: ["cap"] },
    { title: "Put the top on the headboard", detail: "Down onto the dowels, flush at the back.", add: ["cap"], from: { cap: [0, 300, 0] } },
    { title: "Lock the cam locks", detail: "Two, from the back of the upper rail.", fix: [camF("upper", [-120, 120].map((x) => [x, 915, zH - 11] as Vec3), true)], tools: ["screwdriver"] },
    {
      title: "Press the cover caps on",
      detail: "Over the holes on the outside of the posts and along the back of the top.",
      fix: [
        ...sx2.map((g) => fx({ kind: "cap", len: 2, dia: 14, on: g < 0 ? "postL" : "postR", at: [275, 345].map((y) => [g * (xP + 30), y, zH] as Vec3), dir: [-g, 0, 0] })),
        fx({ kind: "cap", len: 2, dia: 14, on: "cap", at: [-300, 0, 300].map((x) => [x, 950, zH - 40] as Vec3), dir: [0, 0, 1] }),
      ],
    },
    {
      title: "Screw the slat rails to the side rails",
      detail: "Eight screws along each rail, the flat flange at the top facing in.",
      add: ["railL", "railR"],
      fix: sx2.map((g) => fx({ kind: "screw", len: 16, dia: 4, on: g < 0 ? "railL" : "railR", mate: g < 0 ? "sideL" : "sideR", at: spread(-(L / 2 - 120), L / 2 - 120, 8).map((z) => [g * (xIn - 2), ySl - 14, z] as Vec3), dir: [g, 0, 0] })),
      tools: ["screwdriver"],
      from: { railL: [200, 0, 0], railR: [-200, 0, 0] },
    },
    { title: "Pull the centre bar out and lay it across", detail: "Slide it out until its ends rest on both slat rails, half way along the bed.", add: ["bar"], from: { bar: [0, 250, 0] } },
    { title: "Screw the ends of the centre bar down", detail: "One screw at each end, into the slat rails.", fix: [fx({ kind: "screw", len: 10, dia: 4, on: "bar", at: sx2.map((g) => [g * (xIn - 37), ySl, 0] as Vec3), dir: [0, -1, 0] })], tools: ["screwdriver"] },
    { title: "Lock its length", detail: "One more screw in the middle, where the two halves overlap.", fix: [fx({ kind: "screw", len: 10, dia: 4, on: "bar", at: [[0, ySl, 0]], dir: [0, -1, 0] })], tools: ["screwdriver"], check: "square" },
    {
      title: "Fit the slat holders at the ends of the rails",
      detail: "One at each end of both slat rails, a screw up from underneath into each.",
      fix: [
        fx({ kind: "clip", name: "Slat holder", len: 30, dia: 25, at: sx2.flatMap((g) => [-1, 1].map((e) => [g * xSl, ySl, e * (L / 2 - 80)] as Vec3)), dir: [0, -1, 0] }),
        fx({ kind: "screw", len: 12, dia: 6, at: sx2.flatMap((g) => [-1, 1].map((e) => [g * xSl, ySl - 25, e * (L / 2 - 80)] as Vec3)), dir: [0, 1, 0] }),
      ],
      tools: ["screwdriver"],
    },
    { title: "Lay in the slatted base", detail: "Curved side up, the end slats tucked under the holders.", add: ["base"], from: { base: [0, 300, 0] } },
  ];
  void s;
  return { parts, steps };
}

/**
 * The box set: a wide box with a divider and a narrow one, built side by side on their fronts. Dowels go into the
 * uprights, cam bolts into the fronts, the uprights stand on them; the castor bars and cross pieces go in on dowels,
 * the hardboard bottoms slide down the grooves, the backs go on with their own cam bolts and every joint is locked.
 */
function twinBoxes(b: PlanBuilder) {
  const xo = 1090 / 2 - 30 + 11 - 5; // fronts just in from the side rail's outer face
  const BD = 680, ft = 16;
  const xc = xo - BD / 2; // middle of the box, side to side
  const yLo = 58, yHi = 195; // underside of the box sides (above the castors), top
  const sh = yHi - yLo, inner = BD - 2 * ft;
  const T = (name: string, size: Vec3, material?: "fiber" | "wood") => b.part(name, size, { material });
  const boxes = [
    { z0: -910, z1: 290, divider: true },
    { z0: 310, z1: 910, divider: false },
  ];
  const frontT = boxes.map((x) => T("Box front", [ft, 180, x.z1 - x.z0]));
  const backT = boxes.map((x) => T("Box back", [ft, sh, x.z1 - x.z0]));
  const upT = T("Box side", [inner, sh, 16]);
  const barT = T("Castor bar", [inner, 25, 40]);
  const fronts = boxes.map((x, i) => b.place(frontT[i], [xo - ft / 2, 105, (x.z0 + x.z1) / 2]));
  const backs = boxes.map((x, i) => b.place(backT[i], [xo - BD + ft / 2, (yLo + yHi) / 2, (x.z0 + x.z1) / 2]));
  const upZ = [boxes[0].z0 + 8, (boxes[0].z0 + boxes[0].z1) / 2, boxes[0].z1 - 8, boxes[1].z0 + 8, boxes[1].z1 - 8];
  const ups = upZ.map((z, i) => (i === 1 ? b.place(T("Divider", [inner, yHi - yLo - 28, 16]), [xc, (yLo + 28 + yHi) / 2, z]) : b.place(upT, [xc, (yLo + yHi) / 2, z])));
  const barZ = [upZ[0] + 36, upZ[1] + 36, upZ[2] - 36, upZ[3] + 36, upZ[4] - 36];
  const bars = barZ.map((z) => b.place(barT, [xc, yLo + 12.5, z]));
  const crossZ: [number, number][] = [[barZ[0], barZ[1]], [barZ[1], barZ[2]], [barZ[3], barZ[4]]];
  const crosses = crossZ.map(([a, c]) => b.place(T("Cross piece", [40, 25, c - a - 20]), [xc, yLo + 12.5, (a + c) / 2]));
  const sheets = boxes.map((x) => b.place(T("Box bottom", [inner, 3, x.z1 - x.z0 - 2 * ft - 20], "fiber"), [xc, yLo + 26.5, (x.z0 + x.z1) / 2]));
  const frontOf = (z: number) => fronts[z < 300 ? 0 : 1], backOf = (z: number) => backs[z < 300 ? 0 : 1];

  const c0: Vec3 = [xc, (yLo + yHi) / 2, 0];
  const stage = (k: string, off: Vec3 = [0, 0, 0], from?: Vec3) => {
    const it = b.partItem(k);
    b.stage(k, [it.final.pos[0] - c0[0] + off[0], it.final.pos[1] - c0[1] + off[1], it.final.pos[2] - c0[2] + off[2]], it.final.rot, from);
  };
  const xF = xo - ft, xB = xo - BD + ft;
  const upY = [yLo + 40, yHi - 40];
  const BOLT: HwDef = { kind: "camScrew", len: 30, dia: 6 };
  const CAM: HwDef = { kind: "cam", len: 12, dia: 14 };
  const CASTOR_SCREW: HwDef = { kind: "screw", len: 14, dia: 4 };
  const DOWEL: HwDef = { kind: "dowel", len: 32, dia: 8 };
  const midBar = bars[1];
  const st = (title: string, detail: string, kind: "dowels" | "cams" | "join" | "screws" | "legs" | "general", body: () => void, tools?: ("hammer" | "screwdriver")[]) =>
    b.step({ title, detail, kind, tools, scene: "boxes", pose: "-x", warnings: [] }, body);
  const away: Vec3 = [-900, 0, 0];

  st("Tap the dowels into the box sides", "Two into each end of all five sides and the divider.", "dowels", () => {
    b.stagger(0.1);
    for (const k of ups) stage(k, away, [0, 200, 0]);
    b.then(0.15);
    const dy = (i: number) => (i === 1 ? [yLo + 70, yHi - 25] : [yLo + 60, yHi - 60]);
    b.fits(DOWEL, ups.flatMap((k, i) => [xF, xB].flatMap((x) => dy(i).map((y): FitOpts => ({ on: k, at: [x, y, upZ[i]], dir: [x === xF ? -1 : 1, 0, 0], mate: x === xF ? frontOf(upZ[i]) : backOf(upZ[i]) })))), 0.03);
  }, ["hammer"]);
  const frontBolts: FitOpts[] = [...ups.flatMap((k, i) => upY.map((y): FitOpts => ({ on: frontOf(upZ[i]), at: [xF, Math.max(y, i === 1 ? yLo + 60 : 0), upZ[i]], dir: [1, 0, 0], mate: k, mateHole: 4 }))), { on: fronts[0], at: [xF, yLo + 12.5, barZ[1]], dir: [1, 0, 0], mate: midBar, mateHole: 4 }];
  st("Screw the cam bolts into the fronts", "Lay both fronts face down on a rug. Eleven bolts, by hand: no drill.", "cams", () => {
    b.stagger(0.2);
    for (const k of fronts) stage(k, [0, 0, 0], [-200, 0, 0]);
    b.then(0.15);
    b.fits(BOLT, frontBolts, 0.06);
  }, ["screwdriver"]);
  st("Stand the sides on the fronts", "Push each one onto its bolts and dowels, the divider in the middle of the wide box.", "join", () => {
    b.stagger(0.15);
    for (const k of ups) stage(k, [0, 0, 0], [-300, 0, 0]);
  });
  const camAt = (x: number) => ups.flatMap((k, i) => upY.map((y): FitOpts => ({ on: k, at: [x, Math.max(y, i === 1 ? yLo + 60 : 0), upZ[i] + (i === 4 || i === 2 ? -8 : 8)], dir: [0, 0, i === 4 || i === 2 ? 1 : -1] })));
  st("Lock the cam locks", "Ten of them, near the fronts, turned clockwise.", "cams", () => b.fits(CAM, camAt(xF - 30), 0.06), ["screwdriver"]);
  const castorPts = bars.flatMap((k, i) => (i === 1 ? [xc] : [xF - 90, xB + 90]).map((x) => ({ k, x, z: barZ[i] })));
  st("Screw the castors onto the bars", "Nine castors, two screws each: two on every bar but one, which takes one in the middle.", "legs", () => {
    b.stagger(0.1);
    for (const k of bars) stage(k, [0, -250, 0], [0, 200, 0]);
    b.then(0.15);
    b.fits(HW.castor, castorPts.map((p): FitOpts => ({ on: p.k, at: [p.x, yLo, p.z], dir: [0, 1, 0], hole: false })), 0.08);
    b.then(0.1);
    b.fits(CASTOR_SCREW, castorPts.flatMap((p) => [-16, 16].map((dx): FitOpts => ({ on: p.k, at: [p.x + dx, yLo, p.z], dir: [0, 1, 0] }))), 0.03);
  }, ["screwdriver"]);
  const barDowels = bars.flatMap((k, i) => [xF, xB].flatMap((x) => [-10, 10].map((dz): FitOpts => ({ on: k, at: [x, yLo + 12.5, barZ[i] + dz], dir: [x === xF ? -1 : 1, 0, 0], mate: x === xF ? frontOf(barZ[i]) : backOf(barZ[i]) }))));
  const crossDowels = crosses.flatMap((k, i) => crossZ[i].flatMap((z, e) => [-8, 8].map((dx): FitOpts => ({ on: k, at: [xc + dx, yLo + 12.5, z + (e ? -20 : 20)], dir: [0, 0, e ? 1 : -1], mate: bars[[0, 1, 1, 2, 3, 4][i * 2 + e]] }))));
  st("Tap the dowels into the bars and cross pieces", "Thirty-two: two into each end of every piece.", "dowels", () => {
    b.stagger(0.1);
    for (const k of crosses) stage(k, [0, -250, 0], [0, 200, 0]);
    b.then(0.15);
    b.fits(DOWEL, [...barDowels, ...crossDowels], 0.02);
  }, ["hammer"]);
  st("Fit the bars and cross pieces into the wide box", "Each bar goes in beside a side, castors out; the cross pieces join them in the middle.", "join", () => {
    b.stagger(0.2);
    for (const k of [bars[0], crosses[0], bars[1], crosses[1], bars[2]]) stage(k, [0, 0, 0], [-250, 0, 0]);
  });
  st("Lock the middle bar", "One cam lock, near the front.", "cams", () => b.fit(CAM, { on: midBar, at: [xF - 30, yLo + 25, barZ[1]], dir: [0, -1, 0] }), ["screwdriver"]);
  st("Fit the bars and cross piece into the narrow box", "The same way.", "join", () => {
    b.stagger(0.2);
    for (const k of [bars[3], crosses[2], bars[4]]) stage(k, [0, 0, 0], [-250, 0, 0]);
  });
  st("Slide the bottoms down the grooves", "Smooth side in, one into each box, until they rest on the bars.", "general", () => {
    b.stagger(0.25);
    for (const k of sheets) stage(k, [0, 0, 0], [-600, 0, 0]);
  });
  const backBolts: FitOpts[] = [...ups.flatMap((k, i) => upY.map((y): FitOpts => ({ on: backOf(upZ[i]), at: [xB, Math.max(y, i === 1 ? yLo + 60 : 0), upZ[i]], dir: [-1, 0, 0], mate: k, mateHole: 4 }))), { on: backs[0], at: [xB, yLo + 12.5, barZ[1]], dir: [-1, 0, 0], mate: midBar, mateHole: 4 }];
  st("Screw the cam bolts into the backs", "Eleven more, by hand.", "cams", () => {
    b.stagger(0.2);
    for (const k of backs) stage(k, [-300, 0, 0], [0, 200, 0]);
    b.then(0.15);
    b.fits(BOLT, backBolts, 0.06);
  }, ["screwdriver"]);
  st("Put the backs on", "Press each one down onto the dowels and bolts along the sides and bars.", "join", () => {
    b.stagger(0.25);
    for (const k of backs) stage(k, [0, 0, 0], [-250, 0, 0]);
  });
  st("Lock the cam locks", "One in the middle bar, then the ten in the sides near the backs.", "cams", () => {
    b.fit(CAM, { on: midBar, at: [xB + 30, yLo + 25, barZ[1]], dir: [0, -1, 0] });
    b.then(0.1);
    b.fits(CAM, camAt(xB + 30), 0.06);
  }, ["screwdriver"]);
  b.step({ title: "Roll the boxes under the bed", detail: "Stand them on their castors and push them in from the side; the narrow one goes at the foot end.", kind: "drawer" }, () => {
    b.stagger(0.3);
    for (const g of [[fronts[0], backs[0], ...ups.slice(0, 3), ...bars.slice(0, 3), crosses[0], crosses[1], sheets[0]], [fronts[1], backs[1], ...ups.slice(3), ...bars.slice(3), crosses[2], sheets[1]]]) {
      b.stagger(0);
      for (const k of g) b.add(k, [700, 0, 0]);
      b.wait(0.3);
    }
  });
}

const family: Family = {
  names: ["SONGESAND"],
  build(b, s) {
    if (!/songesand-bed-frame-2-storage-boxes-twin/.test(s.slug ?? "")) return false;
    buildCustom(b, { ...s, custom: twinBed(s) });
    twinBoxes(b);
    return true;
  },
  recipe(s) {
    const slug = s.slug ?? "";
    if (/songesand-nightstand/.test(slug)) return nightstand(s);
    if (/songesand-bed-frame-(160-x-200|queen)/.test(slug)) return bed(s);
    return null;
  },
};
export default family;
