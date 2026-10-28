import type { Family } from "./family";
import type { CustomFix, CustomPart, CustomParams, CustomStep, PartMaterial, ProductSpec, Vec3 } from "../../types";

/**
 * MICKE, read from IKEA's manuals for the 73 and 142 desks: one full-height side panel, a white steel leg frame
 * at the other end and one drawer (two on the 142, with a middle panel between them) under the top. The drawers are
 * built first: cam bolts in the front, the sides doweled and cam-locked to it, the bottom slid in, the back screwed
 * on and the runners fitted. Then the shelf, back panel and top strip are doweled together, the side panel and
 * drawer walls get cam bolts and runners and are locked on, the leg frame is screwed to the back with a steel strip,
 * and the whole frame is turned upside down onto the top and cam-locked. The drawer unit with drop-file storage has
 * its own manual: a carcass with no bottom on five castors, three small drawers and a file drawer with hanging frames.
 */

type Kind = CustomFix["kind"];
const at = (kind: Kind, pts: Vec3[], dir: Vec3, on?: string, mate?: string, o: { len?: number; dia?: number; name?: string } = {}): CustomFix => ({ kind, count: pts.length, at: pts, dir, on, mate, ...o });
const P = (id: string, name: string, x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, material: PartMaterial = "board"): CustomPart => ({
  id,
  name,
  size: [x1 - x0, y1 - y0, z1 - z0],
  pos: [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2],
  material,
});

const DOWEL = { len: 30, dia: 8 };
const CAM_BOLT = { len: 34, dia: 7 };
const CAM = { len: 13, dia: 15 };
const RUNNER = { len: 420, dia: 36, name: "Drawer runner" };
const SMALL = { len: 12, dia: 4 };
const LONG = { len: 60, dia: 6, name: "Long screw" };

function desk(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, H = 750, T = 25, D = 500;
  const n = W > 1000 ? 2 : 1;
  const yT = H - T, zb = -D / 2, zf = D / 2;
  const xa = -W / 2 + 18; // the side panel's inner face
  const xb = W / 2 - 60; // the right drawer wall's outer face
  const xl = W / 2 - 37.5; // the leg frame's inner face
  const yS = 572; // the shelf under the drawers
  const bay = (xb - 18 - xa - 18 * (n - 1)) / n;
  const bayX = (i: number): [number, number] => [xa + i * (bay + 18), xa + i * (bay + 18) + bay];
  const walls = Array.from({ length: n }, (_, i) => (i < n - 1 ? `MP${i}` : "DW")); // the wall at the right of each bay
  const wallX = (i: number) => bayX(i)[1]; // its left face

  const parts: CustomPart[] = [
    P("SP", "Side panel", -W / 2, xa, 0, yT, zb, zf),
    P("SH", "Shelf", xa, xb, yS, yS + 18, zb + 18, zf - 20),
    P("BP", "Back panel", xa, xl, yS, yT - 18, zb, zb + 18),
    P("TS", "Top strip", xa, xl, yT - 18, yT, zb, zb + 80),
    P("TOP", "Desk top", -W / 2, W / 2, yT, H, zb, zf),
  ];
  walls.forEach((id, i) => parts.push(P(id, id === "DW" ? "Drawer wall" : "Middle panel", wallX(i), wallX(i) + 18, yS + 18, yT, zb + 18, zf - 20)));
  parts.push({
    id: "LF",
    name: "Leg frame",
    size: [25, yT, D - 50],
    pos: [xl + 12.5, yT / 2, 0],
    material: "metal",
    pieces: [
      { shape: "box", size: [25, yT, 25], pos: [0, 0, -(D - 50) / 2 + 12.5] },
      { shape: "box", size: [25, yT, 25], pos: [0, 0, (D - 50) / 2 - 12.5] },
      { shape: "box", size: [25, 25, D - 50], pos: [0, -yT / 2 + 12.5, 0] },
      { shape: "box", size: [25, 25, D - 50], pos: [0, yT / 2 - 12.5, 0] },
    ],
  });

  // the drawers: a front, two sides, a bottom and a back, on runners 13 mm wide each side
  const dy0 = yS + 30, dy1 = yT - 25, dz0 = zb + 30, dz1 = zf - 38;
  const drawer = (i: number) => {
    const [a, b] = bayX(i);
    const s0 = a + 13, s1 = b - 13;
    parts.push(P(`DF${i}`, "Drawer front", a + 2, b - 2, yS + 22, yT - 4, dz1, dz1 + 18));
    parts.push(P(`DL${i}`, "Drawer side", s0, s0 + 12, dy0, dy1, dz0, dz1));
    parts.push(P(`DR${i}`, "Drawer side", s1 - 12, s1, dy0, dy1, dz0, dz1));
    parts.push(P(`DB${i}`, "Drawer back", s0 + 12, s1 - 12, dy0 + 10, dy1, dz0, dz0 + 12));
    parts.push(P(`DT${i}`, "Drawer bottom", s0 + 12, s1 - 12, dy0 + 4, dy0 + 7, dz0 + 12, dz1, "fiber"));
    return { s0, s1, a, b };
  };
  const dr = Array.from({ length: n }, (_, i) => drawer(i));
  const each = (f: (d: (typeof dr)[number], i: number) => CustomFix[]) => dr.flatMap((d, i) => f(d, i));
  const yM = (dy0 + dy1) / 2;

  const steps: CustomStep[] = [
    {
      title: n > 1 ? "Screw two cam bolts into each drawer front" : "Screw two cam bolts into the drawer front",
      detail: "Lay it face down on a rug. Into the holes near the ends, by hand until they stop.",
      fix: each((d, i) => [at("camScrew", [[d.s0 + 6, yM, dz1], [d.s1 - 6, yM, dz1]], [0, 0, 1], `DF${i}`, undefined, CAM_BOLT)]),
      tools: ["screwdriver"],
      warnings: ["floor"],
    },
    {
      title: "Tap a dowel into each drawer side and stand it on the front",
      detail: "The dowel goes into the front end of each side. Holes for the cam locks face in.",
      fix: each((d, i) => [at("dowel", [[d.s0 + 6, dy1 - 25, dz1]], [0, 0, -1], `DL${i}`, `DF${i}`, DOWEL), at("dowel", [[d.s1 - 6, dy1 - 25, dz1]], [0, 0, -1], `DR${i}`, `DF${i}`, DOWEL)]),
      tools: ["hammer"],
    },
    {
      title: "Turn the cam locks in the drawer sides",
      detail: "Arrow towards the bolt, then clockwise until the side pulls tight against the front.",
      fix: each((d, i) => [at("cam", [[d.s0 + 12, yM, dz1 - 34]], [-1, 0, 0], `DL${i}`, undefined, CAM), at("cam", [[d.s1 - 12, yM, dz1 - 34]], [1, 0, 0], `DR${i}`, undefined, CAM)]),
      tools: ["screwdriver"],
    },
    { title: n > 1 ? "Slide the bottoms into the grooves" : "Slide the bottom into the grooves", detail: "Smooth side up, all the way to the front.", add: dr.map((_, i) => `DT${i}`) },
    { title: n > 1 ? "Fit the backs onto the drawers" : "Fit the back onto the drawer", detail: "It sits between the sides, over the end of the bottom.", add: dr.map((_, i) => `DB${i}`) },
    {
      title: "Screw the back to the sides",
      detail: "One screw through each side into the end of the back.",
      fix: each((d, i) => [at("screw", [[d.s0, yM, dz0 + 6]], [1, 0, 0], `DL${i}`, `DB${i}`, { len: 25, dia: 4 }), at("screw", [[d.s1, yM, dz0 + 6]], [-1, 0, 0], `DR${i}`, `DB${i}`, { len: 25, dia: 4 })]),
      tools: ["screwdriver"],
    },
    {
      title: n > 1 ? "Clip the inner runners onto the drawers" : "Clip the inner runners onto the drawer",
      detail: "One along the bottom edge of each side, the wheel at the back.",
      fix: each((d, i) => [at("runner", [[d.s0, dy0 + 10, (dz0 + dz1) / 2]], [1, 0, 0], `DL${i}`, undefined, RUNNER), at("runner", [[d.s1, dy0 + 10, (dz0 + dz1) / 2]], [-1, 0, 0], `DR${i}`, undefined, RUNNER)]),
    },
    {
      title: "Screw the runners to the drawer sides",
      detail: "Two small screws in each.",
      fix: each((d, i) => [at("screw", [[d.s0, dy0 + 10, dz0 + 80], [d.s0, dy0 + 10, dz1 - 80]], [1, 0, 0], `DL${i}`, undefined, SMALL), at("screw", [[d.s1, dy0 + 10, dz0 + 80], [d.s1, dy0 + 10, dz1 - 80]], [-1, 0, 0], `DR${i}`, undefined, SMALL)]),
      tools: ["screwdriver"],
    },
  ];

  // the frame
  const xs = n > 1 ? [-W / 4, 0, W / 4] : [-W / 6, W / 6];
  const shelfDowels = n > 1 ? [-W / 3, -W / 9, W / 9, W / 3] : [-W / 5, W / 5];
  const wallFix = (kind: Kind, f: (x: number, id: string) => [Vec3[], Vec3], o: { len?: number; dia?: number; name?: string }) => walls.map((id, i) => {
    const [pts, dir] = f(wallX(i), id);
    return at(kind, pts, dir, id, undefined, o);
  });
  steps.push(
    {
      title: "Tap dowels into the shelf and stand the back panel on it",
      detail: "Lay the shelf on a rug. The back panel stands on the dowels along its back edge.",
      add: ["SH", "BP"],
      fix: [at("dowel", shelfDowels.map((x) => [x, yS + 18, zb + 9] as Vec3), [0, -1, 0], "SH", "BP", DOWEL)],
      tools: ["hammer"],
      warnings: ["floor"],
    },
    {
      title: "Tap dowels into the back panel and fit the top strip",
      detail: "Along its top edge, then press the strip on, its wide side to the front.",
      add: ["TS"],
      fix: [at("dowel", shelfDowels.map((x) => [x, yT - 18, zb + 9] as Vec3), [0, -1, 0], "BP", "TS", DOWEL)],
      tools: ["hammer"],
    },
    {
      title: n > 1 ? "Screw cam bolts into the side panel and the drawer walls" : "Screw cam bolts into the side panel and the drawer wall",
      detail: "Four in each, into the holes on their inner faces and bottom edges.",
      fix: [
        at("camScrew", [[xa, yS + 9, -150], [xa, yS + 9, 150], [xa, 650, zb + 9], [xa, yT - 9, zb + 40]], [-1, 0, 0], "SP", undefined, CAM_BOLT),
        ...wallFix("camScrew", (x) => [[[x + 9, yS + 18, -150], [x + 9, yS + 18, 0], [x + 9, yS + 18, 150], [x + 9, 650, zb + 18]], [0, 1, 0]], CAM_BOLT),
      ],
      tools: ["screwdriver"],
    },
    {
      title: n > 1 ? "Screw the outer runners to the side panel and the walls" : "Screw the outer runners to the side panel and the wall",
      detail: "Wheel at the front, two small screws in each.",
      fix: [
        ...dr.flatMap((d, i) => [
          at("runner", [[d.a, dy0 + 10, (dz0 + dz1) / 2]], [-1, 0, 0], i === 0 ? "SP" : walls[i - 1], undefined, RUNNER),
          at("runner", [[d.b, dy0 + 10, (dz0 + dz1) / 2]], [1, 0, 0], walls[i], undefined, RUNNER),
        ]),
        ...dr.flatMap((d, i) => [
          at("screw", [[d.a, dy0 + 10, dz0 + 60], [d.a, dy0 + 10, dz1 - 60]], [-1, 0, 0], i === 0 ? "SP" : walls[i - 1], undefined, SMALL),
          at("screw", [[d.b, dy0 + 10, dz0 + 60], [d.b, dy0 + 10, dz1 - 60]], [1, 0, 0], walls[i], undefined, SMALL),
        ]),
      ],
      tools: ["screwdriver"],
    },
    {
      title: n > 1 ? "Push the side panel and the walls onto the shelf" : "Push the side panel and the wall onto the shelf",
      detail: "Two dowels in the shelf's end go into the side panel. The walls stand on the shelf, in front of the back panel.",
      fix: [at("dowel", [[xa, yS + 9, -60], [xa, yS + 9, 60]], [1, 0, 0], "SH", "SP", DOWEL)],
      tools: ["hammer"],
    },
    {
      title: "Turn the cam locks",
      detail: "In the shelf, the back panel and the top strip, each clockwise until the joint pulls tight.",
      fix: [
        at("cam", [[xa + 34, yS + 18, -150], [xa + 34, yS + 18, 150]], [0, -1, 0], "SH", undefined, CAM),
        at("cam", [[xa + 34, 650, zb + 18]], [0, 0, -1], "BP", undefined, CAM),
        at("cam", [[xa + 34, yT, zb + 40]], [0, -1, 0], "TS", undefined, CAM),
        ...walls.map((_, i) => at("cam", [[wallX(i) - 25, yS + 18, -150], [wallX(i) - 25, yS + 18, 0], [wallX(i) - 25, yS + 18, 150]], [0, -1, 0], "SH", undefined, CAM)),
        ...walls.map((_, i) => at("cam", [[wallX(i) - 25, 650, zb + 18]], [0, 0, -1], "BP", undefined, CAM)),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Tap dowels into the top edges",
      detail: n > 1 ? "Two in the side panel and two in the drawer wall at the end." : "Two in the side panel, two in the drawer wall.",
      fix: [at("dowel", [[-W / 2 + 9, yT, -150], [-W / 2 + 9, yT, 150]], [0, -1, 0], "SP", "TOP", DOWEL), at("dowel", [[xb - 9, yT, -150], [xb - 9, yT, 150]], [0, -1, 0], "DW", "TOP", DOWEL), ...(n > 1 ? [at("dowel", [[wallX(0) + 9, yT, 120]], [0, -1, 0], walls[0], "TOP", DOWEL)] : [])],
      tools: ["hammer"],
    },
    {
      title: "Screw the leg frame to the back with the steel strip",
      detail: "Hold the strip inside the frame's top bar and turn the three long screws through it into the back panel and the top strip.",
      add: ["LF"],
      fix: [at("plate", [[xl, 650, zb + 22]], [-1, 0, 0], "BP", "LF", { len: 4, dia: 40, name: "Steel strip" }), at("screw", [[xl + 25, yT - 9, zb + 40], [xl + 25, 680, zb + 9], [xl + 25, 610, zb + 9]], [-1, 0, 0], "LF", undefined, LONG)],
      tools: ["allen"],
    },
    {
      title: "Screw cam bolts into the underside of the top",
      detail: "Lay the top face down on a rug, then screw the bolts into the marked holes.",
      fix: [at("camScrew", [[-W / 2 + 9, yT, -60], [-W / 2 + 9, yT, 60], ...walls.flatMap((_, i) => [[wallX(i) + 9, yT, -60], [wallX(i) + 9, yT, 60]] as Vec3[])], [0, 1, 0], "TOP", undefined, CAM_BOLT)],
      tools: ["screwdriver"],
      pose: "-y",
      warnings: ["floor"],
      from: { TOP: [0, -400, 0] },
    },
    { title: "Turn the frame upside down onto the top", detail: "Lower it so every dowel and bolt finds its hole, the leg frame at the end with the cable hole.", people: 2, warnings: ["two"] },
    {
      title: "Lock the top on with cam locks",
      detail: "In the side panel and each wall, near the top edge.",
      fix: [at("cam", [[xa, yT - 34, -60], [xa, yT - 34, 60]], [-1, 0, 0], "SP", undefined, CAM), ...walls.map((id, i) => at("cam", [[wallX(i), yT - 34, -60], [wallX(i), yT - 34, 60]], [1, 0, 0], id, undefined, CAM))],
      tools: ["screwdriver"],
    },
    { title: "Stick the two glides under the side panel", fix: [at("glide", [[-W / 2 + 9, 0, -200], [-W / 2 + 9, 0, 200]], [0, 1, 0], "SP", undefined, { len: 4, dia: 30, name: "Glide" })] },
    {
      title: "Stand it up and fit the two bumpers at the back",
      detail: "They keep the top clear of the wall. One on the side panel, one on the leg frame.",
      fix: [at("glide", [[-W / 2 + 9, 650, zb], [xl + 12.5, 650, zb + 25]], [0, 0, 1], undefined, undefined, { len: 10, dia: 20, name: "Bumper" })],
      pose: "+y",
      people: 2,
      warnings: ["two"],
    },
    { title: n > 1 ? "Slide the drawers in" : "Slide the drawer in", detail: "Rest the drawer's runners on the outer ones, tilted down at the front, and push it in until it drops into place." },
    {
      title: "Push in the cable outlet and stick on the felt pads",
      detail: "The outlet goes in the hole at the back of the top. The pads go on the back of the drawer front, so it closes softly.",
      fix: [
        at("cap", [[W / 2 - 80, H, zb + 80]], [0, -1, 0], "TOP", undefined, { len: 15, dia: 60, name: "Cable outlet" }),
        at("glide", dr.flatMap((d) => (n > 1 ? [yS + 40] : [yS + 40, yT - 30]).flatMap((y) => [[d.a + 20, y, dz1], [d.b - 20, y, dz1]] as Vec3[])), [0, 0, 1], undefined, undefined, { len: 2, dia: 10, name: "Felt pad" }),
      ],
    },
  );
  return finish({ parts, steps });
}

/* ---------- drawer unit with drop-file storage ---------- */

const RAIL_SCREW = { len: 10, dia: 4, name: "Runner screw" };
const PUSH = { len: 40, dia: 8, name: "Push-in fastener" };

function drawerUnit(s: ProductSpec): CustomParams {
  // IKEA: 35 wide, 50 deep, 75 high; on five castors, one of them under the file drawer
  const W = s.size.w * 10, D = s.size.d * 10, H = s.size.h * 10, T = 18;
  const y0 = 58, yT = H - T; // the sides stand on the castors; underside of the top
  const xa = -W / 2 + T, xb = W / 2 - T, zb = -D / 2, zf = D / 2;
  const zr = zb + 18; // the back rails' back face, in front of the back panel
  const parts: CustomPart[] = [
    P("SL", "Side panel", -W / 2, xa, y0, yT, zb, zf),
    P("SR", "Side panel", xb, W / 2, y0, yT, zb, zf),
    P("BR0", "Back rail", xa, xb, y0, y0 + 100, zr, zr + 18),
    P("BR1", "Back rail", xa, xb, 330, 400, zr, zr + 18),
    P("BK", "Back panel", xa, xb, y0 + 10, yT, zb + 6, zb + 9, "fiber"),
    P("TOP", "Top", -W / 2, W / 2, yT, H, zb, zf),
  ];
  // three small drawers and the file drawer: fronts set in between the sides, boxes on runners 13 mm each side
  const s0 = xa + 13, s1 = xb - 13, dz0 = zb + 35, dz1 = zf - 18;
  const fronts: [number, number][] = [[615, 722], [485, 595], [355, 465], [62, 335]];
  const box = fronts.map(([a, b], i) => {
    const file = i === 3;
    const by0 = file ? 76 : a + 10, by1 = file ? 300 : b - 20;
    parts.push(P(`DF${i}`, file ? "File drawer front" : "Drawer front", xa + 2, xb - 2, a, b, dz1, zf));
    parts.push(P(`DL${i}`, file ? "File drawer side" : "Drawer side", s0, s0 + 12, by0, by1, dz0, dz1));
    parts.push(P(`DR${i}`, file ? "File drawer side" : "Drawer side", s1 - 12, s1, by0, by1, dz0, dz1));
    parts.push(P(`DT${i}`, file ? "File drawer bottom" : "Drawer bottom", s0 + 12, s1 - 12, by0 + 4, by0 + 7, dz0 + 12, dz1, "fiber"));
    parts.push(P(`DB${i}`, file ? "File drawer back" : "Drawer back", s0 + 12, s1 - 12, by0 + 10, by1, dz0, dz0 + 12));
    return { by0, by1, ym: (by0 + by1) / 2, rail: by0 + 12 };
  });
  const small = [0, 1, 2];
  const each = (ids: number[], f: (i: number) => CustomFix[]) => ids.flatMap(f);
  const sideOf = (sx: number) => (sx < 0 ? "SL" : "SR");
  const inner = (sx: number) => (sx < 0 ? xa : xb);
  const fileRail = box[3].by1 - 25;

  const steps: CustomStep[] = [
    {
      title: "Screw four cam bolts into the side panels",
      detail: "Lay both sides on a rug, inside up. Two into each, near the back edge.",
      fix: [-1, 1].map((sx) => at("camScrew", [[inner(sx), y0 + 50, zr + 9], [inner(sx), 365, zr + 9]], [-sx, 0, 0], sideOf(sx), undefined, CAM_BOLT)),
      tools: ["screwdriver"],
      warnings: ["floor"],
    },
    { title: "Pull the drop-file runners apart", detail: "Slide each runner out to its stop, press the catch and take the inner part off. It goes on the file drawer later." },
    {
      title: "Screw the drop-file runners to the sides",
      detail: "The outer parts, low down on each side. Three small screws in each, sliding the runner to reach them.",
      fix: [
        ...[-1, 1].map((sx) => at("runner", [[inner(sx), fileRail, 0]], [-sx, 0, 0], sideOf(sx), undefined, { len: 420, dia: 30, name: "Drop-file runner" })),
        ...[-1, 1].map((sx) => at("screw", [-150, 0, 150].map((z): Vec3 => [inner(sx), fileRail, z]), [-sx, 0, 0], sideOf(sx), undefined, { len: 12, dia: 4 })),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Screw the drawer runners to the sides",
      detail: "Three on each side, wheel at the front. Two runner screws in each.",
      fix: [
        ...[-1, 1].map((sx) => at("runner", small.map((i): Vec3 => [inner(sx), box[i].rail, 0]), [-sx, 0, 0], sideOf(sx), undefined, RUNNER)),
        ...[-1, 1].map((sx) => at("screw", small.flatMap((i): Vec3[] => [[inner(sx), box[i].rail, -150], [inner(sx), box[i].rail, 170]]), [-sx, 0, 0], sideOf(sx), undefined, RAIL_SCREW)),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Join the sides with the two back rails",
      detail: "Dowels in the rails' ends, then press one side on each end. Cam lock holes face in.",
      add: ["BR0", "BR1"],
      fix: [-1, 1].flatMap((sx) => [at("dowel", [[inner(sx), y0 + 50, zr + 9]], [sx, 0, 0], "BR0", sideOf(sx), DOWEL), at("dowel", [[inner(sx), 365, zr + 9]], [sx, 0, 0], "BR1", sideOf(sx), DOWEL)]),
      tools: ["hammer"],
    },
    {
      title: "Turn the cam locks in the rails",
      detail: "Four of them, arrow towards the bolt, then clockwise until tight.",
      fix: [-1, 1].flatMap((sx) => [at("cam", [[inner(sx) - sx * 34, y0 + 50, zr + 18]], [0, 0, -1], "BR0", undefined, { len: 13, dia: 15 }), at("cam", [[inner(sx) - sx * 34, 365, zr + 18]], [0, 0, -1], "BR1", undefined, { len: 13, dia: 15 })]),
      tools: ["screwdriver"],
    },
    { title: "Slide the back panel down into the grooves", detail: "Smooth white side to the front, all the way down to the bottom rail.", add: ["BK"], from: { BK: [0, 700, 0] } },
    { title: "Tap dowels into the top edges of the sides", detail: "Two in each.", fix: [-1, 1].map((sx) => at("dowel", [[sx * (W / 2 - 9), yT, -150], [sx * (W / 2 - 9), yT, 150]], [0, -1, 0], sideOf(sx), "TOP", DOWEL)), tools: ["hammer"] },
    {
      title: "Screw four cam bolts into the top",
      detail: "Lay it face down on the rug and screw them into the holes near the ends.",
      fix: [at("camScrew", [-1, 1].flatMap((sx) => [[sx * (W / 2 - 9), yT, -60], [sx * (W / 2 - 9), yT, 60]] as Vec3[]), [0, 1, 0], "TOP", undefined, CAM_BOLT)],
      tools: ["screwdriver"],
      wait: ["TOP"],
      warnings: ["floor"],
    },
    {
      title: "Put the top on and lock it",
      detail: "Press it onto the dowels and bolts, then turn the four cam locks in the sides.",
      add: ["TOP"],
      fix: [-1, 1].map((sx) => at("cam", [[inner(sx), yT - 34, -60], [inner(sx), yT - 34, 60]], [-sx, 0, 0], sideOf(sx), undefined, { len: 13, dia: 15 })),
      tools: ["screwdriver"],
      from: { TOP: [0, 350, 0] },
    },
    {
      title: "Clip the back panel to the sides",
      detail: "Four clips at the back, each pushed through its hole and locked with its wedge.",
      fix: [
        at("clip", [-1, 1].flatMap((sx) => [[inner(sx), 200, zb + 8], [inner(sx), 640, zb + 8]] as Vec3[]), [0, 0, -1], "BK", undefined, { len: 18, dia: 14, name: "Back clip" }),
        at("clip", [-1, 1].flatMap((sx) => [[inner(sx), 200, zb + 12], [inner(sx), 640, zb + 12]] as Vec3[]), [0, 0, -1], "BK", undefined, { len: 10, dia: 12, name: "Clip wedge" }),
      ],
    },
    {
      title: "Turn it upside down and knock in the castor sockets",
      detail: "One into the bottom edge of each side, near the corners. Tap them flush.",
      fix: [at("spacer", [-1, 1].flatMap((sx) => [-1, 1].map((sz): Vec3 => [sx * (W / 2 - 9), y0, sz * (D / 2 - 40)])), [0, 1, 0], undefined, undefined, { len: 30, dia: 14, name: "Castor socket" })],
      pose: "-y",
      tools: ["hammer"],
      warnings: ["floor"],
    },
    {
      title: "Click the two front castors in",
      detail: "A pin into each front socket until it clicks, then the castor onto the pin until it clicks.",
      fix: [
        at("stud", [-1, 1].map((sx): Vec3 => [sx * (W / 2 - 9), y0, D / 2 - 40]), [0, 1, 0], undefined, undefined, { len: 40, dia: 8, name: "Castor pin" }),
        at("castor", [-1, 1].map((sx): Vec3 => [sx * (W / 2 - 9), y0, D / 2 - 40]), [0, 1, 0], undefined, undefined, { len: 58, dia: 45, name: "Castor with brake" }),
      ],
    },
    {
      title: "Click the two back castors in",
      detail: "The same way at the back.",
      fix: [
        at("stud", [-1, 1].map((sx): Vec3 => [sx * (W / 2 - 9), y0, -D / 2 + 40]), [0, 1, 0], undefined, undefined, { len: 40, dia: 8, name: "Castor pin" }),
        at("castor", [-1, 1].map((sx): Vec3 => [sx * (W / 2 - 9), y0, -D / 2 + 40]), [0, 1, 0], undefined, undefined, { len: 58, dia: 45 }),
      ],
    },
    {
      title: "Screw two cam bolts into each small drawer front",
      detail: "Stand the unit up. Lay the three fronts face down on the rug; the bolts go near the ends.",
      fix: each(small, (i) => [at("camScrew", [[s0 + 6, box[i].ym, dz1], [s1 - 6, box[i].ym, dz1]], [0, 0, 1], `DF${i}`, undefined, CAM_BOLT)]),
      pose: "+y",
      tools: ["screwdriver"],
      warnings: ["floor"],
    },
    {
      title: "Stand the drawer sides on the fronts",
      detail: "A dowel in the front end of each side first, then press it into the front.",
      add: small.flatMap((i) => [`DL${i}`, `DR${i}`]),
      fix: each(small, (i) => [at("dowel", [[s0 + 6, box[i].by1 - 20, dz1]], [0, 0, 1], `DL${i}`, `DF${i}`, DOWEL), at("dowel", [[s1 - 6, box[i].by1 - 20, dz1]], [0, 0, 1], `DR${i}`, `DF${i}`, DOWEL)]),
      tools: ["hammer"],
    },
    {
      title: "Turn the cam locks in the drawer sides",
      detail: "Clockwise until each side pulls tight against its front.",
      fix: each(small, (i) => [at("cam", [[s0 + 12, box[i].ym, dz1 - 34]], [-1, 0, 0], `DL${i}`, undefined, CAM), at("cam", [[s1 - 12, box[i].ym, dz1 - 34]], [1, 0, 0], `DR${i}`, undefined, CAM)]),
      tools: ["screwdriver"],
    },
    { title: "Slide the bottoms into the grooves", detail: "Turn each drawer over first. White side up, all the way to the front.", add: small.map((i) => `DT${i}`) },
    {
      title: "Knock the backs on",
      detail: "The back sits on the end of the bottom. Two push-in fasteners through the sides into each back.",
      add: small.map((i) => `DB${i}`),
      fix: each(small, (i) => [at("nail", [[s0, box[i].ym, dz0 + 6]], [1, 0, 0], `DL${i}`, `DB${i}`, PUSH), at("nail", [[s1, box[i].ym, dz0 + 6]], [-1, 0, 0], `DR${i}`, `DB${i}`, PUSH)]),
      tools: ["hammer"],
    },
    { title: "Clip the inner runners onto the drawers", detail: "One along the bottom edge of each side, wheel at the back.", fix: each(small, (i) => [-1, 1].map((sx) => at("runner", [[sx < 0 ? s0 : s1, box[i].rail, 0]], [sx, 0, 0], sx < 0 ? `DL${i}` : `DR${i}`, undefined, RUNNER))) },
    { title: "Screw the runners to the drawer sides", detail: "Two runner screws in each.", fix: each(small, (i) => [-1, 1].map((sx) => at("screw", [[sx < 0 ? s0 : s1, box[i].rail, -120], [sx < 0 ? s0 : s1, box[i].rail, 150]], [sx, 0, 0], sx < 0 ? `DL${i}` : `DR${i}`, undefined, RAIL_SCREW))), tools: ["screwdriver"] },
    { title: "Slide the three drawers in", detail: "Set the drawer's runners on the ones in the unit, tilt the front down a little and push it in until it drops into place." },
    {
      title: "Screw four cam bolts into the file drawer front",
      detail: "Face down on the rug.",
      fix: [at("camScrew", [[s0 + 6, 130], [s0 + 6, 250], [s1 - 6, 130], [s1 - 6, 250]].map(([x, y]): Vec3 => [x, y, dz1]), [0, 0, 1], "DF3", undefined, CAM_BOLT)],
      tools: ["screwdriver"],
      warnings: ["floor"],
    },
    {
      title: "Stand the file drawer's sides on the front",
      detail: "Two dowels in the end of each side first.",
      add: ["DL3", "DR3"],
      fix: [at("dowel", [[s0 + 6, 100, dz1], [s0 + 6, 280, dz1]], [0, 0, 1], "DL3", "DF3", DOWEL), at("dowel", [[s1 - 6, 100, dz1], [s1 - 6, 280, dz1]], [0, 0, 1], "DR3", "DF3", DOWEL)],
      tools: ["hammer"],
    },
    { title: "Turn the four cam locks", fix: [at("cam", [[s0 + 12, 130, dz1 - 34], [s0 + 12, 250, dz1 - 34]], [-1, 0, 0], "DL3", undefined, CAM), at("cam", [[s1 - 12, 130, dz1 - 34], [s1 - 12, 250, dz1 - 34]], [1, 0, 0], "DR3", undefined, CAM)], tools: ["screwdriver"] },
    {
      title: "Slide the bottom in and knock the back on",
      detail: "Bottom into the grooves, then the back over its end with four push-in fasteners through the sides.",
      add: ["DT3", "DB3"],
      fix: [at("nail", [[s0, 130, dz0 + 6], [s0, 250, dz0 + 6]], [1, 0, 0], "DL3", "DB3", PUSH), at("nail", [[s1, 130, dz0 + 6], [s1, 250, dz0 + 6]], [-1, 0, 0], "DR3", "DB3", PUSH)],
      tools: ["hammer"],
    },
    {
      title: "Screw the castor bracket under the front",
      detail: "Turn the drawer upside down. Two screws into the front, one into the bottom.",
      fix: [
        at("plate", [[0, 62, zf - 30]], [0, 1, 0], "DF3", undefined, { len: 50, dia: 30, name: "Castor bracket" }),
        at("screw", [[-25, 62, zf - 9], [25, 62, zf - 9]], [0, 1, 0], "DF3", undefined, { len: 14, dia: 5 }),
        at("screw", [[0, 76, zf - 45]], [0, 1, 0], "DT3", undefined, { len: 16, dia: 4 }),
      ],
      pose: "-y",
      tools: ["screwdriver"],
    },
    { title: "Click the last castor onto the bracket", detail: "Press it onto the bracket's pin until it clicks.", fix: [at("castor", [[0, 62, zf - 30]], [0, 1, 0], "DF3", undefined, { len: 58, dia: 45 })] },
    {
      title: "Screw the drop-file runners to the drawer",
      detail: "Stand it up. The inner parts along the top of the sides, three small screws in each.",
      fix: [
        ...[-1, 1].map((sx) => at("runner", [[sx < 0 ? s0 : s1, fileRail, 0]], [sx, 0, 0], sx < 0 ? "DL3" : "DR3", undefined, { len: 420, dia: 30, name: "Drop-file runner" })),
        ...[-1, 1].map((sx) => at("screw", [-150, 0, 150].map((z): Vec3 => [sx < 0 ? s0 : s1, fileRail, z]), [sx, 0, 0], sx < 0 ? "DL3" : "DR3", undefined, { len: 12, dia: 4 })),
      ],
      pose: "+y",
      tools: ["screwdriver"],
    },
    { title: "Push the four frame holders into the sides", detail: "Two near the top edge of each side.", fix: [at("clip", [-1, 1].flatMap((sx) => [-150, 150].map((z): Vec3 => [sx < 0 ? s0 + 12 : s1 - 12, box[3].by1 - 10, z])), [0, 0, 1], undefined, undefined, { len: 25, dia: 12, name: "Frame holder" })] },
    { title: "Hang the two file frames in", detail: "Snap each wire frame into a holder on both sides.", fix: [at("hook", [-150, 150].map((z): Vec3 => [0, box[3].by1 + 10, z]), [0, -1, 0], "DT3", undefined, { len: 250, dia: 20, name: "File frame" })] },
    { title: "Slide the file drawer in", detail: "Set it on the runners and push it in. To take it out, pull it all the way and lift the catches on the runners." },
  ];
  return finish({ parts, steps });
}

/** Parts that first show up holding their dowels or bolts are listed on the last step too, so none is added twice. */
function finish(c: CustomParams): CustomParams {
  const added = new Set(c.steps.flatMap((st) => st.add ?? []));
  const rest = c.parts.filter((p) => !added.has(p.id)).map((p) => p.id);
  const last = c.steps[c.steps.length - 1];
  last.add = [...(last.add ?? []), ...rest];
  return c;
}

function recipe(s: ProductSpec): CustomParams | null {
  const v = s.variant.toLowerCase();
  if (/^desk/.test(v) && (s.size.w < 80 || s.size.w > 130)) return desk(s);
  if (/drawer unit with drop-file/.test(v)) return drawerUnit(s);
  return null;
}

const family: Family = { names: ["MICKE"], recipe };
export default family;
