import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, HwKind, PartPiece, Vec3 } from "../../types";

/**
 * SPIKSMED, read from IKEA's manuals for the 59.5x96 cabinet and the 117x32 media shelf.
 *
 * Cabinet: cam bolts go into the sides and dowels into the top, the fixed shelf and the bottom; door tracks press
 * into the fixed shelf and the bottom, and two wall brackets are screwed under the fixed shelf. With one side on
 * the floor the three panels are locked on one by one, the two sliding doors (a guide screwed on top of each) go
 * into their tracks, and the other side closes it. Upside down, the two back halves slide down the grooves and are
 * held by rivets and clips, nail-on glides go under the sides, then the shelf pins, the shelf and the wall screws.
 * Media shelf: tracks into the top and bottom, wall hangers and cam bolts on the panels, built upside down on the
 * top panel (an end, the divider, the bottom, the door with its guide, the other end), then hung on four screws,
 * the hangers adjusted and covered. The sideboard (drawers, a divider, 52 steps) keeps its old guide for now.
 */

const pt = (x: number, y: number, z: number): Vec3 => [x, y, z];
const fx = (kind: HwKind, at: Vec3[], dir: Vec3, o: Partial<CustomFix> = {}): CustomFix => ({ kind, count: at.length, at, dir, ...o });
const S = [-1, 1];
const T = 16; // panels
const CAM_A = { name: "Cam lock" };
const CAM_B = { name: "Cam lock (small)", len: 11, dia: 12 };

/* ---------------------------------------------------------------- cabinet */

function cabinetRecipe(): CustomParams {
  const W = 595, H = 960, D = 320;
  const xi = W / 2 - T; // inside face of the sides
  const zb = -D / 2 + 14; // the back sits in a groove this far in
  const pd = D / 2 - (zb + 2); // depth of the panels in front of the back
  const pz = (D / 2 + zb + 2) / 2;
  const yBot = 20, yFix = 744, yTop = H - T; // bottoms of the bottom, fixed shelf and top
  const TR = 8; // tracks
  const zDoor = [D / 2 - 20, D / 2 - 45]; // front and back track
  const dy0 = yBot + T + TR, dy1 = yFix - TR;
  const dw = 2 * xi / 2 + 15;
  const panel = (id: string, name: string, y: number): CustomPart => ({ id, name, size: [2 * xi, T, pd], pos: [0, y + T / 2, pz], material: "board" });
  const parts: CustomPart[] = [
    ...S.map((sx, i): CustomPart => ({ id: `P${i}`, name: "Side", size: [T, H, D], pos: [sx * (W / 2 - T / 2), H / 2, 0], material: "board" })),
    panel("TP", "Top", yTop),
    panel("FS", "Fixed shelf", yFix),
    panel("BT", "Bottom", yBot),
    ...zDoor.flatMap((z, k) => [
      { id: `TB${k}`, name: "Door track", size: [2 * xi, TR, 12], pos: [0, yBot + T + TR / 2, z], material: "metal" } as CustomPart,
      { id: `TF${k}`, name: "Door track", size: [2 * xi, TR, 12], pos: [0, yFix - TR / 2, z], material: "metal" } as CustomPart,
    ]),
    { id: "DB", name: "Sliding door", size: [dw, dy1 - dy0, T], pos: [-xi + dw / 2, (dy0 + dy1) / 2, zDoor[1]], material: "board" },
    { id: "DF", name: "Sliding door", size: [dw, dy1 - dy0, T], pos: [xi - dw / 2, (dy0 + dy1) / 2, zDoor[0]], material: "board" },
    ...S.map((sx, i): CustomPart => ({ id: `B${i}`, name: "Back half", size: [xi, H - 8, 4], pos: [sx * (xi / 2), H / 2, zb], material: "fiber" })),
    { id: "SH", name: "Shelf", size: [2 * xi - 2, T, 240], pos: [0, 400, zb + 2 + 120], material: "board" },
  ];
  const ends = (id: string, y: number) => S.map((sx) => fx("dowel", [-110, 110].map((z) => pt(sx * xi, y + T / 2, z)), [-sx, 0, 0], { on: id, len: 24, dia: 8 }));
  const camBolts = (i: number) => {
    const sx = i ? 1 : -1;
    return fx("camScrew", [yTop, yFix, yBot].flatMap((y) => [-100, 60].map((z) => pt(sx * xi, y + T / 2, z))), [sx, 0, 0], { on: `P${i}` });
  };
  // cam locks from the hidden face of each panel: under the top, on top of the fixed shelf and the bottom
  const locks = (sx: number, id: string, y: number, up: boolean): CustomFix =>
    fx("cam", [-100, 60].map((z) => pt(sx * (xi - 34), up ? y : y + T, z)), [0, up ? 1 : -1, 0], { on: id, ...CAM_A });
  const steps: CustomStep[] = [
    {
      title: "Screw the cam bolts into a side",
      detail: "Lay both sides on a rug, inside up. Six cam bolts in each, screwed in by hand until they stop. The second side goes on later.",
      add: ["P0"],
      fix: [camBolts(0)],
      tools: ["screwdriver"],
      pose: "+x",
      warnings: ["floor"],
    },
    {
      title: "Tap dowels into the top, the fixed shelf and the bottom",
      detail: "Two in each end of all three panels.",
      add: ["TP", "FS", "BT"],
      fix: [...ends("TP", yTop), ...ends("FS", yFix), ...ends("BT", yBot)],
      tools: ["hammer"],
    },
    {
      title: "Press the door tracks into place",
      detail: "Two tracks along the top of the bottom panel, two under the fixed shelf, pushed into the grooves along their whole length.",
      add: ["TB0", "TB1", "TF0", "TF1"],
    },
    {
      title: "Screw two wall brackets under the fixed shelf",
      detail: "At the back, one near each end, each with a screw and a washer. They fix the cabinet to the wall at the end.",
      fix: [
        fx("angle", S.map((sx) => pt(sx * (xi - 60), yFix, zb + 20)), [0, 1, 0], { name: "Wall bracket", len: 50, dia: 24, on: "FS", twist: Math.PI }),
        fx("washer", S.map((sx) => pt(sx * (xi - 60), yFix - 2, zb + 30)), [0, 1, 0], { on: "FS" }),
        fx("screw", S.map((sx) => pt(sx * (xi - 60), yFix - 3, zb + 30)), [0, 1, 0], { len: 16, dia: 4, on: "FS" }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Lock the top to the side",
      detail: "Its dowels into the side lying on the rug. Two cam locks, arrow towards the bolt, then turn clockwise.",
      fix: [locks(-1, "TP", yTop, true)],
      tools: ["screwdriver"],
    },
    {
      title: "Lock the fixed shelf to the side",
      detail: "Tracks facing down, towards the bottom. Two cam locks.",
      fix: [locks(-1, "FS", yFix, false)],
      tools: ["screwdriver"],
    },
    {
      title: "Lock the bottom to the side",
      detail: "Tracks facing up. Two cam locks.",
      fix: [locks(-1, "BT", yBot, false)],
      tools: ["screwdriver"],
    },
    {
      title: "Screw a guide onto the top of each door",
      detail: "Two screws each, on the top edge, so the door runs in the upper track.",
      fix: [
        fx("clip", [pt(-xi + dw / 2, dy1, zDoor[1]), pt(xi - dw / 2, dy1, zDoor[0])], [0, -1, 0], { name: "Door guide", len: 20, dia: 14, on: "DB" }),
        fx("screw", [-12, 12].flatMap((d) => [pt(-xi + dw / 2 + d, dy1, zDoor[1]), pt(xi - dw / 2 + d, dy1, zDoor[0])]), [0, -1, 0], { len: 12, dia: 3.5 }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Slide the doors into the tracks",
      detail: "From the open side: the back door in the back tracks, the front door in the front ones.",
      add: ["DB", "DF"],
      from: { DB: [600, 0, 0], DF: [600, 0, 0] },
    },
    {
      title: "Lock on the other side",
      detail: "Its cam bolts screwed in first, then press it onto the dowels and turn six cam locks.",
      add: ["P1"],
      fix: [camBolts(1), locks(1, "TP", yTop, true), locks(1, "FS", yFix, false), locks(1, "BT", yBot, false)],
      tools: ["screwdriver"],
    },
    {
      title: "Stand it upside down and slide in the back",
      detail: "Two halves, each down its groove until it reaches the top.",
      add: ["B0", "B1"],
      pose: "-y",
      from: { B0: [0, -900, 0], B1: [0, -900, 0] },
    },
    {
      title: "Fix the back to the fixed shelf",
      detail: "Three plastic rivets through the back into the shelf's back edge: push the sleeve in, then the pin.",
      fix: [
        fx("clip", [-180, 0, 180].map((x) => pt(x, yFix + T / 2, zb - 2)), [0, 0, 1], { name: "Rivet sleeve", len: 14, dia: 8 }),
        fx("clip", [-180, 0, 180].map((x) => pt(x, yFix + T / 2, zb - 3)), [0, 0, 1], { name: "Rivet pin", len: 16, dia: 10 }),
      ],
    },
    {
      title: "Clip the back to the sides",
      detail: "Eight clips along the inside of the sides, each clip with its wedge pushed in behind it.",
      fix: [
        fx("clip", S.flatMap((sx) => [200, 450, 650, 850].map((y) => pt(sx * xi, y, zb + 6))), [0, 0, -1], { name: "Back clip", len: 14, dia: 12 }),
        fx("clip", S.flatMap((sx) => [200, 450, 650, 850].map((y) => pt(sx * (xi - 8), y, zb + 6))), [0, 0, -1], { name: "Clip wedge", len: 10, dia: 8 }),
      ],
    },
    {
      title: "Knock a glide under each corner",
      detail: "Four nail-on glides into the bottom edges of the sides.",
      fix: [fx("glide", S.flatMap((sx) => [-130, 130].map((z) => pt(sx * (W / 2 - T / 2), 0, z))), [0, 1, 0], { name: "Nail-on glide", len: 6, dia: 16 })],
      tools: ["hammer"],
    },
    {
      title: "Turn it over and stick on the cap",
      detail: "Stand it up the right way. Peel the backing off the round cap and press it onto its mark on the top.",
      fix: [fx("cap", [pt(-W / 2 + W / 3, H, 60)], [0, -1, 0], { name: "Cover cap", len: 3, dia: 30 })],
      pose: "+y",
    },
    {
      title: "Push in the shelf pins",
      detail: "Four, at the same height on both sides, behind the doors.",
      fix: S.map((sx) => fx("pin", [-80, 60].map((z) => pt(sx * xi, 400 - T / 2 - 4, z)), [sx, 0, 0])),
    },
    { title: "Lay the shelf on the pins", detail: "Slide one door across to reach in.", add: ["SH"] },
    {
      title: "Fix it to the wall",
      detail: "Screw the two brackets under the fixed shelf to the wall, with a washer under each screw. Wall plugs and screws aren't included: pick ones made for your wall.",
      fix: [
        fx("plug", S.map((sx) => pt(sx * (xi - 60), yFix - 25, -D / 2 - 30)), [0, 0, -1]),
        fx("washer", S.map((sx) => pt(sx * (xi - 60), yFix - 25, -D / 2 + 1)), [0, 0, -1], { included: true }),
        fx("screw", S.map((sx) => pt(sx * (xi - 60), yFix - 25, -D / 2 + 2)), [0, 0, -1], { len: 50, dia: 5 }),
      ],
      tools: ["drill", "screwdriver", "pencil"],
      wall: true,
      warnings: ["wall", "tip"],
    },
  ];
  return { parts, steps };
}

/* ---------------------------------------------------------------- media shelf */

function mediaRecipe(): CustomParams {
  const W = 1170, H = 160, D = 320;
  const xi = W / 2 - T;
  const yTop = H - T;
  const cut = 300; // the cable cut-out in the back edge of the top and bottom, each side of the middle
  const cutD = 40;
  const longPieces: PartPiece[] = [
    { shape: "box", size: [2 * xi, T, D - cutD], pos: [0, 0, cutD / 2] },
    ...S.map((sx): PartPiece => ({ shape: "box", size: [xi - cut, T, cutD], pos: [sx * (cut + (xi - cut) / 2), 0, -D / 2 + cutD / 2] })),
  ];
  const TR = 4;
  const zT = D / 2 - 20;
  const dz = zT;
  const dW = xi - 4;
  const dy0 = T + TR, dy1 = yTop - TR;
  const parts: CustomPart[] = [
    { id: "TP", name: "Top", size: [2 * xi, T, D], pos: [0, yTop + T / 2, 0], pieces: longPieces, material: "board" },
    { id: "BT", name: "Bottom", size: [2 * xi, T, D], pos: [0, T / 2, 0], pieces: longPieces, material: "board" },
    { id: "TT", name: "Door track", size: [2 * xi, TR, 12], pos: [0, yTop - TR / 2, zT], material: "metal" },
    { id: "TB", name: "Door track", size: [2 * xi, TR, 12], pos: [0, T + TR / 2, zT], material: "metal" },
    ...S.map((sx, i): CustomPart => ({ id: `E${i}`, name: "End panel", size: [T, H, D], pos: [sx * (W / 2 - T / 2), H / 2, 0], material: "board" })),
    { id: "DV", name: "Divider", size: [T, yTop - T, D - 60], pos: [0, H / 2, -30], material: "board" },
    { id: "DR", name: "Sliding door", size: [dW, dy1 - dy0, T], pos: [-xi + dW / 2, (dy0 + dy1) / 2, dz], material: "board" },
  ];
  const zh = -D / 2 + cutD + 20; // the hangers sit just in front of the back edge
  const midH = S.map((sx) => pt(sx * 40, yTop, zh));
  const endH = S.map((sx) => pt(sx * xi, H / 2 + 20, zh));
  const steps: CustomStep[] = [
    {
      title: "Press the door tracks into the top and bottom",
      detail: "Lay both long panels on a rug, grooves up, and press a track into each groove along its whole length.",
      add: ["TP", "TB", "BT", "TT"],
      pose: "-y",
      warnings: ["floor"],
    },
    {
      title: "Screw two wall hangers to the top",
      detail: "Either side of the middle, two screws each, the plate standing up at the back edge. Clip a keyhole plate into each.",
      fix: [
        fx("angle", midH, [0, 1, 0], { name: "Wall hanger", len: 50, dia: 50, on: "TP", twist: Math.PI }),
        fx("screw", midH.flatMap((p) => [-12, 12].map((d) => pt(p[0] + d, yTop, p[2] + 18))), [0, 1, 0], { len: 12, dia: 4, on: "TP" }),
        fx("clip", midH.map((p) => pt(p[0], yTop - 30, p[2] - 18)), [0, 0, 1], { name: "Keyhole plate", len: 4, dia: 30 }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Tap dowels into the ends of the top and bottom",
      detail: "Two in each end, eight in all.",
      fix: [
        ...S.map((sx) => fx("dowel", [-100, 100].map((z) => pt(sx * xi, yTop + T / 2, z)), [-sx, 0, 0], { on: "TP", len: 24, dia: 8 })),
        ...S.map((sx) => fx("dowel", [-100, 100].map((z) => pt(sx * xi, T / 2, z)), [-sx, 0, 0], { on: "BT", len: 24, dia: 8 })),
      ],
      tools: ["hammer"],
    },
    {
      title: "Screw in the cam bolts for the divider",
      detail: "Two in the middle of the top and two in the middle of the bottom.",
      fix: [
        fx("camScrew", [-80, 80].map((z) => pt(0, yTop, z - 30)), [0, 1, 0], { on: "TP" }),
        fx("camScrew", [-80, 80].map((z) => pt(0, T, z - 30)), [0, -1, 0], { on: "BT" }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Screw a wall hanger to each end panel",
      detail: "On the inside face near the back, two screws each, and a keyhole plate clipped in.",
      add: ["E0", "E1"],
      fix: [
        ...S.map((sx, i) => fx("angle", [endH[i]], [sx, 0, 0], { name: "Wall hanger", len: 50, dia: 50, on: `E${i}`, twist: Math.PI / 2 })),
        ...S.map((sx, i) => fx("screw", [-14, 14].map((d) => pt(sx * xi, endH[i][1] + d, zh + 18)), [sx, 0, 0], { len: 12, dia: 4, on: `E${i}` })),
        fx("clip", endH.map((p) => pt(p[0] - Math.sign(p[0]) * 30, p[1], p[2] - 18)), [0, 0, 1], { name: "Keyhole plate", len: 4, dia: 30 }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Screw cam bolts into the end panels",
      detail: "Four in each, two at the top and two at the bottom.",
      fix: S.map((sx, i) => fx("camScrew", [yTop + T / 2, T / 2].flatMap((y) => [-60, 60].map((z) => pt(sx * xi, y, z))), [sx, 0, 0], { on: `E${i}` })),
      tools: ["screwdriver"],
    },
    {
      title: "Push an end panel onto the top",
      detail: "The top lies upside down on the rug, tracks up. Press the end panel onto its dowels.",
    },
    {
      title: "Lock the end panel to the top",
      detail: "Two cam locks, arrow towards the bolt, then turn clockwise.",
      fix: [fx("cam", [-60, 60].map((z) => pt(-xi + 34, yTop, z)), [0, 1, 0], { on: "TP", ...CAM_A })],
      tools: ["screwdriver"],
    },
    {
      title: "Stand the divider on the top",
      detail: "Four dowels in its ends first, two in each, then press it onto the cam bolts in the middle.",
      add: ["DV"],
      fix: [
        fx("dowel", [-130, 70].map((z) => pt(0, yTop, z)), [0, -1, 0], { on: "DV", len: 24, dia: 8 }),
        fx("dowel", [-130, 70].map((z) => pt(0, T, z)), [0, 1, 0], { on: "DV", len: 24, dia: 8 }),
      ],
      tools: ["hammer"],
    },
    {
      title: "Lock the divider to the top",
      detail: "Two small cam locks in the divider's side.",
      fix: [fx("cam", [-80, 80].map((z) => pt(-T / 2, yTop - 30, z - 30)), [1, 0, 0], { on: "DV", ...CAM_B })],
      tools: ["screwdriver"],
    },
    {
      title: "Lower the bottom onto it",
      detail: "Its dowels and cam bolts into the end panel and the divider.",
    },
    {
      title: "Lock the bottom",
      detail: "Two cam locks in the bottom by the end panel, two small ones in the divider.",
      fix: [
        fx("cam", [-60, 60].map((z) => pt(-xi + 34, T, z)), [0, -1, 0], { on: "BT", ...CAM_A }),
        fx("cam", [-80, 80].map((z) => pt(-T / 2, T + 30, z - 30)), [1, 0, 0], { on: "DV", ...CAM_B }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: "Fit the guide on the door",
      detail: "Hook it over the top edge of the door, in the middle.",
      fix: [fx("clip", [pt(-xi + dW / 2, dy1, dz)], [0, -1, 0], { name: "Door guide", len: 20, dia: 14, on: "DR" })],
    },
    {
      title: "Screw the guide down",
      detail: "Two short screws.",
      fix: [fx("screw", [-12, 12].map((d) => pt(-xi + dW / 2 + d, dy1, dz)), [0, -1, 0], { len: 10, dia: 3.5 })],
      tools: ["screwdriver"],
    },
    {
      title: "Slide the door into the tracks",
      detail: "From the open end, guide in the upper track.",
      add: ["DR"],
      from: { DR: [900, 0, 0] },
    },
    {
      title: "Push on the other end panel",
      detail: "Onto the dowels in the top and the bottom.",
    },
    {
      title: "Lock it and turn the shelf over",
      detail: "Four cam locks. Then turn it the right way up.",
      fix: [fx("cam", [yTop, T].flatMap((y) => [-60, 60].map((z) => pt(xi - 34, y, z))), [0, 1, 0], CAM_A)].flatMap((f) =>
        [true, false].map((top) => ({ ...f, at: f.at!.filter((p) => (p[1] > H / 2) === top), count: 2, dir: [0, top ? 1 : -1, 0] as Vec3 })),
      ),
      tools: ["screwdriver"],
      pose: "+y",
    },
    {
      title: "Mark the four screw holes on the wall",
      detail: "Tape the drilling template to the wall, level it, and mark through the four crosses.",
      tools: ["level", "pencil", "tape"],
      wall: true,
    },
    {
      title: "Put in the four wall screws",
      detail: "Drill, plug and screw them in, leaving the heads standing out a few millimetres. Wall plugs and screws aren't included: pick ones made for your wall.",
      fix: [
        fx("plug", [...midH, ...endH.map((p) => pt(p[0] - Math.sign(p[0]) * 30, p[1], p[2]))].map((p) => pt(p[0], H - 40, -D / 2 - 30)), [0, 0, -1]),
        fx("screw", [...midH, ...endH.map((p) => pt(p[0] - Math.sign(p[0]) * 30, p[1], p[2]))].map((p) => pt(p[0], H - 40, -D / 2 - 4)), [0, 0, -1], { len: 50, dia: 5 }),
      ],
      tools: ["drill", "screwdriver"],
      wall: true,
    },
    {
      title: "Hang the shelf on the screws",
      detail: "Lift it together and lower the four hangers onto the screw heads.",
      people: 2,
      warnings: ["two", "wall"],
    },
    {
      title: "Adjust the hangers",
      detail: "Turn the screws in the hangers to pull it tight against the wall and to level it.",
      tools: ["screwdriver", "level"],
      check: "square",
    },
    {
      title: "Snap on the hanger covers",
      detail: "One over each of the four hangers.",
      fix: [
        fx("cap", midH.map((p) => pt(p[0], yTop - 30, p[2] + 30)), [0, 0, -1], { name: "Hanger cover", len: 4, dia: 50 }),
        fx("cap", endH.map((p) => pt(p[0] - Math.sign(p[0]) * 30, p[1], p[2] + 30)), [0, 0, -1], { name: "Hanger cover", len: 4, dia: 50 }),
      ],
    },
  ];
  return { parts, steps };
}

const family: Family = {
  names: ["SPIKSMED"],
  recipe(s) {
    const slug = s.slug ?? "";
    if (slug === "spiksmed-cabinet-59-5-x-96") return cabinetRecipe();
    if (slug === "spiksmed-media-shelf-117-x-32") return mediaRecipe();
    return null;
  },
};
export default family;
