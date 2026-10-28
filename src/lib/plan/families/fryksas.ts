import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";

/**
 * FRYKSÅS, read from its manuals. Handwoven rattan over bent frames, joined with machine screws and an Allen key.
 * The armchair and the footstool are built upside down: a rattan shell on a rug, two bent leg frames screwed under
 * it with washers, two cross rails bolted between the frames with sleeve bolts, everything tightened at the end.
 * The storage unit on castors is built on its side: shelves screwed to one side frame, the other side frame lowered
 * on, the woven basket slid in, and the castors pushed in two at a time with it upside down.
 * The desk is built on its side too: the two halves of the back screen joined, stood on one side frame with the
 * desk top, the other side frame laid on, bolted, then stood up and the top bolted to both sides.
 * The cabinet and the TV bench are chipboard builds with their own long manuals and keep their old guides.
 */

type Kind = CustomFix["kind"];
const PI = Math.PI;
const fx = (kind: Kind, at: Vec3[], dir: Vec3, o: Partial<CustomFix> = {}): CustomFix => ({ kind, count: at.length, at, dir, ...o });
const r1 = (n: number) => Math.round(n * 10) / 10;

// a round tube as a piece: along y unless turned
const tubeY = (dia: number, len: number, pos: Vec3): PartPiece => ({ shape: "cyl", size: [dia, len, dia], pos });
const tubeX = (dia: number, len: number, pos: Vec3): PartPiece => ({ shape: "cyl", size: [dia, len, dia], pos, rot: [0, 0, PI / 2] });
const tubeZ = (dia: number, len: number, pos: Vec3): PartPiece => ({ shape: "cyl", size: [dia, len, dia], pos, rot: [PI / 2, 0, 0] });

/** A part drawn as pieces placed in product coordinates: works out its box and moves the pieces relative to it. */
function built(id: string, name: string, pieces: PartPiece[], material: CustomPart["material"], lo?: Vec3, hi?: Vec3): CustomPart {
  const ext = (p: PartPiece): [Vec3, Vec3] => {
    let s: Vec3 = p.size;
    if (p.shape === "cyl" && p.rot) s = p.rot[2] ? [p.size[1], p.size[0], p.size[2]] : p.rot[0] ? [p.size[0], p.size[2], p.size[1]] : s;
    return [p.pos.map((v, i) => v - s[i] / 2) as Vec3, p.pos.map((v, i) => v + s[i] / 2) as Vec3];
  };
  const boxes = pieces.map(ext);
  const L = lo ?? ([0, 1, 2].map((i) => Math.min(...boxes.map((b) => b[0][i]))) as Vec3);
  const H = hi ?? ([0, 1, 2].map((i) => Math.max(...boxes.map((b) => b[1][i]))) as Vec3);
  const mid = L.map((v, i) => r1((v + H[i]) / 2)) as Vec3;
  return {
    id,
    name,
    size: L.map((v, i) => r1(H[i] - v)) as Vec3,
    pos: mid,
    material,
    pieces: pieces.map((p) => ({ ...p, pos: p.pos.map((v, i) => r1(v - mid[i])) as Vec3 })),
  };
}

/* ---------- armchair and footstool ---------- */

const LEG = 22; // white steel tube
const SCREW = { len: 20, dia: 6 }; // through the leg frame plate into the shell
const SLEEVE = { name: "Sleeve bolt", len: 45, dia: 8 };
const WASHER = { len: 2, dia: 14 };

interface Seat {
  id: string;
  W: number;
  D: number;
  z0: number; // centre, front to back
  seatY: number; // top of the seat
  chair: boolean;
}

/** The rattan shell: a dished seat, and on the chair a tall back and the arms rolled up out of it. */
function shell(o: Seat): CustomPart {
  const { W, D, z0, seatY } = o;
  const t = 30;
  const p: PartPiece[] = [];
  if (o.chair) {
    p.push({ shape: "box", size: [W - 330, t, 520], pos: [0, seatY - t / 2, z0 + 80] });
    p.push({ shape: "box", size: [W - 190, 30, 70], pos: [0, seatY - 40, z0 + 360], rot: [0.5, 0, 0] }); // the rolled front lip
    // the back curves round the sitter: a middle panel and two wings turned forward
    p.push({ shape: "box", size: [W - 420, 520, t], pos: [0, seatY + 230, z0 - 320], rot: [-0.3, 0, 0] });
    for (const sx of [-1, 1]) p.push({ shape: "box", size: [260, 460, t], pos: [sx * (W / 2 - 160), seatY + 200, z0 - 250], rot: [-0.25, -sx * 0.7, 0] });
    for (const sx of [-1, 1]) p.push({ shape: "box", size: [50, 130, 520], pos: [sx * (W / 2 - 60), seatY + 60, z0 + 60], rot: [0, 0, sx * 0.2] });
  } else {
    p.push({ shape: "box", size: [W - 40, t, D - 40], pos: [0, seatY - t / 2, z0] });
    for (const sz of [-1, 1]) p.push({ shape: "box", size: [W - 40, 60, 40], pos: [0, seatY + 5, z0 + sz * (D / 2 - 20)] });
    for (const sx of [-1, 1]) p.push({ shape: "box", size: [40, 50, D - 80], pos: [sx * (W / 2 - 20), seatY, z0] });
  }
  return built(o.id, o.chair ? "Seat shell" : "Footstool shell", p, "wood");
}

/** One bent leg frame: a top bar under the shell and a leg down from each end. */
function legFrame(id: string, x: number, yTop: number, zf: number, zb: number): CustomPart {
  const yb = yTop - LEG / 2;
  return built(id, "Leg frame", [tubeZ(LEG, zf - zb + LEG, [x, yb, (zf + zb) / 2]), tubeY(LEG, yb, [x, yb / 2, zf]), tubeY(LEG, yb, [x, yb / 2, zb])], "metal");
}

function seatRecipe(o: Seat, cushion: boolean) {
  const { id, z0, seatY } = o;
  const xl = o.chair ? 240 : o.W / 2 - 70;
  const zf = z0 + (o.chair ? 250 : o.D / 2 - 60), zb = z0 - (o.chair ? 290 : o.D / 2 - 60);
  const yTop = seatY - 30;
  const yRail = 110;
  const parts: CustomPart[] = [shell(o), legFrame(`${id}L`, -xl, yTop, zf, zb), legFrame(`${id}R`, xl, yTop, zf, zb)];
  const railLen = 2 * xl - LEG;
  parts.push({ id: `${id}F`, name: "Cross rail", size: [railLen, LEG, LEG], pos: [0, yRail, zf], shape: "cyl", material: "metal" });
  parts.push({ id: `${id}B`, name: "Cross rail", size: [railLen, LEG, LEG], pos: [0, yRail, zb], shape: "cyl", material: "metal" });
  if (cushion) parts.push({ id: `${id}C`, name: o.chair ? "Seat cushion" : "Footstool cushion", size: o.chair ? [500, 40, 440] : [o.W - 140, 40, o.D - 120], pos: [0, seatY + 20, z0 + (o.chair ? 70 : 0)], material: "soft" });

  // two screws with washers through each frame's top bar into the shell
  const zs = [zf - 90, zb + 90];
  const frameFix = (side: "L" | "R") => {
    const x = side === "L" ? -xl : xl;
    const at = zs.map((z) => [x, yTop - LEG, z] as Vec3);
    return [fx("washer", at, [0, 1, 0], { ...WASHER, on: `${id}${side}` }), fx("screw", at, [0, 1, 0], { ...SCREW, on: `${id}${side}`, mate: id })];
  };
  const railFix = (rail: "F" | "B") => {
    const z = rail === "F" ? zf : zb;
    return [fx("bolt", [[-xl - LEG / 2, yRail, z]], [1, 0, 0], { ...SLEEVE, on: `${id}L`, mate: `${id}${rail}` }), fx("bolt", [[xl + LEG / 2, yRail, z]], [-1, 0, 0], { ...SLEEVE, on: `${id}R`, mate: `${id}${rail}` })];
  };
  const what = o.chair ? "seat shell" : "footstool";
  const steps: CustomStep[] = [
    {
      title: o.chair ? "Lay the seat shell upside down on a rug" : "Lay the footstool shell upside down on a rug",
      detail: o.chair ? "The back points away from you. The two leg frames are a pair: check the plates face the shell before you start." : "Check which way is the front first: it is the longer edge, as the drawing shows.",
      add: [id],
      pose: "-y",
      warnings: ["floor"],
    },
    {
      title: "Screw on a leg frame",
      detail: "Its plates sit flat on the shell. A washer under each screw head, turned in loosely for now.",
      add: [`${id}L`],
      fix: frameFix("L"),
      tools: ["allen"],
    },
    { title: "Screw on the other leg frame", detail: "The same way: two screws and two washers, loose.", add: [`${id}R`], fix: frameFix("R"), tools: ["allen"] },
    {
      title: "Bolt in a cross rail",
      detail: "It goes between the two front legs. A sleeve bolt through each leg into the rail end, loose.",
      add: [`${id}F`],
      fix: railFix("F"),
      tools: ["allen"],
    },
    { title: "Bolt in the other cross rail", detail: "Between the back legs, with two more sleeve bolts.", add: [`${id}B`], fix: railFix("B"), tools: ["allen"] },
    {
      title: "Tighten everything",
      detail: `All four screws under the ${what} and all four sleeve bolts, now that every part is in.`,
      tools: ["allen"],
    },
    { title: o.chair ? "Turn the chair over" : "Turn the footstool over", detail: "Stand it on its feet and check it doesn't rock.", pose: "+y" },
  ];
  if (cushion) steps.push({ title: o.chair ? "Lay the cushion on the seat" : "Lay the cushion on the footstool", detail: "Ties or straps at the back, round the frame.", add: [`${id}C`] });
  return { parts, steps };
}

// IKEA's own measures: the armchair 89 x 84 x 85, seat height 37; the footstool goes in front of it
const CHAIR = { W: 890, D: 850, seatY: 370 };
const STOOL = { W: 600, D: 460, H: 400 };

function armchair(s: ProductSpec): CustomParams {
  const slug = s.slug ?? "";
  const foot = /footstool/.test(slug) || !!s.sofa?.foot;
  const cushion = /cushion|footstool/.test(slug);
  const zc = foot ? -(STOOL.D + 200) / 2 : 0;
  const a = seatRecipe({ id: "S", W: CHAIR.W, D: CHAIR.D, z0: zc, seatY: CHAIR.seatY, chair: true }, cushion);
  if (!foot) return a;
  const f = seatRecipe({ id: "T", W: STOOL.W, D: STOOL.D, z0: zc + CHAIR.D / 2 + 200 + STOOL.D / 2, seatY: STOOL.H, chair: false }, cushion);
  f.steps[0].title = "Build the footstool the same way: lay its shell upside down";
  return { parts: [...a.parts, ...f.parts], steps: [...a.steps, ...f.steps] };
}

/* ---------- storage unit on castors ---------- */

function storage(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const T = 24; // rattan-wrapped tube
  const yc = 80; // the frames start above the castors
  const xs = W / 2 - T / 2, zs = D / 2 - T / 2;
  const yTop = H - T / 2;
  const yWeave = 300; // woven up to here, spindles above
  const side = (id: string, sx: number) => {
    const x = sx * xs;
    const p: PartPiece[] = [
      tubeY(T, yTop - yc, [x, (yTop + yc) / 2, -zs]),
      tubeY(T, yTop - yc, [x, (yTop + yc) / 2, zs]),
      tubeZ(T, 2 * zs, [x, yTop, 0]),
      { shape: "box", size: [8, yWeave - yc - 20, 2 * zs - T], pos: [x, (yWeave + yc) / 2, 0] },
      tubeZ(14, 2 * zs - T, [x, yWeave, 0]),
    ];
    for (let i = 1; i <= 7; i++) p.push(tubeY(8, yTop - yWeave - 20, [x, (yTop + yWeave) / 2, -zs + (2 * zs * i) / 8]));
    return built(id, "Side frame", p, "wood", [x - T / 2, yc, -D / 2], [x + T / 2, H, D / 2]);
  };
  const st = 18;
  const iw = W - 2 * T;
  const yShelf = [Math.round(H * 0.6), Math.round(H * 0.84)];
  const parts: CustomPart[] = [side("L", -1), side("R", 1)];
  yShelf.forEach((y, i) => parts.push({ id: `S${i}`, name: "Shelf", size: [iw, st, D - 2 * T], pos: [0, y, 0], material: "wood" }));
  const yb = yc + 40;
  parts.push(
    built(
      "K",
      "Woven basket",
      [
        { shape: "box", size: [iw, 16, D - 2 * T], pos: [0, yb, 0] },
        { shape: "box", size: [iw, yShelf[0] - st / 2 - yb - 8, 14], pos: [0, (yShelf[0] - st / 2 + yb + 8) / 2, -D / 2 + T + 7] },
      ],
      "wood",
    ),
  );
  const shelfScrews = (i: number, sx: number) => fx("screw", [-1, 1].map((sz) => [sx * (W / 2), yShelf[i], sz * (D / 2 - 90)] as Vec3), [-sx, 0, 0], { len: 30, dia: 4, on: sx < 0 ? "L" : "R", mate: `S${i}` });
  const castor = (sz: number) => [-1, 1].map((sx) => fx("castor", [[sx * xs, yc, sz * zs]], [0, 1, 0], { on: sx < 0 ? "L" : "R" }));
  const steps: CustomStep[] = [
    {
      title: "Lay a side frame on the rug and screw a shelf to it",
      detail: "The frame lies flat with its holes up. Two screws through the frame into the shelf end.",
      add: ["L", "S0"],
      fix: [shelfScrews(0, -1)],
      pose: "+x",
      tools: ["allen"],
      warnings: ["floor"],
    },
    { title: "Screw the other shelf on", detail: "The same way, two screws, at the upper holes.", add: ["S1"], fix: [shelfScrews(1, -1)], tools: ["allen"] },
    {
      title: "Lower the other side frame on",
      detail: "Handles at the same end as the first frame. Four screws, two into each shelf.",
      add: ["R"],
      fix: [shelfScrews(0, 1), shelfScrews(1, 1)],
      tools: ["allen"],
    },
    {
      title: "Slide in the woven basket",
      detail: "Its tall side goes to the back. Four screws through its frame into the side frame.",
      add: ["K"],
      fix: [fx("screw", [[xs + T / 2, yb, -D / 4], [xs + T / 2, yb, D / 4], [xs + T / 2, yShelf[0] - 60, -D / 2 + T + 7], [xs + T / 2, yb + 80, -D / 2 + T + 7]], [-1, 0, 0], { len: 30, dia: 4, on: "R", mate: "K" })],
      tools: ["allen"],
    },
    {
      title: "Turn it upside down and push in two castors",
      detail: "Two of the same kind at one end. Push each one into its leg until it clicks.",
      fix: castor(1),
      pose: "-y",
    },
    { title: "Push in the other two castors", detail: "Then turn it the right way up onto its wheels.", fix: castor(-1) },
    { title: "Stand it on its wheels", detail: "Check all four turn freely.", pose: "+y" },
  ];
  return { parts, steps };
}

/* ---------- desk ---------- */

function desk(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, D = s.size.d * 10;
  const H = 1050; // the screen stands above the top: IKEA's total height
  const yTop = 760; // top of the desk top
  const T = 25;
  const yBack = 420; // the back screen starts here
  const ySide = 380;
  const xs = W / 2 - T / 2, zs = D / 2 - T / 2;
  const yHi = H - T / 2;
  const sideFrame = (id: string, sx: number) => {
    const x = sx * xs;
    const p: PartPiece[] = [tubeY(T, yHi, [x, yHi / 2, -zs]), tubeY(T, yHi, [x, yHi / 2, zs]), tubeZ(T, 2 * zs, [x, yHi, 0]), tubeZ(T - 5, 2 * zs, [x, ySide, 0])];
    for (let i = 1; i <= 9; i++) p.push(tubeY(8, yHi - ySide, [x, (yHi + ySide) / 2, -zs + (2 * zs * i) / 10]));
    for (const y of [ySide + 150, yHi - 160]) p.push(tubeZ(8, 2 * zs, [x, y, 0]));
    return built(id, "Side frame", p, "wood", [x - T / 2, 0, -D / 2], [x + T / 2, H, D / 2]);
  };
  const backHalf = (id: string, sx: number) => {
    const x0 = sx * T, x1 = sx * (W / 2 - T); // from the join to the side frame
    const xm = (x0 + x1) / 2, len = Math.abs(x1 - x0);
    const z = -zs;
    const xe = sx * (T / 2);
    const p: PartPiece[] = [tubeX(T, len, [xm, yHi, z]), tubeX(T - 5, len, [xm, yBack, z]), tubeY(T, yHi - yBack, [xe, (yHi + yBack) / 2, z])];
    for (let i = 1; i <= 9; i++) p.push(tubeY(8, yHi - yBack, [x0 + ((x1 - x0) * i) / 10, (yHi + yBack) / 2, z]));
    for (const y of [yBack + 150, yHi - 160]) p.push(tubeX(8, len, [xm, y, z]));
    return built(id, sx < 0 ? "Back screen, left" : "Back screen, right", p, "wood", [Math.min(0, x1), yBack - T / 2, -D / 2], [Math.max(0, x1), H, -D / 2 + T]);
  };
  const tt = 22;
  const parts: CustomPart[] = [
    backHalf("BL", -1),
    backHalf("BR", 1),
    sideFrame("L", -1),
    sideFrame("R", 1),
    { id: "P", name: "Desk top", size: [W - 2 * T, tt, D - T], pos: [0, yTop - tt / 2, T / 2], material: "wood" },
  ];
  const bolt = (on: string, mate: string, pts: Vec3[], dir: Vec3, o: Partial<CustomFix> = {}) => fx("bolt", pts, dir, { len: 30, dia: 6, on, mate, ...o });
  const xL = -W / 2, xR = W / 2;
  const steps: CustomStep[] = [
    {
      title: "Join the two halves of the back screen",
      detail: "Lay them flat on a rug and push the two connectors into the tube ends, then slide the halves together.",
      add: ["BL", "BR"],
      fix: [fx("connector", [[0, yHi, -zs], [0, yBack, -zs]], [1, 0, 0], { name: "Tube connector", len: 60, dia: 18, on: "BL", mate: "BR" })],
      pose: "-z",
      warnings: ["floor"],
    },
    {
      title: "Screw the threaded pins into a side frame",
      detail: "Two pins, into the holes in its back post, with a screwdriver until they stop.",
      add: ["L"],
      fix: [fx("stud", [[xL + T, yHi - 120, -zs], [xL + T, yBack + 80, -zs]], [-1, 0, 0], { name: "Threaded pin", len: 40, dia: 8, on: "L" })],
      tools: ["screwdriver"],
      pose: "+x",
    },
    {
      title: "Stand the back screen on the side frame",
      detail: "The side frame lies on the rug. Lower the back so its tube ends drop over the pins.",
    },
    {
      title: "Lower the desk top in",
      detail: "Its edge sits against the back screen, the holes over the pins in the side frame.",
      add: ["P"],
    },
    {
      title: "Bolt the side frame on together",
      detail: "One of you holds it all steady while the other turns in three bolts with the Allen key.",
      fix: [bolt("L", "BL", [[xL, yHi - 60, -zs], [xL, yBack + 40, -zs]], [1, 0, 0]), bolt("L", "P", [[xL, yTop - tt / 2, 0]], [1, 0, 0])],
      tools: ["allen"],
      people: 2,
      warnings: ["two"],
    },
    {
      title: "Lay the other side frame on",
      detail: "Straight down onto the ends of the back screen and the desk top.",
      add: ["R"],
    },
    {
      title: "Bolt it to the back screen",
      detail: "Two short bolts with washers, top and bottom.",
      fix: [bolt("R", "BR", [[xR, yHi - 60, -zs], [xR, yBack + 40, -zs]], [-1, 0, 0], { len: 16 })],
      tools: ["allen"],
    },
    {
      title: "Turn it over and bolt the first side the same way",
      detail: "Two more short bolts into the back screen.",
      fix: [bolt("L", "BL", [[xL, yHi - 200, -zs], [xL, yBack + 160, -zs]], [1, 0, 0], { len: 16 })],
      pose: "-x",
      tools: ["allen"],
    },
    {
      title: "Stand it up and bolt the top to the sides",
      detail: "Drop a barrel nut into each end of the desk top, slot up, then a long bolt through each side frame into it.",
      fix: [
        fx("nut", [[xL + T + 40, yTop, D / 4], [xR - T - 40, yTop, D / 4]], [0, -1, 0], { name: "Barrel nut", len: 18, dia: 10, on: "P" }),
        bolt("L", "P", [[xL, yTop - tt / 2, D / 4]], [1, 0, 0], { len: 70 }),
        bolt("R", "P", [[xR, yTop - tt / 2, D / 4]], [-1, 0, 0], { len: 70 }),
      ],
      pose: "+y",
      tools: ["allen", "screwdriver"],
    },
  ];
  return { parts, steps };
}

const family: Family = {
  names: ["FRYKSÅS", "FRYKSAS"],
  recipe(s) {
    const slug = s.slug ?? "";
    if (/armchair|footstool/.test(slug)) return armchair(s);
    if (/storage-unit-on-castors/.test(slug)) return storage(s);
    if (/desk/.test(slug)) return desk(s);
    return null;
  },
};
export default family;
