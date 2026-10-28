import type { Family } from "./family";
import type { CustomFix, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";
import { HW, type HwDef, type PlanBuilder } from "../builder";
import { buildCustom } from "../custom";

/*
 * KLEPPSTAD, read from IKEA's manuals (the bed frame, and the wardrobes with 2 and 3 doors).
 * The bed is white steel: the headboard's fabric comes rolled on its top tube, two posts and a bottom bar are bolted
 * on with it lying flat, the footboard is a low bar on two legs, and the side rails bolt between them (two people for
 * the head end). A centre beam on two legs with floor discs goes down the middle, caps close the tube ends, slat stops
 * clip onto the rails, the padded cover pulls down over the headboard, and grip strips go on the rails and the beam
 * before the roll-out slatted base (sold separately).
 * The wardrobes are particleboard, built lying on their front: hinge plates go on the sides first, the top and bottom
 * take dowels and door stops, and long Allen screws pull the sides onto them. Two plinth rails slide in at the foot,
 * the hardboard back is nailed on, glides go under the sides, and it's stood up and fixed to the wall before the rail
 * and the doors go on. The 3-door wardrobe has a divider: two doors over the hanging side, one over three shelves.
 * The wardrobe with sliding doors has its own, quite different manual and keeps its old guide for now.
 */

const put = (b: PlanBuilder, def: HwDef, pts: Vec3[], dir: Vec3, on?: string, gap = 0.08) => b.fits(def, pts.map((at) => ({ at, dir, on, hole: false })), gap);
const custom = (b: PlanBuilder, s: ProductSpec, parts: CustomPart[], steps: CustomStep[]) => buildCustom(b, { ...s, custom: { parts, steps } });
const at = (kind: CustomFix["kind"], pts: Vec3[], dir: Vec3, o: Partial<CustomFix> = {}): CustomFix => ({ kind, count: pts.length, at: pts, dir, ...o });

/* ---------- the bed ---------- */

const STUD = { len: 40, dia: 8, name: "Allen bolt" };

function bed(b: PlanBuilder, s: ProductSpec) {
  const mW = (s.bed?.mattressW ?? Math.round(s.size.w - 6)) * 10;
  const mL0 = (s.bed?.mattressL ?? Math.round(s.size.d - 7)) * 10;
  const mL = mL0 === 2030 ? 2020 : mL0; // the US queen is a 152x202 mattress
  const W = mW + 60, L = mL + 70;
  const P = 32; // tube
  const xS = W / 2 - P / 2;
  const zH = -L / 2 + P / 2, zF = L / 2 - P / 2;
  const railY = 225, railH = 50;
  const parts: CustomPart[] = [
    { id: "HT", name: "Headboard top tube", size: [W, 50, 50], pos: [0, 835, zH], shape: "cyl", material: "metal" },
    { id: "HF", name: "Headboard fabric", size: [W - 80, 520, 6], pos: [0, 545, zH], material: "soft" },
    { id: "HB", name: "Headboard bottom bar", size: [W - 2 * P, 30, 20], pos: [0, 270, zH], material: "metal" },
    ...[-1, 1].map((sx) => ({ id: `HP${sx}`, name: "Headboard post", size: [P, 810, P] as Vec3, pos: [sx * xS, 405, zH] as Vec3, shape: "cyl" as const, material: "metal" as const })),
    { id: "FB", name: "Footboard bar", size: [W, P, P], pos: [0, 270 - P / 2, zF], shape: "cyl", material: "metal" },
    ...[-1, 1].map((sx) => ({ id: `FL${sx}`, name: "Footboard leg", size: [P, 270 - P, P] as Vec3, pos: [sx * xS, (270 - P) / 2, zF] as Vec3, shape: "cyl" as const, material: "metal" as const })),
    ...[-1, 1].map((sx) => ({ id: `SR${sx}`, name: "Side rail", size: [30, railH, L - 2 * P] as Vec3, pos: [sx * xS, railY, 0] as Vec3, material: "metal" as const })),
    { id: "CB", name: "Centre beam", size: [40, 40, L - 2 * P], pos: [0, 220, 0], material: "metal" },
    ...[-1, 1].map((sz) => ({ id: `CL${sz}`, name: "Centre leg", size: [25, 196, 25] as Vec3, pos: [0, 102, (sz * L) / 4] as Vec3, shape: "cyl" as const, material: "metal" as const })),
    { id: "CV", name: "Headboard cover", size: [W + 10, 595, 70], pos: [0, 562, zH], material: "soft" },
    { id: "SL", name: "Slatted bed base (sold separately)", size: [mW, 20, mL], pos: [0, 260, 0], material: "wood", extra: true },
  ];
  const yTop = railY + railH / 2;
  const steps: CustomStep[] = [
    {
      title: "Unroll the headboard fabric",
      detail: "Lay it on a rug, top tube at one end, and unroll the fabric with its bottom bar until it lies flat.",
      add: ["HT", "HF", "HB"],
      pose: "+z",
      warnings: ["floor"],
    },
    { title: "Turn the tube so the fabric lies flat", detail: "Twist the top tube until the holes in its ends face the same way as the holes in the fabric's edge.", pose: "+z" },
    { title: "Lay a post at each end", detail: "The holes near the top of each post line up with the tube's ends.", add: ["HP-1", "HP1"], pose: "+z" },
    { title: "Bolt the tube to the left post", detail: "A long Allen bolt through the end of the tube into the post. Tighten it by hand for now.", fix: [at("bolt", [[-xS, 810, zH]], [0, 1, 0], { ...STUD, on: "HP-1" })], tools: ["allen"], pose: "+z" },
    { title: "Bolt the tube to the right post", detail: "The same on the other end.", fix: [at("bolt", [[xS, 810, zH]], [0, 1, 0], { ...STUD, on: "HP1" })], tools: ["allen"], pose: "+z" },
    { title: "Turn the bottom bar", detail: "Twist it so its slot faces the posts and the fabric runs straight down to it.", pose: "+z" },
    {
      title: "Bolt the bottom bar to the left post",
      detail: "Screw the short bolt into the end of the bar, then press the bar into the slot in the post until it clicks.",
      fix: [at("bolt", [[-(W / 2 - P), 270, zH]], [-1, 0, 0], { len: 25, dia: 6, name: "Shoulder bolt" })],
      tools: ["allen"],
      pose: "+z",
    },
    {
      title: "Bolt the bottom bar to the right post",
      detail: "The same on the other side: bolt into the bar's end, then click the bar into the post.",
      fix: [at("bolt", [[W / 2 - P, 270, zH]], [1, 0, 0], { len: 25, dia: 6, name: "Shoulder bolt" })],
      tools: ["allen"],
      pose: "+z",
    },
    {
      title: "Screw a bolt into each post for the side rails",
      detail: "Prop the headboard up on a stack of books first so you can reach under it. The rails hang on these.",
      fix: [at("bolt", [-1, 1].map((sx) => [sx * xS, railY, zH + P / 2] as Vec3), [0, 0, -1], STUD)],
      tools: ["allen"],
      pose: "+z",
    },
    { title: "Bolt a leg to the footboard bar", detail: "Lay the bar on a rug. A long bolt through the end of the bar into the top of the leg.", add: ["FB", "FL-1"], fix: [at("bolt", [[-xS, 270 - P, zF]], [0, 1, 0], { ...STUD, on: "FL-1" })], tools: ["allen"], pose: "+y" },
    { title: "Bolt on the other footboard leg", detail: "The same on the other end.", add: ["FL1"], fix: [at("bolt", [[xS, 270 - P, zF]], [0, 1, 0], { ...STUD, on: "FL1" })], tools: ["allen"] },
    {
      title: "Bolt a side rail to the footboard",
      detail: "Stand the footboard up. Two bolts through the leg into the end of the rail.",
      add: ["SR-1"],
      fix: [at("bolt", [railY - 15, railY + 15].map((y) => [-xS, y, zF - P / 2] as Vec3), [0, 0, 1], STUD)],
      tools: ["allen"],
    },
    {
      title: "Bolt the other side rail to the footboard",
      detail: "The same on the other leg.",
      add: ["SR1"],
      fix: [at("bolt", [railY - 15, railY + 15].map((y) => [xS, y, zF - P / 2] as Vec3), [0, 0, 1], STUD)],
      tools: ["allen"],
    },
    {
      title: "Bolt the rails to the headboard",
      detail: "One of you holds the headboard up while the other hooks the rails onto the bolts in the posts, then adds two more bolts on each side.",
      fix: [at("bolt", [-1, 1].flatMap((sx) => [railY - 26, railY + 26].map((y) => [sx * xS, y, zH + P / 2] as Vec3)), [0, 0, 1], STUD)],
      tools: ["allen"],
      people: 2,
      warnings: ["two"],
    },
    {
      title: "Screw the legs to the centre beam",
      detail: "One screw down through the beam into each leg, with a floor disc under the leg.",
      add: ["CB", "CL-1", "CL1"],
      fix: [
        at("screw", [-1, 1].map((sz) => [0, 240, (sz * L) / 4] as Vec3), [0, -1, 0], { len: 40, dia: 6 }),
        at("glide", [-1, 1].map((sz) => [0, 0, (sz * L) / 4] as Vec3), [0, 1, 0], { len: 4, dia: 40, name: "Floor disc" }),
      ],
      tools: ["allen"],
    },
    {
      title: "Screw the centre beam into the frame",
      detail: "Its ends sit on the brackets at the head and the foot. Two screws at each end.",
      fix: [-1, 1].map((sz) => at("screw", [-12, 12].map((x) => [x, 220, sz * (L / 2 - P)] as Vec3), [0, 0, sz], { len: 12, dia: 6 })),
      tools: ["allen"],
    },
    { title: "Tighten all the bolts", detail: "Go round the four corners with the Allen key now that the frame stands square.", tools: ["allen"], check: "square" },
    {
      title: "Tap the caps into the tube ends",
      detail: "One into each open end of the top tube and the footboard bar. A rubber mallet or a hammer on a cloth.",
      fix: [
        at("cap", [[-W / 2, 835, zH], [-W / 2, 270 - P / 2, zF]], [1, 0, 0], { len: 6, dia: 30, name: "End cap" }),
        at("cap", [[W / 2, 835, zH], [W / 2, 270 - P / 2, zF]], [-1, 0, 0], { len: 6, dia: 30, name: "End cap" }),
      ],
      tools: ["hammer"],
    },
    { title: "Turn the top tube to tighten the fabric", detail: "Roll it backwards until the fabric is taut, then let it lock.", kind: "general" },
    {
      title: "Clip the slat stops onto the rails",
      detail: "Two at the head end and two at the foot end. They keep the slatted base from sliding.",
      fix: [at("clip", [-1, 1].flatMap((sx) => [-1, 1].map((sz) => [sx * (W / 2 - P - 4), yTop, sz * (L / 2 - 70)] as Vec3)), [0, -1, 0], { len: 30, dia: 20, name: "Slat stop" })],
    },
    { title: "Pull the cover down over the headboard", detail: "From the top, evenly on both sides, then close the zip along the bottom.", add: ["CV"] },
    {
      title: "Clip the cover to the posts",
      detail: "One clip at the bottom of each side holds the cover down.",
      fix: [at("clip", [-1, 1].map((sx) => [sx * (W / 2 - 60), 265, zH + 36] as Vec3), [0, 1, 0], { len: 40, dia: 20, name: "Cover clip" })],
    },
    {
      title: "Lay the grip strips on the rails and the beam",
      detail: "Three on each side rail and three on the centre beam. Trim the last one with scissors if it's too long.",
      fix: [at("glide", [-xS, 0, xS].flatMap((x) => [-1, 0, 1].map((t) => [x, x === 0 ? 240 : yTop, (t * L) / 3] as Vec3)), [0, -1, 0], { len: 3, dia: 30, name: "Grip strip" })],
      tools: ["knife"],
    },
    { title: "Roll out the slatted base", detail: "Sold separately. Unroll it from the head end and tuck its end under the stops at the foot.", add: ["SL"] },
  ];
  custom(b, s, parts, steps);
}

/* ---------- the hinged-door wardrobes ---------- */

const T = 16; // particleboard
const DEP = 547; // carcass, front to back
const Z0 = -272, Z1 = Z0 + DEP; // back and front edges
const ZC = (Z0 + Z1) / 2;
const PLINTH = 70;
const DOOR_T = 16;
const DOOR_Z = Z1 + DOOR_T / 2 + 1;
const ALLEN = { kind: "bolt" as const, len: 50, dia: 7, name: "Allen screw" };
const DOWEL = { kind: "dowel" as const, len: 30, dia: 8 };
const SMALL: HwDef = { kind: "screw", len: 13, dia: 4 };
const PLATE: HwDef = { kind: "plate", len: 50, dia: 30, name: "Hinge plate" };
const HINGE: HwDef = { kind: "hinge", len: 50, dia: 35 };
const KNOB: HwDef = { kind: "knob", len: 25, dia: 28 };
const KNOB_SCREW: HwDef = { kind: "screw", len: 40, dia: 4 };
const NAIL = { kind: "nail" as const, len: 20, dia: 1.6 };

interface Door {
  key: string;
  x: number;
  hinge: number; // -1 hinged on its left edge, 1 on its right
  w: number;
}

function wardrobe(b: PlanBuilder, s: ProductSpec, three: boolean) {
  const W = three ? 1170 : 790, H = 1760;
  const xs = W / 2 - T / 2, inner = W / 2 - T;
  const bot = PLINTH, top = H - T;
  const doorW = three ? (W - 4) / 3 : (W - 2) / 2;
  const doorX = three ? [-1, 0, 1].map((i) => i * (doorW + 2)) : [-1, 1].map((i) => (i * (doorW + 2)) / 2);
  const hinges = three ? [-1, 1, 1] : [-1, 1];
  const divX = W / 2 - doorW - 3 - T / 2; // under the edge between the middle and right doors
  const hingeYs = [260, 920, 1580];
  const parts: CustomPart[] = [
    ...[-1, 1].map((sx) => ({ id: `S${sx}`, name: "Side", size: [T, H, DEP] as Vec3, pos: [sx * xs, H / 2, ZC] as Vec3 })),
    { id: "TP", name: "Top", size: [W - 2 * T, T, DEP], pos: [0, top + T / 2, ZC] },
    { id: "BT", name: "Bottom", size: [W - 2 * T, T, DEP], pos: [0, bot + T / 2, ZC] },
    { id: "PF", name: "Plinth", size: [W - 2 * T, PLINTH, T], pos: [0, PLINTH / 2, Z1 - 30 - T / 2] },
    { id: "PB", name: "Back rail", size: [W - 2 * T, PLINTH, T], pos: [0, PLINTH / 2, Z0 + T / 2] },
  ];
  const nBack = three ? 3 : 2;
  for (let i = 0; i < nBack; i++) parts.push({ id: `K${i}`, name: "Back panel", size: [W / nBack, H - PLINTH, 3], pos: [-W / 2 + (W / nBack) * (i + 0.5), (H + PLINTH) / 2, Z0 - 1.5], material: "fiber" });
  const shelfIds: string[] = [];
  if (three) {
    parts.push({ id: "DV", name: "Divider", size: [T, top - bot - T, DEP], pos: [divX, (top + bot + T) / 2, ZC] });
    const x0 = divX + T / 2, x1 = inner;
    const y0 = bot + T, y1 = top;
    [1, 2, 3].forEach((k) => {
      parts.push({ id: `SH${k}`, name: "Shelf", size: [x1 - x0, T, DEP - 27], pos: [(x0 + x1) / 2, y0 + ((y1 - y0) * k) / 4, ZC - 13.5] });
      shelfIds.push(`SH${k}`);
    });
  } else {
    parts.push({ id: "SH1", name: "Shelf", size: [W - 2 * T, T, DEP - 27], pos: [0, bot + 330, ZC - 13.5] });
    shelfIds.push("SH1");
  }
  const shelf = (id: string) => parts.find((p) => p.id === id)!;

  // the edges the doors hinge on: a side's inner face, or the divider's left face for the middle door
  const hingeFace = (i: number): { x: number; d: Vec3 } => {
    const hs = hinges[i];
    if (three && i === 1) return { x: divX - T / 2, d: [1, 0, 0] };
    return { x: hs * inner, d: [hs, 0, 0] };
  };
  const platePts = (i: number) => hingeYs.map((y) => [hingeFace(i).x, y, Z1 - 40] as Vec3);
  const panelOf = (i: number) => (three && i === 1 ? "DV" : hinges[i] < 0 ? "S-1" : "S1");
  const plateFixes = doorX.map((_, i) => at("plate", platePts(i), hingeFace(i).d, { len: 50, dia: 30, name: "Hinge plate", on: panelOf(i) }));
  const plateScrews = doorX.map((_, i) => at("screw", platePts(i).flatMap((p) => [-16, 16].map((dy) => [p[0], p[1] + dy, p[2] - 12] as Vec3)), hingeFace(i).d, { len: 13, dia: 4, on: panelOf(i) }));

  // Allen screws through the sides into the top, bottom and plinth rails
  const sideScrews = (sx: number, y: number, zs: number[]) => at("bolt", zs.map((z) => [sx * (W / 2), y, z] as Vec3), [-sx, 0, 0], ALLEN);
  const zPair = [Z0 + 60, Z1 - 60];
  const yT = top + T / 2, yB = bot + T / 2;
  const endDowels = (id: string, y: number, n: number): CustomFix[] =>
    [-1, 1].map((sx) => at("dowel", Array.from({ length: n }, (_, k) => [sx * inner, y, Z0 + 120 + ((DEP - 240) * k) / Math.max(1, n - 1)] as Vec3), [sx, 0, 0], { ...DOWEL, on: id }));
  const stops = (y: number, d: Vec3, on: string): CustomFix => at("pin", (three ? [-10, 10].map((dx) => doorX[0] + doorW / 2 + 1 + dx) : [-10, 10]).map((x) => [x, y, Z1 - 20] as Vec3), d, { len: 14, dia: 10, name: "Door stop", on });
  const bracketAt: Vec3 = [0, bot, Z1 - 30 - T - 14];
  const glides = (pts: Vec3[]) => at("glide", pts, [0, 1, 0], { len: 8, dia: 20, name: "Glide" });

  const steps: CustomStep[] = [
    {
      title: `Screw the hinge plates onto the ${three ? "sides and the divider" : "sides"}`,
      detail: "Lay the panels on a rug, holes up. Three plates on each, near the front edge, two screws each.",
      add: three ? ["S-1", "DV", "S1"] : ["S-1", "S1"],
      fix: [...plateFixes, ...plateScrews],
      tools: ["screwdriver"],
      pose: "-z",
      warnings: ["floor"],
    },
  ];
  const shelfDowels = (id: string, n: number): CustomFix[] => {
    const p = shelf(id);
    return [-1, 1].map((sx) => at("dowel", Array.from({ length: n }, (_, k) => [p.pos[0] + (sx * p.size[0]) / 2, p.pos[1], Z0 + 80 + ((DEP - 160) * k) / Math.max(1, n - 1)] as Vec3), [sx, 0, 0], { ...DOWEL, on: id }));
  };
  if (three) {
    steps.push(
      {
        title: "Tap the dowels into the divider's ends",
        detail: "Two at the top end and two at the bottom.",
        fix: [at("dowel", [-1, 1].map((t) => [divX, top, ZC + t * 150] as Vec3), [0, 1, 0], { ...DOWEL, on: "DV" }), at("dowel", [-1, 1].map((t) => [divX, bot + T, ZC + t * 150] as Vec3), [0, -1, 0], { ...DOWEL, on: "DV" })],
        tools: ["hammer"],
        pose: "-z",
      },
      { title: "Tap the dowels into the shelves", detail: "Three in each end of all three shelves, then push them onto the divider.", fix: shelfIds.flatMap((id) => shelfDowels(id, 3)), add: shelfIds, tools: ["hammer"], pose: "-z" },
      { title: "Screw the top onto the divider", detail: "Two Allen screws down through the top into the divider's end.", add: ["TP"], fix: [at("bolt", [-1, 1].map((t) => [divX, H, ZC + t * 150] as Vec3), [0, -1, 0], ALLEN)], tools: ["allen"], pose: "-z" },
    );
  }
  steps.push(
    three
      ? { title: "Tap the dowels into the top and bottom", detail: "Two in each end of both panels.", fix: [...endDowels("TP", yT, 2), ...endDowels("BT", yB, 2)], tools: ["hammer"], pose: "-z" }
      : { title: "Knock the door stops into the top and bottom", detail: "Two in each, at the front edge where the doors meet.", fix: [stops(top, [0, 1, 0], "TP"), stops(bot + T, [0, -1, 0], "BT")], tools: ["hammer"], pose: "-z" },
    three
      ? { title: "Knock the door stops into the top and bottom", detail: "Two in each, at the front edge where the two left doors meet.", fix: [stops(top, [0, 1, 0], "TP"), stops(bot + T, [0, -1, 0], "BT")], tools: ["hammer"], pose: "-z" }
      : { title: "Tap the dowels into the top and bottom", detail: "Two in each end of both panels.", fix: [...endDowels("TP", yT, 2), ...endDowels("BT", yB, 2)], tools: ["hammer"], pose: "-z" },
    {
      title: "Screw the angle bracket under the bottom",
      detail: "At the middle of the front edge, with one short screw. It holds the plinth later.",
      fix: [at("angle", [bracketAt], [0, 1, 0], { len: 30, dia: 24, on: "BT" }), at("screw", [[bracketAt[0], bracketAt[1], bracketAt[2] - 6]], [0, 1, 0], { len: 12, dia: 4, on: "BT" })],
      tools: ["screwdriver"],
      pose: "-z",
    },
  );
  if (three) {
    steps.push(
      { title: "Screw the bottom onto the divider", detail: "Two Allen screws up through the bottom into the divider's end.", add: ["BT"], fix: [at("bolt", [-1, 1].map((t) => [divX, bot, ZC + t * 150] as Vec3), [0, 1, 0], ALLEN)], tools: ["allen"], pose: "-z" },
      { title: "Screw the right side to the top", detail: "Two Allen screws through the side into the top's end.", fix: [sideScrews(1, yT, zPair)], tools: ["allen"], pose: "-z" },
      { title: "Screw the right side to the bottom", detail: "Two more into the bottom.", fix: [sideScrews(1, yB, zPair)], tools: ["allen"], pose: "-z" },
      { title: "Screw on the left side", detail: "Four Allen screws, two into the top and two into the bottom.", fix: [sideScrews(-1, yT, zPair), sideScrews(-1, yB, zPair)], tools: ["allen"], pose: "-z" },
    );
  } else {
    steps.push(
      { title: "Screw the right side to the top", detail: "Two Allen screws through the side into the top's end.", fix: [sideScrews(1, yT, zPair)], tools: ["allen"], pose: "-z" },
      { title: "Screw the right side to the bottom", detail: "Two more into the bottom.", fix: [sideScrews(1, yB, zPair)], tools: ["allen"], pose: "-z" },
      { title: "Tap the dowels into the shelf and fit it", detail: "Three in each end, then push it onto the right side, low down above the bottom.", add: ["SH1"], fix: shelfDowels("SH1", 3), tools: ["hammer"], pose: "-z" },
      { title: "Screw the left side to the top", detail: "Two Allen screws through the side into the top.", fix: [sideScrews(-1, yT, zPair)], tools: ["allen"], pose: "-z" },
    );
  }
  const railGlides = glides(["PF", "PB"].flatMap((id) => [-1, 1].map((t) => [t * (inner - 150), 0, parts.find((p) => p.id === id)!.pos[2]] as Vec3)).slice(0, three ? 4 : 2));
  steps.push({
    title: "Fit the plinth rails",
    detail: "Two dowels in each end of both rails and the glides pressed into their bottom edges, then slide them in between the sides at the foot.",
    add: ["PF", "PB"],
    fix: [
      ...["PF", "PB"].flatMap((id) => {
        const z = parts.find((p) => p.id === id)!.pos[2];
        return [-1, 1].map((sx) => at("dowel", [[sx * inner, PLINTH / 2, z]], [sx, 0, 0], { ...DOWEL, on: id }));
      }),
      railGlides,
    ],
    tools: ["hammer"],
    pose: "-z",
    people: 2,
    warnings: ["two"],
  });
  if (!three) steps.push({ title: "Screw the left side to the bottom", detail: "Two Allen screws through the side into the bottom.", fix: [sideScrews(-1, yB, zPair)], tools: ["allen"], pose: "-z" });
  steps.push(
    {
      title: "Screw the sides to the plinth rails",
      detail: "One Allen screw through each side into each rail.",
      fix: [-1, 1].map((sx) => sideScrews(sx, PLINTH / 2, [Z1 - 30 - T / 2, Z0 + T / 2])),
      tools: ["allen"],
      pose: "-z",
    },
    { title: "Check the screw heads sit flush", detail: "Turn any that stand proud until they're level with the side, or the doors won't close.", tools: ["allen"], pose: "-z" },
    { title: "Screw the bracket to the plinth", detail: "One short screw through the bracket into the back of the plinth.", fix: [at("screw", [[bracketAt[0], PLINTH - 20, Z1 - 30 - T]], [0, 0, 1], { len: 12, dia: 4, on: "PF" })], tools: ["screwdriver"], pose: "-z" },
    {
      title: "Lay the back panels on",
      detail: "Measure both diagonals first: when they're equal the wardrobe is square. The panels' edges meet over the middle.",
      add: Array.from({ length: nBack }, (_, i) => `K${i}`),
      check: "square",
      pose: "-z",
    },
  );
  const yBack = (n: number, x: number) => Array.from({ length: n }, (_, k) => [x, PLINTH + 30 + ((H - PLINTH - 60) * k) / Math.max(1, n - 1), Z0 - 3] as Vec3);
  const edges = (n: number) => Array.from({ length: n }, (_, k) => [-W / 2 + 20 + ((W - 40) * k) / Math.max(1, n - 1), H - 8, Z0 - 3] as Vec3);
  const nailFix = (pts: Vec3[]) => at("nail", pts, [0, 0, 1], NAIL);
  if (three) {
    steps.push(
      { title: "Nail the back panels at the corners", detail: "One nail at a top corner, then one at each end of the joints to hold the panels square.", fix: [nailFix([[-W / 2 + 20, H - 8, Z0 - 3], [-W / 6, H - 8, Z0 - 3], [W / 6, H - 8, Z0 - 3]])], tools: ["hammer"], pose: "-z" },
      { title: "Nail along the shelves and the divider", detail: "Twelve nails where the back crosses the shelves and the divider.", fix: [nailFix([...yBack(6, divX), ...shelfIds.flatMap((id) => [-1, 1].map((t) => [shelf(id).pos[0] + t * 100, shelf(id).pos[1], Z0 - 3] as Vec3))])], tools: ["hammer"], pose: "-z" },
      {
        title: "Nail the back all the way round",
        detail: "About every 15 cm along the sides, the top, the bottom and both joints. Hold the nail in the plastic guide so it goes in straight.",
        fix: [nailFix([...yBack(10, -xs), ...yBack(10, xs), ...edges(8), ...edges(8).map((p) => [p[0], bot + T / 2, p[2]] as Vec3), ...yBack(4, -W / 6), ...yBack(4, W / 6)])],
        tools: ["hammer"],
        pose: "-z",
      },
    );
  } else {
    steps.push(
      { title: "Nail the back along its edges", detail: "Fifteen nails round the outside, about every 15 cm. Hold each in the plastic guide so it goes in straight.", fix: [nailFix([...yBack(5, -xs), ...yBack(5, xs), ...edges(5)])], tools: ["hammer"], pose: "-z" },
      { title: "Nail along the bottom, the shelf and the joint", detail: "Fifteen more where the back crosses the bottom, the shelf and the middle joint.", fix: [nailFix([...edges(5).map((p) => [p[0], bot + T / 2, p[2]] as Vec3), ...edges(5).map((p) => [p[0], shelf("SH1").pos[1], p[2]] as Vec3), ...yBack(5, 0)])], tools: ["hammer"], pose: "-z" },
    );
  }
  steps.push({
    title: "Press the glides into the sides",
    detail: "Two under each side, at the front and the back. Then stand the wardrobe up together, lifting from the top.",
    fix: [glides([-1, 1].flatMap((sx) => [Z0 + 50, Z1 - 50].map((z) => [sx * xs, 0, z] as Vec3)))],
    people: 2,
    pose: "+y",
    warnings: ["two"],
  });
  custom(b, s, parts, steps);

  // fixed to the wall before the rail and doors go on
  const wx = [-1, 1].map((sx) => sx * (inner - 120));
  b.step(
    {
      title: "Fix it to the wall",
      detail: "Mark the top on the wall, screw the two angle brackets to the wall, push the wardrobe back and screw the brackets into the top. Wall screws and plugs suit the wall: check what yours needs.",
      kind: "anchor",
      tools: ["drill", "screwdriver", "pencil", "level"],
      warnings: ["wall", "tip"],
      wall: true,
    },
    () => {
      b.stagger(0.2);
      put(b, HW.plug, wx.map((x) => [x, H - 20, Z0 - 40]), [0, 0, -1]);
      b.then(0.1);
      put(b, { kind: "angle", len: 80, dia: 30, name: "Wall bracket" }, wx.map((x) => [x, H, Z0 - 4]), [0, -1, 0]);
      b.then(0.1);
      put(b, HW.washer, wx.map((x) => [x, H - 20, Z0 - 6]), [0, 0, -1]);
      put(b, HW.wallScrew, wx.map((x) => [x, H - 20, Z0 - 4]), [0, 0, -1]);
      b.then(0.1);
      put(b, HW.washer, wx.map((x) => [x, H + 3, Z0 + 30]), [0, -1, 0]);
      put(b, { kind: "screw", len: 16, dia: 4 }, wx.map((x) => [x, H + 4, Z0 + 30]), [0, -1, 0]);
    },
  );

  // the clothes rail, in the hanging side
  const rx0 = -inner, rx1 = three ? divX - T / 2 : inner;
  const ry = H - T - 90;
  custom(
    b,
    s,
    [{ id: "RL", name: "Clothes rail", size: [rx1 - rx0 - 6, 25, 25], pos: [(rx0 + rx1) / 2, ry, ZC], shape: "cyl", material: "metal" }],
    [
      {
        title: "Screw the rail holders in",
        detail: three ? "One on the left side and one on the divider, at the top of the hanging side." : "One on each side, near the top.",
        fix: [
          at("clip", [[rx0, ry, ZC]], [-1, 0, 0], { len: 40, dia: 30, name: "Rail holder" }),
          at("clip", [[rx1, ry, ZC]], [1, 0, 0], { len: 40, dia: 30, name: "Rail holder" }),
          at("screw", [[rx0, ry + 12, ZC]], [-1, 0, 0], { len: 13, dia: 4 }),
          at("screw", [[rx1, ry + 12, ZC]], [1, 0, 0], { len: 13, dia: 4 }),
        ],
        tools: ["screwdriver"],
      },
      { title: "Drop the clothes rail into the holders", detail: "Press it down into both until it sits.", add: ["RL"] },
    ],
  );

  // doors: hinges screwed on lying face down, then clipped onto the plates
  const h = H - PLINTH - 12;
  const doors: Door[] = doorX.map((x, i) => {
    const hs = hinges[i];
    const pieces: PartPiece[] = [{ shape: "box", size: [doorW, h, DOOR_T], pos: [0, 0, 0] }];
    const { type, mid } = b.compound("Door", pieces, { material: "board" });
    return { key: b.place(type, [x + mid[0], PLINTH + 6 + h / 2 + mid[1], DOOR_Z + mid[2]]), x, hinge: hs, w: doorW };
  });
  const hingeX = (d: Door) => d.x + d.hinge * (d.w / 2 - 40);
  const freeX = (d: Door) => d.x - d.hinge * (d.w / 2 - 40);
  b.step(
    { title: "Screw the hinges onto the doors", detail: "Lay the doors face down on a rug. Three hinges into the cups on each, two screws each, arms pointing out over the edge.", kind: "hinges", tools: ["screwdriver"], scene: "doors", warnings: ["floor"] },
    () => {
      b.stagger(0.2);
      doors.forEach((d, i) => b.stage(d.key, [(i - (doors.length - 1) / 2) * (doorW + 80), DOOR_T / 2, 0], [Math.PI / 2, 0, 0], [0, 160, 0]));
      b.then(0.1);
      for (const d of doors) put(b, HINGE, hingeYs.map((y) => [hingeX(d), y, DOOR_Z - DOOR_T / 2]), [0, 0, 1], d.key, 0.05);
      b.then(0.05);
      for (const d of doors) put(b, SMALL, hingeYs.flatMap((y) => [-20, 20].map((dy) => [hingeX(d) - d.hinge * 22, y + dy, DOOR_Z - DOOR_T / 2] as Vec3)), [0, 0, 1], d.key, 0.03);
    },
  );
  b.step(
    { title: "Hang the doors", detail: "Hold each door against its plates and push the hinge arms on until they click. Line the doors up with the screws on the hinges.", kind: "doors", people: 2, warnings: ["two"] },
    () => {
      b.stagger(0.35);
      for (const d of doors) b.add(d.key, [0, 0, 380]);
    },
  );
  b.step({ title: "Screw on the knobs", detail: "One on each door, near its free edge, with a screw from the inside.", kind: "screws", tools: ["screwdriver"] }, () => {
    for (const d of doors) put(b, KNOB, [[freeX(d), 1000, DOOR_Z + DOOR_T / 2]], [0, 0, -1], d.key);
    b.then(0.05);
    for (const d of doors) put(b, KNOB_SCREW, [[freeX(d), 1000, DOOR_Z - DOOR_T / 2]], [0, 0, 1], d.key);
  });
  if (three)
    b.step({ title: "Stick the bumper pads on", detail: "On the divider's front edge, top and bottom, so the right door closes softly.", kind: "general" }, () =>
      put(b, { kind: "glide", len: 2, dia: 12, name: "Bumper pads" }, [[divX, H - 300, Z1]], [0, 0, -1]),
    );
}

const family: Family = {
  names: ["KLEPPSTAD"],
  build(b, s) {
    const text = `${s.variant} ${s.slug ?? ""}`.toLowerCase();
    if (s.archetype === "bed" && /bed/.test(text)) {
      bed(b, s);
      return true;
    }
    if (/sliding/.test(text)) return false;
    if (/wardrobe/.test(text) && /3 doors|3-doors/.test(text)) {
      wardrobe(b, s, true);
      return true;
    }
    if (/wardrobe/.test(text) && /2 doors|2-doors/.test(text)) {
      wardrobe(b, s, false);
      return true;
    }
    return false;
  },
};
export default family;
