import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";

/*
 * SUNDVIK children's furniture, read from IKEA's manuals.
 *
 * Table: four rails take a corner bracket each and are screwed into a frame, the frame is screwed to the top lying
 * face down, and each leg gets a barrel nut and a threaded rod that bolts through its bracket with a washer and nut.
 * Chair: two ready-made side frames (legs and rails in one). Built on its side: the backrest on dowels and the two
 * cross rails go into one side, the other side goes on top, three long screws each side, and the seat is screwed on
 * from below with the chair upside down.
 * Rocking chair: the back (three slats between two rails) is doweled together, stood into a side frame lying on the
 * floor with the seat, then the other side goes on and three bolts with barrel nuts lock each side.
 * Cot (UK) and crib (US): dowels in the slatted sides, bolts and barrel nuts through one end, then on its end for the
 * other one; the base rests on four supports at the height for the baby's age, and four stops are screwed on.
 */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const spread = (a: number, c: number, n: number) => range(n).map((i) => (n === 1 ? (a + c) / 2 : a + ((c - a) * i) / (n - 1)));
const box = (size: Vec3, pos: Vec3, rot?: Vec3): PartPiece => ({ shape: "box", size, pos, ...(rot ? { rot } : {}) });

/* ---------- children's table ---------- */

function table(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, D = s.size.d * 10, H = s.size.h * 10;
  const TT = 20, LG = 40, RT = 18, RH = 60, OV = 30;
  const fx = W / 2 - OV, fz = D / 2 - OV; // outside of the frame
  const ry = H - TT - RH / 2;
  const lx = fx - RT - LG / 2, lz = fz - RT - LG / 2;
  const parts: CustomPart[] = [
    { id: "T", name: "Table top", size: [W, TT, D], pos: [0, H - TT / 2, 0], material: "wood" },
    { id: "R0", name: "Long rail", size: [2 * fx, RH, RT], pos: [0, ry, -fz + RT / 2], material: "wood" },
    { id: "R1", name: "Long rail", size: [2 * fx, RH, RT], pos: [0, ry, fz - RT / 2], material: "wood" },
    { id: "R2", name: "Short rail", size: [RT, RH, 2 * fz - 2 * RT], pos: [-fx + RT / 2, ry, 0], material: "wood" },
    { id: "R3", name: "Short rail", size: [RT, RH, 2 * fz - 2 * RT], pos: [fx - RT / 2, ry, 0], material: "wood" },
    ...[-1, 1].flatMap((gx, i) => [-1, 1].map((gz, j): CustomPart => ({ id: `L${i}${j}`, name: "Leg", size: [LG, H - TT, LG], pos: [gx * lx, (H - TT) / 2, gz * lz], material: "wood" }))),
  ];
  const corners: [number, number][] = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  const cIn = (gx: number, gz: number, d = 0): Vec3 => [gx * (fx - RT - d), ry, gz * (fz - RT - d)];
  // each bracket spans the inside of a corner, screwed to both rails
  const bracketAt = corners.map(([gx, gz]): Vec3 => { const p = cIn(gx, gz, 30); return [p[0], ry - RH / 2 + 8, p[2]]; });
  const railScrews = (alongX: boolean): CustomFix[] =>
    corners.flatMap(([gx, gz]) =>
      [-12, 12].map((dy): CustomFix => {
        const at: Vec3 = alongX ? [gx * (fx - RT - 45), ry + dy, gz * (fz - RT)] : [gx * (fx - RT), ry + dy, gz * (fz - RT - 45)];
        return { kind: "screw", count: 1, len: 12, dia: 4, at: [at], dir: alongX ? [0, 0, gz] : [gx, 0, 0] };
      }),
    );
  const legs = ["L00", "L10", "L01", "L11"]; // in the same order as corners
  // the threaded rod goes into the leg's inside corner at 45 degrees and through its bracket
  const diag = (gx: number, gz: number): Vec3 => [gx * Math.SQRT1_2, 0, gz * Math.SQRT1_2];
  const inner = (gx: number, gz: number, d: number): Vec3 => [gx * (lx - LG / 2 - d), ry, gz * (lz - LG / 2 - d)];
  const perCorner = (kind: CustomFix["kind"], d: number, o: Partial<CustomFix>): CustomFix[] => corners.map(([gx, gz], i) => ({ kind, ...o, count: 1, at: [inner(gx, gz, d)], dir: diag(gx, gz), on: legs[i] }));
  const steps: CustomStep[] = [
    {
      title: "Screw a corner bracket onto each rail",
      detail: "Lay the four rails on a rug. One bracket at one end of each, two short screws, the bracket's hole facing in.",
      add: ["R0", "R1", "R2", "R3"],
      fix: [{ kind: "angle", name: "Corner bracket", count: 4, len: 40, dia: 30, at: bracketAt, dir: [0, 1, 0] }, ...railScrews(true)],
      pose: "-y",
      warnings: ["floor"],
    },
    { title: "Screw the rails together into a frame", detail: "Each bracket's free arm against the next rail, two short screws into it.", fix: railScrews(false), check: "square" },
    {
      title: "Screw the frame to the underside of the top",
      detail: "Lay the top face down on the rug, centre the frame on it and drive the eight long screws up through the rails.",
      add: ["T"],
      fix: [{ kind: "screw", count: 8, len: 50, dia: 4, at: [...[-1, 1].flatMap((gz) => [-0.5, 0.5].map((t): Vec3 => [t * fx, ry - RH / 2, gz * (fz - RT / 2)])), ...[-1, 1].flatMap((gx) => [-0.4, 0.4].map((t): Vec3 => [gx * (fx - RT / 2), ry - RH / 2, t * fz]))], dir: [0, 1, 0] }],
      from: { T: [0, -300, 0] },
    },
    {
      title: "Fit a barrel nut and a threaded rod to each leg",
      detail: "Push the barrel nut into the hole in the outside of the leg, slot facing the corner, then turn the rod into the inside corner until it stops.",
      fix: [
        ...corners.map(([gx, gz], i): CustomFix => ({ kind: "nut", name: "Barrel nut", count: 1, len: 20, dia: 10, at: [[gx * (lx + LG / 2), ry, gz * lz]], dir: [-gx, 0, 0], on: legs[i] })),
        ...perCorner("legScrew", 0, { name: "Threaded rod", len: 70, dia: 8 }),
      ],
    },
    {
      title: "Bolt the legs into the corners",
      detail: "Push each rod through its bracket, then a washer and a nut. Tighten with the spanner so the leg pulls tight into the corner.",
      add: legs,
      fix: [...perCorner("washer", 30, { dia: 16 }).map((f) => ({ ...f, on: undefined })), ...perCorner("nut", 32, { len: 6, dia: 8 }).map((f) => ({ ...f, on: undefined }))],
      tools: ["wrench"],
      from: Object.fromEntries(legs.map((k) => [k, [0, -300, 0] as Vec3])),
    },
    { title: "Turn the table over", detail: "Stand it on its legs and check it doesn't rock.", pose: "+y" },
  ];
  return { parts, steps };
}

/* ---------- children's chair ---------- */

function chair(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, D = s.size.d * 10, H = s.size.h * 10;
  const SH = (s.seat?.seatH ?? 29) * 10;
  const L = 30, ST = 20; // leg section, seat thickness
  const lx = W / 2 - L / 2, lz = D / 2 - L / 2;
  const fh = SH - ST; // front legs stop under the seat
  const railY = fh - 30;
  const side = (g: number): CustomPart => ({
    id: `F${g < 0 ? 0 : 1}`,
    name: "Side frame",
    size: [L, H, D],
    pos: [g * lx, H / 2, 0],
    material: "wood",
    pieces: [
      box([L, H, L], [0, 0, -lz]),
      box([L, fh, L], [0, fh / 2 - H / 2, lz]),
      box([L - 8, 50, D - 2 * L], [0, railY - H / 2, 0]),
      box([L - 8, 30, D - 2 * L], [0, 90 - H / 2, 0]),
    ],
  });
  const crossW = W - 2 * L;
  const backY = SH + (H - SH) * 0.62;
  const parts: CustomPart[] = [
    side(-1),
    side(1),
    { id: "B", name: "Backrest", size: [crossW, (H - SH) * 0.55, 18], pos: [0, backY, -lz], material: "wood" },
    { id: "C0", name: "Cross rail", size: [crossW, 50, 22], pos: [0, railY, -lz], material: "wood" },
    { id: "C1", name: "Cross rail", size: [crossW, 50, 22], pos: [0, railY, lz], material: "wood" },
    { id: "S", name: "Seat", size: [W, ST, D - L], pos: [0, SH - ST / 2, L / 2], material: "wood" },
  ];
  const sideScrews = (g: number): CustomFix => ({ kind: "screw", count: 3, len: 70, dia: 6, at: [[g * W / 2, backY, -lz], [g * W / 2, railY, -lz], [g * W / 2, railY, lz]], dir: [-g, 0, 0] });
  const steps: CustomStep[] = [
    {
      title: "Push the backrest into one side frame",
      detail: "Lay a side frame on a rug, inside up. Tap the dowels into the backrest's ends and press it into the top of the back leg.",
      add: ["F0", "B"],
      fix: [-1, 1].map((g): CustomFix => ({ kind: "dowel", count: 2, len: 30, dia: 8, at: [-30, 30].map((dy): Vec3 => [g * (crossW / 2), backY + dy, -lz]), dir: [g, 0, 0], on: "B" })),
      pose: "+x",
      warnings: ["floor"],
      tools: ["hammer"],
    },
    { title: "Stand the two cross rails in", detail: "One at the back and one at the front, on their dowels, holes facing out.", add: ["C0", "C1"], from: { C0: [-300, 0, 0], C1: [-300, 0, 0] } },
    { title: "Put the other side frame on top", detail: "Line it up over the backrest and both rails, then press it down.", add: ["F1"], from: { F1: [300, 0, 0] } },
    { title: "Screw this side on", detail: "Three long screws: one into the backrest and one into each rail.", fix: [sideScrews(1)], tools: ["allen"] },
    { title: "Turn it over and screw the other side", detail: "Three more long screws in the same places.", fix: [sideScrews(-1)], tools: ["allen"], pose: "-x" },
    {
      title: "Screw the seat on from underneath",
      detail: "Lay the seat face down and stand the chair upside down on it. Four screws up through the cross rails into the seat.",
      add: ["S"],
      fix: [{ kind: "screw", count: 4, len: 60, dia: 5, at: [-1, 1].flatMap((gz) => [-1, 1].map((gx): Vec3 => [gx * crossW * 0.3, railY - 25, gz * lz])), dir: [0, 1, 0] }],
      pose: "-y",
      tools: ["screwdriver"],
      from: { S: [0, -250, 0] },
    },
    { title: "Stand the chair up", detail: "Check it stands steady on all four legs.", pose: "+y" },
  ];
  return { parts, steps };
}

/* ---------- rocking chair ---------- */

function rocker(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, D = s.size.d * 10, H = s.size.h * 10;
  const SH = (s.sofa?.seatH ?? 29) * 10;
  const L = 32, AY = SH + 140; // leg section, armrest height
  const lx = W / 2 - L / 2;
  const legZ = [-120, 130]; // back and front legs
  // the rocker: a shallow arc under both legs
  const NA = 9, seg = D / NA + 6, sag = 70;
  const arcY = (z: number) => 20 + sag * (2 * z / D) ** 2;
  const arc: PartPiece[] = range(NA).map((i) => {
    const z = -D / 2 + (i + 0.5) * (D / NA);
    const slope = (2 * sag * 2 * z) / (D * D / 2);
    return box([L - 6, 28, seg], [0, arcY(z) - H / 2, z], [-Math.atan(slope), 0, 0]);
  });
  const side = (g: number): CustomPart => ({
    id: `F${g < 0 ? 0 : 1}`,
    name: "Side frame",
    size: [L, H, D],
    pos: [g * lx, H / 2, 0],
    material: "wood",
    pieces: [
      ...arc,
      box([L, H - 40, L], [0, 20, legZ[0]], [0.12, 0, 0]),
      box([L, AY - 40, L], [0, (AY - 40) / 2 + 40 - H / 2, legZ[1]]),
      box([L, 24, 330], [0, AY - H / 2, 40]),
      box([L - 8, 45, legZ[1] - legZ[0]], [0, SH - 40 - H / 2, (legZ[0] + legZ[1]) / 2]),
    ],
  });
  const cw = W - 2 * L;
  const zb = legZ[0] - 20; // the back leans a little
  const parts: CustomPart[] = [
    { id: "T", name: "Back top rail", size: [cw, 80, 22], pos: [0, H - 60, zb - 40], material: "wood", rot: [0.12, 0, 0] },
    { id: "U", name: "Back bottom rail", size: [cw, 40, 22], pos: [0, SH + 60, zb + 5], material: "wood", rot: [0.12, 0, 0] },
    ...spread(-cw / 3, cw / 3, 3).map((x, i): CustomPart => ({ id: `B${i}`, name: "Back slat", size: [45, H - 100 - SH - 80, 15], pos: [x, (H - 100 + SH + 80) / 2, zb - 20], material: "wood", rot: [0.12, 0, 0] })),
    side(-1),
    side(1),
    { id: "S", name: "Seat", size: [cw, 20, 280], pos: [0, SH - 10, 20], material: "wood" },
  ];
  const slats = ["B0", "B1", "B2"];
  const bolts = (g: number): CustomFix[] => [
    { kind: "bolt", count: 3, len: 70, dia: 6, at: [[g * W / 2, H - 60, zb - 40], [g * W / 2, SH + 60, zb + 5], [g * W / 2, SH - 10, 120]], dir: [-g, 0, 0] },
    { kind: "nut", name: "Barrel nut", count: 3, len: 14, dia: 10, at: [[g * (cw / 2 - 30), H - 60 + 40, zb - 40], [g * (cw / 2 - 30), SH + 60 + 20, zb + 5], [g * (cw / 2 - 30), SH, 120]], dir: [0, -1, 0] },
  ];
  const steps: CustomStep[] = [
    {
      title: "Dowel the back slats between the back rails",
      detail: "On a rug. Short dowels in both ends of the three slats, then press the two rails on.",
      add: ["T", "U", ...slats],
      fix: [{ kind: "dowel", count: 6, len: 30, dia: 8, to: slats }],
      pose: "+z",
      warnings: ["floor"],
      tools: ["hammer"],
    },
    { title: "Tap the long dowels into the ends of the back rails", detail: "Two in each end of the back.", fix: [-1, 1].map((g): CustomFix => ({ kind: "dowel", count: 2, len: 40, dia: 8, at: [[g * cw / 2, H - 60, zb - 40], [g * cw / 2, SH + 60, zb + 5]], dir: [g, 0, 0], on: "T" })), tools: ["hammer"] },
    { title: "Stand the back into a side frame", detail: "Lay one side frame on the rug, inside up, and press the back's dowels into its holes.", add: ["F0"], pose: "+x", from: { F0: [-300, 0, 0] } },
    { title: "Put the seat in", detail: "Long dowels in both ends of the seat first, then press it into the side frame.", add: ["S"], fix: [-1, 1].map((g): CustomFix => ({ kind: "dowel", count: 2, len: 40, dia: 8, at: [-60, 100].map((z): Vec3 => [g * cw / 2, SH - 10, z]), dir: [g, 0, 0], on: "S" })), tools: ["hammer"] },
    { title: "Put the other side frame on and bolt it", detail: "Line it up over all the dowels. Barrel nuts into the holes on the inside, then three bolts through the side.", add: ["F1"], fix: bolts(1), tools: ["allen"], from: { F1: [300, 0, 0] } },
    { title: "Turn it over and bolt the first side", detail: "Three more barrel nuts and bolts. Tighten all six firmly.", fix: bolts(-1), tools: ["allen"], pose: "-x" },
    { title: "Stand it on its rockers", detail: "Check it rocks evenly and the bolts are tight.", pose: "+y" },
  ];
  return { parts, steps };
}

/* ---------- cot and crib ---------- */

function cot(s: ProductSpec, crib: boolean): CustomParams {
  // IKEA's own sizes: the cot is 145 x 76 x 85 cm, the crib 138 x 76 x 88; length runs left to right
  const ml = (s.bed?.mattressL ?? 140) * 10, mw = (s.bed?.mattressW ?? 70) * 10;
  const L = ml + (crib ? 60 : 50), W = mw + 60, H = crib ? 880 : 850;
  const P = 45; // corner posts
  const px = L / 2 - P / 2, pz = W / 2 - P / 2;
  const sideLen = L - 2 * P;
  const topY = H - 50, botY = 240;
  const end = (g: number): CustomPart => ({
    id: `E${g < 0 ? 0 : 1}`,
    name: "End panel",
    size: [P, H, W],
    pos: [g * px, H / 2, 0],
    material: "wood",
    pieces: [
      box([P, H, P], [0, 0, -pz]),
      box([P, H, P], [0, 0, pz]),
      box([30, 70, W - 2 * P], [0, H / 2 - 35, 0]),
      box([30, 70, W - 2 * P], [0, botY - H / 2, 0]),
      { shape: "box", size: [14, H - 70 - botY - 35, W - 2 * P], pos: [0, (H - 70 + botY + 35) / 2 - H / 2, 0], material: "board" },
    ],
  });
  const nSlat = Math.round(sideLen / 70);
  const sidePieces: PartPiece[] = [
    box([sideLen, 40, 30], [0, topY, 0]),
    box([sideLen, 40, 30], [0, botY, 0]),
    ...spread(-sideLen / 2 + 50, sideLen / 2 - 50, nSlat).map((x) => box([22, topY - botY - 40, 20], [x, (topY + botY) / 2, 0])),
  ];
  const sideOf = (g: number): CustomPart => ({ id: `S${g < 0 ? 0 : 1}`, name: "Cot side", size: [sideLen, topY - botY + 40, 30], pos: [0, (topY + botY) / 2, g * pz], material: "wood", pieces: sidePieces.map((p) => ({ ...p, pos: [p.pos[0], p.pos[1] - (topY + botY) / 2, p.pos[2]] as Vec3 })) });
  const baseY = 430; // the upper height, for a newborn
  const nb = 9;
  const base: CustomPart = {
    id: "B",
    name: "Cot base",
    size: [sideLen - 10, 40, W - 2 * P - 10],
    pos: [0, baseY, 0],
    material: "wood",
    pieces: [
      box([sideLen - 10, 40, 30], [0, 0, -(W - 2 * P - 40) / 2]),
      box([sideLen - 10, 40, 30], [0, 0, (W - 2 * P - 40) / 2]),
      ...spread(-(sideLen - 100) / 2, (sideLen - 100) / 2, nb).map((x) => box([80, 14, W - 2 * P - 70], [x, 10, 0])),
    ],
  };
  const parts: CustomPart[] = [sideOf(-1), sideOf(1), end(-1), end(1), base, { id: "M", name: "Mattress", size: [ml, 100, mw], pos: [0, baseY + 20 + 50, 0], material: "soft", extra: true }];
  const sides = ["S0", "S1"];
  const endBolts = (g: number): CustomFix[] => [
    { kind: "bolt", count: 4, len: 80, dia: 6, at: [-1, 1].flatMap((gz) => [topY, botY].map((y): Vec3 => [g * L / 2, y, gz * pz])), dir: [-g, 0, 0] },
    { kind: "nut", name: "Barrel nut", count: 4, len: 14, dia: 10, at: [-1, 1].flatMap((gz) => [topY, botY].map((y): Vec3 => [g * (sideLen / 2 - 40), y - 20, gz * pz])), dir: [0, 1, 0] },
  ];
  const supportsFix: CustomFix[] = [-1, 1].map((g) => ({ kind: "pin", name: "Base support", count: 2, len: 40, dia: 8, at: [-1, 1].map((gz): Vec3 => [g * (L / 2 - P), baseY - 25, gz * (W / 2 - P - 80)]), dir: [g, 0, 0] }));
  const baseBolts: CustomFix = { kind: "bolt", count: 4, len: 30, dia: 6, at: [-1, 1].flatMap((g) => [-1, 1].map((gz): Vec3 => [g * (sideLen / 2 - 25), baseY + 20, gz * (W / 2 - P - 80)])), dir: [0, -1, 0] };
  const stopAt = (gz: number, d: number) => [-1, 1].map((g): Vec3 => [g * (sideLen / 2 - 30), botY - 40, gz * (pz + d)]);
  const stops: CustomFix[] = [-1, 1].flatMap((gz): CustomFix[] => [
    { kind: "clip", name: "Side stop", count: 2, len: 30, dia: 25, at: stopAt(gz, 15), dir: [0, 0, -gz] },
    { kind: "screw", count: 2, len: 14, dia: 4, at: stopAt(gz, 17), dir: [0, 0, -gz] },
  ]);
  const dowelFix: CustomFix[] = [-1, 1].map((g) => ({ kind: "dowel", count: 4, len: 40, dia: 8, at: [-1, 1].flatMap((gz) => [topY, botY].map((y): Vec3 => [g * sideLen / 2, y + 10, gz * pz])), dir: [-g, 0, 0] }));
  const steps: CustomStep[] = [
    { title: "Tap the dowels into the cot sides", detail: "Two in each end of both slatted sides.", add: sides, fix: dowelFix, tools: ["hammer"] },
    { title: "Bolt the sides to one end panel", detail: "One of you holds the sides up. Barrel nuts into the holes under the rails, slot toward the bolt, then four bolts through the end's posts.", add: ["E0"], fix: endBolts(-1), tools: ["allen"], people: 2, warnings: ["two"], from: { E0: [-300, 0, 0] } },
  ];
  const otherEnd: CustomStep = { title: "Stand it on that end and bolt on the other one", detail: "Lay the second end panel on top, push it onto the dowels, then barrel nuts and four bolts as before.", add: ["E1"], fix: endBolts(1), tools: ["allen"], pose: "+x", from: { E1: [300, 0, 0] } };
  if (crib) {
    steps.push(
      { title: "Screw the base supports into the base", detail: "One near each corner of the frame under the base.", fix: [baseBolts], tools: ["allen"] },
      { title: "Stand it on its end and slide the base in", detail: "Hook the base onto the supports at the height for your baby's age: the upper one for a newborn, the lower one once your child can sit or pull up.", add: ["B"], fix: supportsFix, pose: "+x", from: { B: [300, 0, 0] } },
      otherEnd,
    );
  } else {
    steps.push(
      otherEnd,
      { title: "Stand it up and push in the base supports", detail: "Into the holes inside both end panels: the upper holes for a newborn, the lower ones once your child can sit or pull up.", fix: supportsFix, pose: "+y" },
      { title: "Lay the base on the supports", detail: "Slats facing up. Check it sits flat on all four.", add: ["B"], from: { B: [0, 300, 0] } },
      { title: "Bolt the base to the supports", detail: "One short bolt down through each corner of the base.", fix: [baseBolts], tools: ["allen"] },
    );
  }
  steps.push({ title: "Screw on the four side stops", detail: "Outside the cot, under each end of the slatted sides. They keep the sides from lifting out.", fix: stops, tools: ["screwdriver"], pose: "+y" });
  steps.push({ title: "Lay the mattress in", detail: "It should fit snugly with no gap wider than two fingers at the sides.", add: ["M"] });
  return { parts, steps };
}


/* ---------- extendable bed ---------- */

function bed(s: ProductSpec): CustomParams {
  const mw = (s.bed?.mattressW ?? 80) * 10, ml = (s.bed?.mattressL ?? 200) * 10;
  // IKEA's sizes: 92 (80 cm mattress) or 108 (97 cm) wide, 7 cm longer than the mattress pulled all the way out
  const W = mw + (mw > 900 ? 110 : 120), L = ml + 70;
  const P = 45, HH = 810, FH = 660, T = 18;
  const B0 = 200, B1 = 330; // the side boards' bottom and top edge
  const zH = -L / 2 + P / 2, zF = L / 2 - P / 2;
  const zM = -L / 2 + P + 1100; // where the head half ends, at the middle legs
  const xS = W / 2 - T / 2, xF = W / 2 - T - T / 2, xM = W / 2 - 2 * T - P / 2, xL = xM - P / 2 - 15;
  const endOf = (id: string, name: string, h: number, z: number): CustomPart => ({
    id,
    name,
    size: [W, h, P],
    pos: [0, h / 2, z],
    material: "wood",
    pieces: [
      box([P, h, P], [-W / 2 + P / 2, 0, 0]),
      box([P, h, P], [W / 2 - P / 2, 0, 0]),
      box([W - 2 * P, 60, 30], [0, h / 2 - 30, 0]),
      box([W - 2 * P, 70, 30], [0, B1 + 60 - h / 2, 0]),
      { shape: "box", size: [W - 2 * P, h - 60 - B1 - 95, 14], pos: [0, (h - 60 + B1 + 95) / 2 - h / 2, 0], material: "board" },
    ],
  });
  const headLen = zM + L / 2 - P;
  const sideHead = (g: number): CustomPart => ({
    id: `H${g < 0 ? 0 : 1}`,
    name: "Head side board",
    size: [T, 470 - B0, headLen],
    pos: [g * xS, (470 + B0) / 2, -L / 2 + P + headLen / 2],
    material: "board",
    pieces: [box([T, B1 - B0, headLen], [0, (B1 + B0) / 2 - (470 + B0) / 2, 0]), box([T, 470 - B1, 360], [0, (470 + B1) / 2 - (470 + B0) / 2, -headLen / 2 + 180])],
  });
  const footLen = L / 2 - P - (zM - 300);
  const parts: CustomPart[] = [
    sideHead(-1),
    sideHead(1),
    ...[-1, 1].map((g, i): CustomPart => ({ id: `M${i}`, name: "Middle leg", size: [P, B1, P], pos: [g * xM, B1 / 2, zM - P / 2], material: "wood" })),
    endOf("E", "Headboard", HH, zH),
    ...[-1, 1].map((g, i): CustomPart => ({ id: `R${i}`, name: "Slat ledge", size: [25, 35, zM - P - (-L / 2 + P)], pos: [g * xL, 262, (zM - P + -L / 2 + P) / 2], material: "wood" })),
    { id: "C", name: "Cross board", size: [2 * (xM - P / 2), 100, T], pos: [0, 250, zM - P / 2], material: "board" },
    ...[-1, 1].map((g, i): CustomPart => ({ id: `F${i}`, name: "Foot side board", size: [T, B1 - B0, footLen], pos: [g * xF, (B0 + B1) / 2, L / 2 - P - footLen / 2], material: "board" })),
    endOf("G", "Footboard", FH, zF),
  ];
  const nS = 17, baseLen = L - 2 * P - 20;
  parts.push({
    id: "S",
    name: "Slatted base",
    size: [W - 2 * T - 30, 8, baseLen],
    pos: [0, 284, 0],
    material: "wood",
    pieces: [...spread(-baseLen / 2 + 35, baseLen / 2 - 35, nS).map((z) => box([W - 2 * T - 30, 8, 60], [0, 0, z])), { shape: "box", size: [30, 3, baseLen], pos: [-(W / 2 - 80), -5, 0], material: "fiber" }, { shape: "box", size: [30, 3, baseLen], pos: [W / 2 - 80, -5, 0], material: "fiber" }],
  });
  parts.push({ id: "X", name: "Mattress", size: [mw, 120, ml], pos: [0, 288 + 4 + 60, 0], material: "soft", extra: true });
  const sides = (f: (g: number) => Vec3[]) => [-1, 1].flatMap(f);
  // one fix per direction (and host), so each point goes in its own way
  const fx = (kind: CustomFix["kind"], pts: Vec3[], dir: (p: Vec3) => Vec3, o: Partial<CustomFix> = {}, on?: (p: Vec3) => string): CustomFix[] => {
    const key = (p: Vec3) => `${dir(p).join(",")}|${on?.(p) ?? ""}`;
    return [...new Set(pts.map(key))].map((k) => {
      const at = pts.filter((p) => key(p) === k);
      return { kind, ...o, count: at.length, at, dir: dir(at[0]), ...(on ? { on: on(at[0]) } : {}) };
    });
  };
  const sx = (p: Vec3): Vec3 => [Math.sign(p[0]), 0, 0];
  const nx = (p: Vec3): Vec3 => [-Math.sign(p[0]), 0, 0];
  const LONG = { len: 40, dia: 8 }, SHORT = { len: 30, dia: 8 }, BOLT = { len: 100, dia: 6 }, NUT = { name: "Barrel nut", len: 14, dia: 10 };
  const steps: CustomStep[] = [
    { title: "Tap the dowels into the head side boards", detail: "On a rug. Two of the long dowels in each end of both boards.", add: ["H0", "H1"], fix: [...fx("dowel", sides((g) => [[g * xS, 240, -L / 2 + P], [g * xS, 300, -L / 2 + P]]), () => [0, 0, -1], LONG), ...fx("dowel", sides((g) => [[g * xS, 240, zM], [g * xS, 300, zM]]), () => [0, 0, 1], LONG)], tools: ["hammer"], warnings: ["floor"] },
    { title: "Bolt a middle leg to the end of each side board", detail: "Barrel nut into the leg, slot toward the bolt, then one long bolt through the board.", add: ["M0", "M1"], fix: [...fx("nut", sides((g) => [[g * xM, B1, zM - P / 2]]), () => [0, -1, 0], NUT), ...fx("bolt", sides((g) => [[g * W / 2, 265, zM - P / 2]]), nx, BOLT)], tools: ["allen"] },
    { title: "Push the side boards onto the headboard", detail: "Stand the headboard up and press both boards onto its dowels, curved ends at the top.", add: ["E"], from: { E: [0, 0, -300] }, people: 2, warnings: ["two"] },
    { title: "Bolt the side boards to the headboard", detail: "Barrel nuts into the boards from the inside, then two long bolts through each post.", fix: [...fx("nut", sides((g) => [[g * (xS - T / 2), 240, -L / 2 + P + 40], [g * (xS - T / 2), 300, -L / 2 + P + 40]]), sx, NUT), ...fx("bolt", sides((g) => [[g * (W / 2 - P / 2), 240, -L / 2], [g * (W / 2 - P / 2), 300, -L / 2]]), () => [0, 0, 1], BOLT)], tools: ["allen"] },
    { title: "Tap the dowels into the slat ledges", detail: "Long dowels in one end of both ledges.", add: ["R0", "R1"], fix: fx("dowel", sides((g) => [[g * xL - 6, 262, -L / 2 + P], [g * xL + 6, 262, -L / 2 + P]]), () => [0, 0, -1], LONG), tools: ["hammer"] },
    { title: "Bolt the cross board to the other end of the ledges", detail: "Short dowels in the board first, then a barrel nut in each ledge and a long bolt through the board.", add: ["C"], fix: [...fx("dowel", sides((g) => [[g * (xM - P / 2), 230, zM - P / 2], [g * (xM - P / 2), 270, zM - P / 2]]), sx, SHORT), ...fx("nut", sides((g) => [[g * xL, 279, zM - P - 40]]), () => [0, -1, 0], NUT), ...fx("bolt", sides((g) => [[g * xL, 262, zM - P / 2 + T / 2]]), () => [0, 0, -1], BOLT)], tools: ["allen", "hammer"] },
    { title: "Turn the head end over and fit the ledges in", detail: "Upside down on the rug. The cross board goes between the middle legs on two long dowels.", fix: fx("dowel", sides((g) => [[g * (xM - P / 2), 250, zM - P / 2]]), sx, LONG, () => "C"), pose: "-y", warnings: ["floor"] },
    { title: "Bolt the middle legs to the cross board", detail: "Use the two silver barrel nuts here, one in each end of the cross board.", fix: [...fx("nut", sides((g) => [[g * (xM - P / 2 - 30), 300, zM - P / 2]]), () => [0, -1, 0], { ...NUT, dia: 12 }), ...fx("bolt", sides((g) => [[g * (xM + P / 2), 250, zM - P / 2]]), nx, BOLT)], tools: ["allen"] },
    { title: "Stand it up and bolt the ledges to the headboard", detail: "A barrel nut in each ledge, then a long bolt through the headboard's bottom rail.", fix: [...fx("nut", sides((g) => [[g * xL, 279, -L / 2 + P + 40]]), () => [0, -1, 0], NUT), ...fx("bolt", sides((g) => [[g * xL, 262, -L / 2]]), () => [0, 0, 1], BOLT)], pose: "+y", tools: ["allen"] },
    { title: "Slide the foot side boards in", detail: "Inside the head side boards. Pull them out to the length you want and lock each with two short bolts.", add: ["F0", "F1"], fix: fx("bolt", sides((g) => [[g * W / 2, 265, zM - 100], [g * W / 2, 265, zM - 240]]), nx, { len: 30, dia: 6 }), tools: ["allen"], from: { F0: [0, 0, 400], F1: [0, 0, 400] } },
    { title: "Tap a short dowel into each foot side board", detail: "In the free end, for the footboard.", fix: fx("dowel", sides((g) => [[g * xF, 265, L / 2 - P]]), () => [0, 0, 1], SHORT, (p) => (p[0] < 0 ? "F0" : "F1")), tools: ["hammer"] },
    { title: "Push the footboard on", detail: "Four long dowels in its posts first, then press it onto the side boards.", add: ["G"], fix: fx("dowel", sides((g) => [[g * xF, 225, L / 2 - P], [g * xF, 305, L / 2 - P]]), () => [0, 0, -1], LONG), from: { G: [0, 0, 300] }, tools: ["hammer"] },
    { title: "Bolt the footboard on", detail: "Barrel nuts into the side boards from the inside, then two long bolts through each post.", fix: [...fx("nut", sides((g) => [[g * (xF - T / 2), 225, L / 2 - P - 40], [g * (xF - T / 2), 305, L / 2 - P - 40]]), sx, NUT), ...fx("bolt", sides((g) => [[g * xF, 225, L / 2], [g * xF, 305, L / 2]]), () => [0, 0, -1], BOLT)], tools: ["allen"] },
    { title: "Tap in the four slat stops", detail: "Into the holes along the top of the foot side boards, with a hammer.", fix: fx("pin", sides((g) => [[g * xF, B1, zM - 280], [g * xF, B1, L / 2 - 150]]), () => [0, -1, 0], { name: "Slat stop", len: 25, dia: 10 }), tools: ["hammer"] },
    { title: "Lay the slatted base in", detail: "Unroll it along the ledges and push the straps at both ends over the stops, so it opens and closes with the bed.", add: ["S"], from: { S: [0, 300, 0] } },
    { title: "Lay the mattress on", detail: "Extend the bed when your child grows: move the short bolts to the next holes.", add: ["X"] },
  ];
  return { parts, steps };
}

function recipe(s: ProductSpec): CustomParams | null {
  const slug = s.slug ?? "";
  if (/children-s-table/.test(slug)) return table(s);
  if (/children-s-chair/.test(slug)) return chair(s);
  if (/rocking-chair/.test(slug)) return rocker(s);
  if (/sundvik-cot-/.test(slug)) return cot(s, false);
  if (/sundvik-crib-/.test(slug)) return cot(s, true);
  if (/extendable-bed|ext-bed-frame/.test(slug)) return bed(s);
  return null;
}

const family: Family = {
  names: ["SUNDVIK"],
  recipe,
};
export default family;
