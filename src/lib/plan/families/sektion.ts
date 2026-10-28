import type { Family } from "./family";
import type { PartMaterial, PartPiece, Pose, ProductSpec, StepKind, ToolId, Vec3, WarnId } from "../../types";
import { HW, type FitOpts, type HwDef, type PlanBuilder } from "../builder";

/**
 * SEKTION, read from the base, wall and high cabinet frame manuals and the MAXIMERA drawer, UTRUSTA hinge and
 * reinforced rail manuals sold with them. The frame: cam bolts go into both sides and the suspension fittings into
 * the top back corners, the bottom (and on a wall or high cabinet the top) go onto one side on dowels and are locked
 * with cam locks, the back slides into its grooves before the other side closes it. Square it up, a nail in three
 * corners, two plastic brackets at the top, then nails all along. A base cabinet gets two rails across the top
 * instead of a top (ventilated ones under a sink), a high cabinet a fixed shelf on connectors. It hangs on a
 * suspension rail on the wall (sold separately), the fittings are adjusted and their covers clicked on. Shelves sit
 * on pins; doors hang on UTRUSTA hinges, pressed into the door and clipped onto plates screwed to the sides; MAXIMERA
 * drawers are built on the floor, clicked onto their fronts and pushed onto runners screwed into the frame.
 * Corner cabinets and the cabinets for a fridge or built-in appliances keep their old guides for now.
 */

const T = 16;
const G = 10; // back groove, in from the back edge
const DT = 19; // front thickness
const DGAP = 3; // between fronts

interface Cab {
  base: boolean;
  W: number;
  H: number;
  D: number; // frame depth
  zb: number;
  doors: { x: number; w: number; hingeLeft: boolean }[];
  glass: boolean;
  shelves: number;
}

function cabOf(s: ProductSpec): Cab | null {
  const c = s.cabinet;
  if (s.archetype !== "cabinet" || !c || c.corner || c.fit || c.drawers || /MAXIMERA/i.test(s.name)) return null;
  const v = s.variant.toLowerCase();
  const base = /^base cabinet/.test(v);
  const wall = /^wall cabinet/.test(v);
  if (!base && !wall) return null;
  const W = Math.round(s.size.w * 10), H = Math.round(s.size.h * 10);
  if (base && H !== 760) return null;
  const Dp = Math.round(s.size.d * 10);
  const nd = Math.max(0, Math.min(2, c.doors ?? 0));
  const D = Dp - (nd ? DT + 1 : 0);
  const zb = -Dp / 2;
  const doors = Array.from({ length: nd }, (_, i) => ({ x: nd === 1 ? 0 : (i === 0 ? -1 : 1) * (W / 4), w: W / nd - 3, hingeLeft: nd === 1 || i === 0 }));
  return { base, W, H, D, zb, doors, glass: /glass/.test(v), shelves: Math.max(0, Math.round(c.shelves ?? 0)) };
}

const named = (b: PlanBuilder, def: HwDef, name: string) => {
  const t = b.hw.get(b.hwType(def));
  if (t) t.name = name;
  return def;
};

class Kit {
  private types = new Map<string, string>();
  constructor(public b: PlanBuilder) {}
  part(name: string, size: Vec3, pos: Vec3, o: { material?: PartMaterial; pieces?: PartPiece[]; extra?: boolean; shape?: "box" | "cyl" } = {}) {
    const k = `${name}|${size.map(Math.round).join("x")}|${o.pieces ? JSON.stringify(o.pieces) : ""}`;
    let ref = this.types.get(k);
    if (!ref) {
      ref = this.b.part(name, size, { material: o.material ?? "board", extra: o.extra, shape: o.shape });
      if (o.pieces) this.b.parts[this.b.parts.length - 1].pieces = o.pieces;
      this.types.set(k, ref);
    }
    return this.b.place(ref, pos);
  }
  step(
    o: { title: string; detail: string; kind: StepKind; tools?: ToolId[]; pose?: Pose; people?: 1 | 2; scene?: string; warnings?: WarnId[]; wall?: boolean; check?: "square"; repeat?: number },
    body: () => void,
  ) {
    this.b.step({ ...o, warnings: o.warnings ?? (o.people === 2 ? ["two"] : []) }, body);
  }
  fits(def: HwDef, list: FitOpts[]) {
    if (!list.length) return;
    this.b.fits(def, list, Math.min(0.08, 2.4 / list.length));
    this.b.then(0.1);
  }
}

const many = (n: number, one: string, more: string) => (n === 1 ? one : more);

function build(b: PlanBuilder, s: ProductSpec): boolean {
  const c = cabOf(s);
  if (!c) return false;
  const k = new Kit(b);
  const { base, W, H, D, zb } = c;
  const Wi = W - 2 * T;
  const zc = zb + D / 2;
  const dd = D - G;
  const zp = zc + G / 2;
  const what = base ? "base cabinet" : "wall cabinet";

  const sideL = k.part("Side", [T, H, D], [-W / 2 + T / 2, H / 2, zc]);
  const sideR = k.part("Side", [T, H, D], [W / 2 - T / 2, H / 2, zc]);
  const bottom = k.part("Bottom", [Wi, T, dd], [0, T / 2, zp]);
  const top = base ? "" : k.part("Top", [Wi, T, dd], [0, H - T / 2, zp]);
  const RW = 90;
  const railF = base ? k.part("Top rail", [Wi, T, RW], [0, H - T / 2, zb + D - RW / 2]) : "";
  const railB = base ? k.part("Top rail", [Wi, T, RW], [0, H - T / 2, zb + G + RW / 2]) : "";
  const back = k.part("Back panel", [Wi + 12, H - 4, 3], [0, H / 2, zb + G - 1.5], { material: "fiber" });

  // joints: three bolts, dowels and cam locks for each end of a base cabinet's bottom, two for a wall cabinet's top and bottom
  const zs = base ? [zp - dd / 2 + 60, zp, zp + dd / 2 - 60] : [zp - dd / 2 + 50, zp + dd / 2 - 50];
  const pieces = base ? [bottom] : [bottom, top];
  const yOf = (p: string) => (p === bottom ? T / 2 : H - T / 2);
  const bolts = (sx: number): FitOpts[] => pieces.flatMap((p) => zs.map((z) => ({ on: sx < 0 ? sideL : sideR, at: [(sx * Wi) / 2, yOf(p), z + 20] as Vec3, dir: [sx, 0, 0] as Vec3, mate: p })));
  const dowels = (sx: number): FitOpts[] => pieces.flatMap((p) => zs.map((z) => ({ on: p, at: [(sx * Wi) / 2, yOf(p), z - 20] as Vec3, dir: [-sx, 0, 0] as Vec3 })));
  const cams = (sx: number): FitOpts[] =>
    pieces.flatMap((p) => zs.map((z) => ({ on: p, at: [sx * (Wi / 2 - 24), p === bottom ? T : H - T, z + 20] as Vec3, dir: [0, p === bottom ? -1 : 1, 0] as Vec3 })));

  // the suspension fittings sit in the top corners at the back, inside the sides
  const ySus = H - 50, zSus = zb + G + 25;
  const sus = [-1, 1].map((sx) => ({ on: sx < 0 ? sideL : sideR, at: [(sx * Wi) / 2, ySus, zSus] as Vec3, dir: [sx, 0, 0] as Vec3 }));
  const SUS = () => named(b, { kind: "bracket", len: 50, dia: 45 }, "Suspension fitting");

  k.step({ title: "Screw the cam bolts into both sides", detail: "Lay the sides flat with the holes up and turn the bolts in until they stop.", kind: "cams", tools: ["screwdriver"], scene: "sides", warnings: ["floor"] }, () => {
    b.stagger(0.15);
    [sideL, sideR].forEach((key, i) => b.stage(key, [0, T / 2, (i - 0.5) * (D + 120)], [0, 0, Math.PI / 2]));
    b.then(0.15);
    k.fits(HW.camScrew, [...bolts(-1), ...bolts(1)]);
  });
  k.step({ title: "Screw the suspension fittings into the sides", detail: "One in the top back corner of each side, three screws in each.", kind: "screws", tools: ["screwdriver"], scene: "sides" }, () => {
    k.fits(SUS(), sus);
    k.fits({ kind: "screw", len: 12, dia: 4 }, sus.flatMap((p) => [-14, 0, 14].map((dz) => ({ ...p, at: [p.at[0], p.at[1] - (dz ? 22 : -22), p.at[2] + dz] as Vec3 }))));
  });
  const pose: Pose = "-z";
  k.step(
    { title: base ? "Tap dowels into the bottom and join it to one side" : "Tap dowels into the top and bottom and join them to one side", detail: "Lay the side on its front edge on a rug. Dowels in, then push the panels onto the cam bolts.", kind: "dowels", tools: ["hammer"], pose, warnings: ["floor"] },
    () => {
      b.add(sideL, [0, 0, 0]);
      b.then(0.15);
      k.fits(HW.dowel, dowels(-1));
      for (const p of pieces) b.add(p, [0, 0, -360]);
    },
  );
  k.step({ title: "Turn the cam locks", detail: "Arrow towards the bolt, then turn clockwise until it pulls tight.", kind: "cams", tools: ["screwdriver"], pose }, () => k.fits(HW.cam, cams(-1)));
  k.step({ title: "Slide in the back panel", detail: "Into the grooves, smooth side to the inside, from the open end.", kind: "join", pose }, () => b.add(back, [Math.min(900, W + 200), 0, 0]));
  k.step({ title: "Tap in the other dowels and fit the other side", detail: "Line every dowel and bolt up with its hole and press the side on evenly.", kind: "dowels", tools: ["hammer"], pose, people: H > 900 ? 2 : 1 }, () => {
    k.fits(HW.dowel, dowels(1));
    b.add(sideR, [420, 0, 0]);
  });
  k.step({ title: "Turn the other cam locks", detail: "The same way as on the first side.", kind: "cams", tools: ["screwdriver"], pose }, () => k.fits(HW.cam, cams(1)));
  if (base)
    k.step({ title: "Screw in the top rails", detail: "One at the front and one at the back, with a screw through each side into each end. Click the clips onto the front rail first.", kind: "screws", tools: ["screwdriver"], pose }, () => {
      b.stagger(0.25);
      b.add(railF, [0, 0, -300]);
      b.add(railB, [0, 0, -300]);
      b.then(0.15);
      k.fits(named(b, { kind: "clip", len: 14, dia: 22 }, "Rail clip"), (W > 700 ? [-0.3, 0, 0.3] : [-0.25, 0.25]).map((t) => ({ on: railF, at: [t * Wi, H - T, zb + D - RW / 2] as Vec3, dir: [0, 1, 0] as Vec3, hole: false as const })));
      k.fits(
        { kind: "screw", len: 40, dia: 5 },
        [railF, railB].flatMap((r) => [-1, 1].map((sx) => ({ on: sx < 0 ? sideL : sideR, at: [(sx * W) / 2, H - T / 2, r === railF ? zb + D - RW / 2 : zb + G + RW / 2] as Vec3, dir: [-sx, 0, 0] as Vec3, mate: r }))),
      );
    });
  // square it, a nail in three corners, then nails along the bottom and the top
  const upper = base ? railB : top;
  const corners: Vec3[] = [[-Wi / 2 + 20, T / 2, zb + G - 3], [Wi / 2 - 20, T / 2, zb + G - 3], [Wi / 2 - 20, H - T / 2, zb + G - 3]];
  const nail = (at: Vec3, mate: string): FitOpts => ({ on: back, at, dir: [0, 0, 1], mate, hole: false });
  k.step({ title: "Square it up and nail one corner", detail: "Both diagonals the same length. One nail in the bottom corner.", kind: "nails", tools: ["hammer"], pose, check: "square" }, () => k.fits(HW.nail, [nail(corners[0], bottom)]));
  k.step({ title: "Nail the other bottom corner", detail: "Keep the back pushed tight to the edge.", kind: "nails", tools: ["hammer"], pose }, () => k.fits(HW.nail, [nail(corners[1], bottom)]));
  k.step({ title: "Nail the top corner", detail: "Check it is still square before you do.", kind: "nails", tools: ["hammer"], pose }, () => k.fits(HW.nail, [nail(corners[2], upper)]));
  const along = (y: number, mate: string, n: number) => Array.from({ length: n }, (_, i) => nail([-Wi / 2 + 60 + ((Wi - 120) * i) / Math.max(1, n - 1), y, zb + G - 3], mate));
  k.step({ title: "Nail the back all along", detail: "Nine more nails, along the bottom and the top.", kind: "nails", tools: ["hammer"], pose }, () => k.fits(HW.nail, [...along(T / 2, bottom, 5), ...along(H - T / 2, upper, 4)]));

  // the suspension rail is sold separately, screwed level to the wall
  const rail = k.part("Suspension rail (not included)", [W + 60, 40, 8], [0, ySus + 10, zb - 4], { material: "metal", extra: true });
  k.step(
    { title: "Hang it on the suspension rail", detail: `Screw the rail level to the wall first (rail and wall screws aren't included). Then lift the ${what} so both fittings hook over it.`, kind: "anchor", tools: ["drill", "screwdriver", "level", "pencil"], wall: true, people: H > 900 ? 2 : 1, warnings: H > 900 ? ["two", "wall"] : ["wall"] },
    () => {
      b.add(rail, [0, 0, -200]);
      b.then(0.15);
      const xs = W > 700 ? [-W / 3, 0, W / 3] : [-W / 4, W / 4];
      k.fits(HW.plug, xs.map((x) => ({ on: rail, at: [x, ySus + 10, zb - 8] as Vec3, dir: [0, 0, -1] as Vec3, hole: false as const })));
      k.fits(HW.wallScrew, xs.map((x) => ({ on: rail, at: [x, ySus + 10, zb - 6] as Vec3, dir: [0, 0, -1] as Vec3, hole: false as const })));
    },
  );
  k.step({ title: "Adjust the suspension fittings", detail: "Turn the two screws to raise it level and pull it tight to the wall.", kind: "screws", tools: ["screwdriver", "level"] }, () =>
    k.fits(named(b, { kind: "screw", len: 30, dia: 5 }, "Adjusting screw"), sus.map((p) => ({ ...p, at: [p.at[0] - Math.sign(p.at[0]) * 2, p.at[1] + 10, p.at[2] + 12] as Vec3, hole: false as const }))),
  );
  k.step({ title: "Click on the covers", detail: "One over each suspension fitting.", kind: "general" }, () =>
    k.fits(named(b, { kind: "cap", len: 6, dia: 40 }, "Fitting cover"), sus.map((p) => ({ ...p, at: [p.at[0] - Math.sign(p.at[0]) * 8, p.at[1], p.at[2]] as Vec3, dir: [-p.dir[0], 0, 0] as Vec3, hole: false as const }))),
  );

  // shelves on pins, spread evenly
  if (c.shelves) {
    const ys = Array.from({ length: c.shelves }, (_, i) => Math.round(T + ((H - 2 * T) * (i + 1)) / (c.shelves + 1)));
    const sd = dd - 20;
    const zs2 = zb + D - sd / 2 - 6;
    const shelves = ys.map((y) => k.part("Shelf", [Wi - 2, T, sd], [0, y, zs2]));
    const pins = ys.flatMap((y) => [-1, 1].flatMap((sx) => [zs2 - sd / 2 + 40, zs2 + sd / 2 - 40].map((z) => ({ on: sx < 0 ? sideL : sideR, at: [(sx * Wi) / 2, y - T / 2, z] as Vec3, dir: [sx, 0, 0] as Vec3, hole: false as const }))));
    k.step({ title: "Push in the shelf pins", detail: "Four for each shelf, at the same height on both sides.", kind: "shelves" }, () => k.fits(HW.pin, pins));
    k.step({ title: many(c.shelves, "Lay the shelf on the pins", "Lay the shelves on the pins"), detail: "Slide it in from the front until it rests on all four.", kind: "shelves" }, () => {
      b.stagger(0.25);
      for (const key of shelves) b.add(key, [0, 0, 420]);
    });
  }

  // doors on UTRUSTA hinges
  const n = c.doors.length;
  if (n) {
    const dh = H - 3;
    const zd = zb + D + 1 + DT / 2;
    const nh = dh > 1500 ? 4 : dh > 1100 ? 3 : 2;
    const hys = Array.from({ length: nh }, (_, i) => Math.round(1.5 + 100 + ((dh - 200) * i) / (nh - 1)));
    const fw = 60;
    const keys = c.doors.map((d) => {
      const pieces: PartPiece[] | undefined = c.glass
        ? [
            { shape: "box", size: [fw, dh, DT], pos: [-d.w / 2 + fw / 2, 0, 0] },
            { shape: "box", size: [fw, dh, DT], pos: [d.w / 2 - fw / 2, 0, 0] },
            { shape: "box", size: [d.w - 2 * fw, fw, DT], pos: [0, dh / 2 - fw / 2, 0] },
            { shape: "box", size: [d.w - 2 * fw, fw, DT], pos: [0, -dh / 2 + fw / 2, 0] },
          ]
        : undefined;
      return k.part(c.glass ? "Glass door" : "Door", [d.w, dh, DT], [d.x, 1.5 + dh / 2, zd], { pieces });
    });
    const hx = (d: Cab["doors"][number]) => (d.hingeLeft ? d.x - d.w / 2 + 22 : d.x + d.w / 2 - 22);
    const zBack = zd - DT / 2;
    const hinges: FitOpts[] = c.doors.flatMap((d, i) => hys.map((y) => ({ on: keys[i], at: [hx(d), y, zBack] as Vec3, dir: [0, 0, 1] as Vec3, twist: d.hingeLeft ? 0 : Math.PI })));
    k.step({ title: "Press the hinges into " + many(n, "the door", "the doors"), detail: "Lay it face down on a rug. Open each hinge, press its cup into the hole and push the lever down to lock it.", kind: "hinges", scene: "doors", warnings: ["floor"] }, () => {
      b.stagger(0.15);
      keys.forEach((key, i) => b.stage(key, [(i - (n - 1) / 2) * (c.doors[i].w + 90), DT / 2, 0], [Math.PI / 2, 0, 0]));
      b.then(0.15);
      k.fits(HW.hinge, hinges);
    });
    const plates = c.doors.flatMap((d) => hys.map((y) => ({ on: d.hingeLeft ? sideL : sideR, at: [d.hingeLeft ? -Wi / 2 : Wi / 2, y, zb + D - 37] as Vec3, dir: [d.hingeLeft ? -1 : 1, 0, 0] as Vec3 })));
    k.step({ title: "Screw the mounting plates to the " + many(n, "side", "sides"), detail: "Into the front holes, level with the hinges. Their screws come fitted.", kind: "hinges", tools: ["screwdriver"] }, () =>
      k.fits(named(b, { kind: "plate", len: 10, dia: 42 }, "Mounting plate"), plates),
    );
    k.step({ title: many(n, "Clip the door onto the plates", "Clip the doors onto the plates"), detail: "Hook each hinge over its plate and press until it clicks. Turn the hinge screws until the gaps are even.", kind: "doors", tools: ["screwdriver"] }, () => {
      b.stagger(0.3);
      for (const key of keys) b.add(key, [0, 0, 360]);
    });
  }
  return true;
}

/* ---------- high cabinets, sink cabinets, MAXIMERA drawer cabinets, wall cabinets with drawers ---------- */

type Kind = "base" | "wall" | "high";
type DSize = "low" | "medium" | "high";
/** One row of fronts, from the bottom up; heights in inches of the frame, as SEKTION fronts are sold. */
type Row =
  | { kind: "doors"; inch: number; n: number; shelves?: number }
  | { kind: "drawer"; inch: number; inner?: boolean }
  | { kind: "front"; inch: number } // a fixed front on two brackets
  | { kind: "apron"; inch: number } // left open for the front of an apron sink
  | { kind: "lift"; inch: number }; // a door that lifts up, on two hinge mechanisms

interface Layout {
  kind: Kind;
  W: number;
  H: number;
  D: number;
  rows: Row[];
  fixed: number[]; // fixed shelves of a high cabinet, as a share of its height
  sink: boolean; // ventilated rails across the top
  use?: "sink" | "apron" | "hob" | "fridge" | "appliance";
  nails?: number; // along the back, after the corners and brackets
  grille?: "shelf" | "bottom"; // a ventilation grille at the back of the fixed shelf, or under the front of a top cabinet
  upright?: boolean; // built standing on its bottom, the top lowered on last
}

const drawers = (...inch: number[]): Row[] => inch.map((i) => ({ kind: "drawer", inch: i }));

function layoutOf(s: ProductSpec): Layout | null {
  const slug = s.slug ?? "";
  if (s.archetype !== "cabinet" || s.cabinet?.corner || /corner/.test(slug)) return null;
  const m = /([\d.]+) × ([\d.]+) × ([\d.]+) cm/.exec(s.variant);
  if (!m) return null;
  const [W, D0, H] = m.slice(1, 4).map((v) => Math.round(parseFloat(v) * 10));
  const D = D0 >= 500 ? 610 : 380;
  const two = /2-doors|2-glass/.test(slug);
  const sinkRails = /sink/.test(slug);
  const base = (rows: Row[], use?: Layout["use"]): Layout => ({ kind: "base", W, H, D, rows, fixed: [], sink: sinkRails, use });
  if (/^sektion-top-cabinet/.test(slug)) return { kind: "wall", W, H, D, rows: [{ kind: "lift", inch: 15 }], fixed: [], sink: false, nails: 10, grille: "bottom", upright: true, use: "fridge" };
  if (/^sektion-high-cabinet/.test(slug)) {
    if (/fridge|freezer|built-in/.test(slug)) {
      const door = (inch: number): Row => ({ kind: "doors", inch, n: 1 });
      const rows = /built-in/.test(slug) ? [] : H < 2100 ? [door(30), door(25), door(25)] : [door(30), door(60)];
      return { kind: "high", W, H, D, rows, fixed: [0.77], sink: false, nails: 24, grille: "shelf", use: /built-in/.test(slug) ? "appliance" : "fridge" };
    }
    if (/shelves-2-doors/.test(slug)) return { kind: "high", W, H, D, rows: [{ kind: "doors", inch: 30, n: 1, shelves: 1 }, { kind: "doors", inch: 50, n: 1, shelves: 3 }], fixed: [30 / 80], sink: false };
    if (/^sektion-high-cabinet-\d+-x-\d+-x-[\d-]+$/.test(slug)) return { kind: "high", W, H, D, rows: [], fixed: [0.5], sink: false };
    return null;
  }
  if (/^sektion-(maximera-)?wall-cab/.test(slug) && /2-drawers|2-dra/.test(slug))
    return { kind: "wall", W, H, D, rows: [...drawers(5, 5), { kind: "doors", inch: 30, n: two ? 2 : 1, shelves: 1 }], fixed: [], sink: false };
  if (/havsen/.test(slug)) return base([{ kind: "doors", inch: 25, n: W > 700 ? 2 : 1 }, { kind: "apron", inch: 5 }], "apron");
  if (/tallsjon/.test(slug)) return base([{ kind: "doors", inch: 25, n: W > 700 ? 2 : 1 }, { kind: "front", inch: 5 }], "sink");
  if (/for-sink/.test(slug)) return base([{ kind: "doors", inch: 30, n: two ? 2 : 1 }], "sink");
  if (/drawer-door|drawer-2-doors/.test(slug)) return base([{ kind: "doors", inch: 20, n: two ? 2 : 1, shelves: 1 }, ...drawers(10)]);
  const hob = /cktp/.test(slug) ? "hob" : undefined;
  if (/2-fronts-3-draw/.test(slug)) return base([{ kind: "drawer", inch: 20, inner: true }, ...drawers(10)], hob);
  if (/3-fronts-3-draw/.test(slug)) return base(drawers(10, 10, 10), hob);
  if (/4-fronts-3-draw/.test(slug)) return base([...drawers(10, 10, 5), { kind: "front", inch: 5 }], hob);
  if (/maximera-base-cabinet-2-drawers/.test(slug)) return base(drawers(15, 15));
  if (/maximera-base-cabinet-3-drawers/.test(slug)) return base(W < 500 ? drawers(10, 10, 10) : drawers(15, 10, 5));
  if (/maximera-base-cabinet-4-drawers/.test(slug)) return base(drawers(10, 10, 5, 5));
  return null;
}

const SUS: HwDef = { kind: "bracket", len: 50, dia: 45, name: "Suspension fitting" };
const SUS_SCREW: HwDef = { kind: "screw", len: 12, dia: 4 };
const RAIL_SCREW: HwDef = { kind: "screw", len: 40, dia: 5 };
const EURO: HwDef = { kind: "screw", len: 11, dia: 5 }; // flat-head screws into the pre-drilled holes
const SMALL: HwDef = { kind: "screw", len: 15, dia: 3.5 };
const BACK_CLIP: HwDef = { kind: "clip", len: 16, dia: 22, name: "Back bracket" };
const RAIL_CLIP: HwDef = { kind: "clip", len: 14, dia: 22, name: "Rail clip" };
const CONNECTOR: HwDef = { kind: "pin", len: 14, dia: 8, name: "Shelf connector" };
const FRONT_FIT: HwDef = { kind: "connector", len: 40, dia: 24, name: "Front fitting" };
const FRONT_BRACKET: HwDef = { kind: "angle", len: 50, dia: 30, name: "Front bracket" };
const PLATE: HwDef = { kind: "plate", len: 10, dia: 42, name: "Mounting plate" };

interface Drawer {
  size: DSize;
  inner: boolean;
  lo: number;
  hi: number;
  front: string;
  sides: [string, string];
  back: string;
  bottom: string;
  rails: string[];
  yb: number; // underside of the box
  sh: number;
}

class Sek {
  k: Kit;
  b: PlanBuilder;
  L: Layout;
  W: number;
  H: number;
  D: number;
  Wi: number;
  n: number; // bolts and dowels at each joint
  zp: number; // centre of the top and bottom, in front of the back
  dd: number;
  fz: number; // centre of the fronts
  sideL: string;
  sideR: string;
  bottom: string;
  top?: string;
  back: string;
  rails: string[] = [];
  glass: boolean;
  what: string;
  tall: boolean;

  constructor(b: PlanBuilder, s: ProductSpec, L: Layout) {
    this.b = b;
    this.k = new Kit(b);
    this.L = L;
    const { W, H, D } = L;
    this.W = W;
    this.H = H;
    this.D = D;
    this.Wi = W - 2 * T;
    this.n = D >= 500 ? 3 : 2;
    this.dd = D - G;
    this.zp = G / 2;
    this.fz = D / 2 + 1 + DT / 2;
    this.glass = /glass/.test(s.slug ?? "");
    this.what = L.kind === "base" ? "base cabinet" : L.kind === "wall" ? "wall cabinet" : "high cabinet";
    this.tall = H > 1200;
    const k = this.k;
    this.sideL = k.part("Side", [T, H, D], [-W / 2 + T / 2, H / 2, 0]);
    this.sideR = k.part("Side", [T, H, D], [W / 2 - T / 2, H / 2, 0]);
    this.bottom = k.part("Bottom", [this.Wi, T, this.dd], [0, T / 2, this.zp]);
    if (L.kind !== "base") this.top = k.part("Top", [this.Wi, T, this.dd], [0, H - T / 2, this.zp]);
    this.back = k.part("Back panel", [this.Wi + 12, H - 4, 3], [0, H / 2, -D / 2 + G - 1.5], { material: "fiber" });
    if (L.kind === "base") {
      const name = L.sink ? "Ventilated rail" : "Rail";
      const h = L.sink ? 30 : 12;
      this.rails = [D / 2 - 40, -D / 2 + G + 40].map((z) => k.part(name, [this.Wi, h, 80], [0, H - h / 2, z], { material: "metal" }));
    }
  }

  side(sx: number) {
    return sx < 0 ? this.sideL : this.sideR;
  }

  /* ---------- the frame ---------- */

  panels() {
    return this.top ? [this.bottom, this.top] : [this.bottom];
  }
  yOf(p: string) {
    return p === this.bottom ? T / 2 : this.H - T / 2;
  }
  zs() {
    const { zp, dd } = this;
    return this.n === 3 ? [zp - dd / 2 + 60, zp, zp + dd / 2 - 60] : [zp - dd / 2 + 50, zp + dd / 2 - 50];
  }
  bolts(sx: number, only?: string): FitOpts[] {
    return this.panels().filter((p) => !only || p === only).flatMap((p) => this.zs().map((z) => ({ on: this.side(sx), at: [(sx * this.Wi) / 2, this.yOf(p), z + 20] as Vec3, dir: [sx, 0, 0] as Vec3, mate: p })));
  }
  dowels(sx: number, only?: string): FitOpts[] {
    return this.panels().filter((p) => !only || p === only).flatMap((p) => this.zs().map((z) => ({ on: p, at: [(sx * this.Wi) / 2, this.yOf(p), z - 20] as Vec3, dir: [-sx, 0, 0] as Vec3 })));
  }
  cams(sx: number, only?: string): FitOpts[] {
    return this.panels().filter((p) => !only || p === only).flatMap((p) =>
      this.zs().map((z) => ({ on: p, at: [sx * (this.Wi / 2 - 24), p === this.bottom ? T : this.H - T, z + 20] as Vec3, dir: [0, p === this.bottom ? -1 : 1, 0] as Vec3 })),
    );
  }
  sus() {
    const y = this.H - (this.top ? T : 0) - 50;
    const z = -this.D / 2 + G + 25;
    return [-1, 1].map((sx) => ({ on: this.side(sx), at: [(sx * this.Wi) / 2, y, z] as Vec3, dir: [sx, 0, 0] as Vec3 }));
  }
  susScrews() {
    return this.sus().flatMap((p) => [-14, 0, 14].map((dz) => ({ ...p, at: [p.at[0], p.at[1] + (dz ? -22 : 22), p.at[2] + dz] as Vec3 })));
  }
  fitSuspension() {
    this.k.fits(SUS, this.sus().map((p) => ({ ...p, hole: false as const })));
    this.k.fits(SUS_SCREW, this.susScrews());
  }

  frame() {
    const { b, k, L, W, H, D } = this;
    const base = L.kind === "base";
    const early = !base || D < 500; // a 60 cm deep base cabinet gets its suspension fittings last, standing up
    const nb = this.bolts(-1).length * 2;
    k.step({ title: "Screw the cam bolts into both sides", detail: `${nb} in all. Lay the sides flat with the holes up and turn the bolts in until they stop.`, kind: "cams", tools: ["screwdriver"], scene: "sides", warnings: ["floor"] }, () => {
      b.stagger(0.15);
      [this.sideL, this.sideR].forEach((key, i) => b.stage(key, [0, T / 2, (i - 0.5) * (D + 120)], [0, 0, Math.PI / 2]));
      b.then(0.15);
      k.fits(HW.camScrew, [...this.bolts(-1), ...this.bolts(1)]);
    });
    if (early)
      k.step({ title: "Screw a suspension fitting into each side", detail: "In the top back corner, three screws each. The hook faces the back.", kind: "screws", tools: ["screwdriver"], scene: "sides" }, () => this.fitSuspension());

    const first: Pose = base ? "-z" : "-x";
    if (L.upright && this.top) {
      // a top cabinet stands on its bottom: both sides onto it, the back down its grooves, the top lowered on last
      const top = this.top;
      k.step({ title: "Tap dowels into the bottom and stand both sides on it", detail: "Bottom flat on a rug. Dowels into both ends, then push the sides down onto them.", kind: "dowels", tools: ["hammer"], warnings: ["floor"] }, () => {
        b.add(this.bottom, [0, 0, 0]);
        b.then(0.15);
        k.fits(HW.dowel, [...this.dowels(1, this.bottom), ...this.dowels(-1, this.bottom)]);
        b.stagger(0.25);
        b.add(this.sideL, [0, 300, 0]);
        b.add(this.sideR, [0, 300, 0]);
      });
      k.step({ title: "Turn the cam locks", detail: "Arrow towards the bolt, then turn clockwise until it pulls tight.", kind: "cams", tools: ["screwdriver"] }, () => k.fits(HW.cam, [...this.cams(1, this.bottom), ...this.cams(-1, this.bottom)]));
      k.step({ title: "Slide the back panel down the grooves", detail: "Smooth side to the inside, from the open top.", kind: "join" }, () => b.add(this.back, [0, Math.min(900, H + 300), 0]));
      k.step({ title: "Tap dowels into the top and lower it on", detail: "Line every dowel and bolt up with its hole and press the top down evenly.", kind: "dowels", tools: ["hammer"] }, () => {
        k.fits(HW.dowel, [...this.dowels(1, top), ...this.dowels(-1, top)]);
        b.add(top, [0, 300, 0]);
      });
      k.step({ title: "Turn the other cam locks", detail: "The same way as on the bottom.", kind: "cams", tools: ["screwdriver"] }, () => k.fits(HW.cam, [...this.cams(1, top), ...this.cams(-1, top)]));
    } else {
    k.step(
      {
        title: base ? "Tap dowels into the bottom and join it to one side" : "Tap dowels into the top and bottom and stand them on one side",
        detail: base ? "Lay the side on its front edge on a rug. Dowels in, then push the bottom onto the cam bolts." : "That side lies flat on a rug, inside up. Dowels into the ends, then push the panels onto the cam bolts.",
        kind: "dowels",
        tools: ["hammer"],
        pose: first,
        warnings: ["floor"],
      },
      () => {
        b.add(this.sideR, [0, 0, 0]);
        b.then(0.15);
        k.fits(HW.dowel, this.dowels(1));
        b.stagger(0.25);
        for (const p of this.panels()) b.add(p, base ? [0, 0, -360] : [-360, 0, 0]);
      },
    );
    k.step({ title: "Turn the cam locks", detail: "Arrow towards the bolt, then turn clockwise until it pulls tight.", kind: "cams", tools: ["screwdriver"], pose: first }, () => k.fits(HW.cam, this.cams(1)));
    k.step({ title: "Slide in the back panel", detail: "Into the grooves, smooth side to the inside, from the open side.", kind: "join", pose: first }, () => b.add(this.back, [-Math.min(900, W + 200), 0, 0]));
    k.step(
      { title: "Tap in the other dowels and fit the other side", detail: "Line every dowel and bolt up with its hole and press the side on evenly.", kind: "dowels", tools: ["hammer"], pose: first, people: this.tall ? 2 : 1 },
      () => {
        k.fits(HW.dowel, this.dowels(-1));
        b.add(this.sideL, [-420, 0, 0]);
      },
    );
    k.step({ title: "Turn the other cam locks", detail: "The same way as on the first side.", kind: "cams", tools: ["screwdriver"], pose: first }, () => k.fits(HW.cam, this.cams(-1)));
    }

    const pose: Pose = "-z";
    const [railF, railB] = this.rails;
    const railScrews = (r: string): FitOpts[] => {
      const z = this.b.partItem(r).final.pos[2];
      const y = this.b.partItem(r).final.pos[1];
      return [-1, 1].map((sx) => ({ on: r, at: [(sx * this.Wi) / 2 - sx * 10, y + 5, z] as Vec3, dir: [0, -1, 0] as Vec3, mate: this.side(sx) }));
    };
    if (base && !L.sink)
      k.step({ title: "Click the clips onto the front rail and screw it on", detail: "Across the top at the front. One screw through each end of the rail into the side.", kind: "screws", tools: ["screwdriver"], pose }, () => {
        b.add(railF, [0, 300, 0]);
        b.then(0.15);
        k.fits(RAIL_CLIP, (W > 700 ? [-0.3, 0, 0.3] : W > 450 ? [-0.25, 0.25] : [0]).map((t) => ({ on: railF, at: [t * this.Wi, H, D / 2 - 40] as Vec3, dir: [0, 1, 0] as Vec3, hole: false as const })));
        k.fits(RAIL_SCREW, railScrews(railF));
      });

    const zn = -D / 2 + G - 3;
    const nail = (at: Vec3, mate: string): FitOpts => ({ on: this.back, at, dir: [0, 0, 1], mate, hole: false });
    const upper = this.top ?? this.bottom;
    const yTop = this.top ? H - T / 2 : H - 30;
    const corners: [Vec3, string][] = [
      [[-this.Wi / 2 + 20, T / 2, zn], this.bottom],
      [[this.Wi / 2 - 20, T / 2, zn], this.bottom],
      [[this.Wi / 2 - 20, yTop, zn], this.top ?? this.sideR],
    ];
    k.step({ title: base ? "Square it up and nail one corner" : "Turn it onto its front, square it up and nail one corner", detail: "Both diagonals the same length. One nail in a bottom corner.", kind: "nails", tools: ["hammer", "tape"], pose, check: "square", warnings: ["square", "floor"] }, () =>
      k.fits(HW.nail, [nail(...corners[0])]),
    );
    k.step({ title: "Nail the other bottom corner", detail: "Keep the back pushed tight to the edge.", kind: "nails", tools: ["hammer"], pose }, () => k.fits(HW.nail, [nail(...corners[1])]));
    k.step({ title: "Nail the top corner", detail: "Check it is still square before you do.", kind: "nails", tools: ["hammer"], pose }, () => k.fits(HW.nail, [nail(...corners[2])]));
    const clips: Vec3[] = [-1, 1].map((sx) => [sx * (this.Wi / 2 - 40), yTop, zn]);
    k.step({ title: "Nail on the two plastic brackets at the top", detail: "One in each top corner of the back, a nail through each.", kind: "nails", tools: ["hammer"], pose }, () => {
      k.fits(BACK_CLIP, clips.map((p) => ({ on: this.back, at: p, dir: [0, 0, 1] as Vec3, hole: false as const })));
      k.fits(HW.nail, clips.map((p) => nail(p, this.top ?? (p[0] < 0 ? this.sideL : this.sideR))));
    });
    const nn = L.nails ?? (L.kind === "high" ? (D >= 500 ? 22 : 24) : 9);
    k.step({ title: "Nail the back all along", detail: `${nn} more nails, about a hand apart, into ${L.kind === "high" ? "the sides, the bottom and the top" : this.top ? "the bottom and the top" : "the bottom and the sides"}.`, kind: "nails", tools: ["hammer"], pose }, () => {
      const edges: [number, number, number, number, string][] = []; // x0, y0, x1, y1, mate
      edges.push([-this.Wi / 2 + 60, T / 2, this.Wi / 2 - 60, T / 2, this.bottom]);
      if (this.top) edges.push([-this.Wi / 2 + 60, H - T / 2, this.Wi / 2 - 60, H - T / 2, upper]);
      if (L.kind !== "wall") for (const sx of [-1, 1]) edges.push([(sx * (this.Wi + 8)) / 2, 150, (sx * (this.Wi + 8)) / 2, H - 150, this.side(sx)]);
      const lens = edges.map((e) => Math.hypot(e[2] - e[0], e[3] - e[1]));
      const total = lens.reduce((a, c) => a + c, 0);
      const counts = lens.map((l) => Math.max(1, Math.round((nn * l) / total)));
      for (let left = nn - counts.reduce((a, c) => a + c, 0), i = 0; left !== 0; i = (i + 1) % counts.length) {
        counts[i] += Math.sign(left);
        left -= Math.sign(left);
      }
      const list: FitOpts[] = [];
      edges.forEach((e, i) => {
        const c = counts[i];
        for (let j = 0; j < c; j++) {
          const t = c === 1 ? 0.5 : j / (c - 1);
          list.push(nail([e[0] + (e[2] - e[0]) * t, e[1] + (e[3] - e[1]) * t, zn], e[4]));
        }
      });
      k.fits(HW.nail, list);
    });

    if (L.grille === "bottom") {
      const g = k.part("Ventilation grille", [this.Wi, 10, 60], [0, T + 5, D / 2 - 40], { material: "metal" });
      k.step({ title: "Stand it up and screw the ventilation grille inside the front", detail: "On the bottom, along the front edge, one screw at each end. Warm air from the fridge rises through it.", kind: "screws", tools: ["screwdriver"], pose: "+y" }, () => {
        b.add(g, [0, 260, 0]);
        b.then(0.15);
        k.fits(SMALL, [-1, 1].map((sx) => ({ on: g, at: [sx * (this.Wi / 2 - 30), T + 10, D / 2 - 40] as Vec3, dir: [0, -1, 0] as Vec3, mate: this.bottom })));
      });
    }

    if (base) {
      if (L.sink)
        k.step({ title: "Stand it up and screw the ventilated rails across the top", detail: "One at the front and one at the back, a screw down through each end into the side.", kind: "screws", tools: ["screwdriver"], pose: "+y" }, () => {
          b.stagger(0.3);
          for (const r of this.rails) b.add(r, [0, 260, 0]);
          b.then(0.15);
          k.fits(RAIL_SCREW, this.rails.flatMap(railScrews));
        });
      else
        k.step({ title: "Stand it up and screw on the back rail", detail: "Across the top at the back, a screw down through each end into the side.", kind: "screws", tools: ["screwdriver"], pose: "+y" }, () => {
          b.add(railB, [0, 260, 0]);
          b.then(0.15);
          k.fits(RAIL_SCREW, railScrews(railB));
        });
      if (!early)
        k.step({ title: "Screw in the suspension fittings", detail: "One in each top back corner, three screws each. The hook faces the back.", kind: "screws", tools: ["screwdriver"], pose: "+y" }, () => this.fitSuspension());
    }
    this.hang();
  }

  hang() {
    const { b, k, W, D } = this;
    const sus = this.sus();
    const ySus = sus[0].at[1];
    const rail = k.part("Suspension rail (not included)", [W + 60, 40, 8], [0, ySus + 10, -D / 2 - 4], { material: "metal", extra: true });
    const legs = this.L.kind === "wall" ? "" : " Click its legs on first if you use them (sold separately).";
    k.step(
      {
        title: this.tall ? "Stand it up together and hang it on the suspension rail" : "Hang it on the suspension rail",
        detail: `Screw the rail level to the wall first (rail, wall screws and plugs aren't included).${legs} Then lift the ${this.what} so both fittings hook over it.`,
        kind: "anchor",
        tools: ["drill", "screwdriver", "level", "pencil"],
        pose: "+y",
        wall: true,
        people: this.tall || W > 700 ? 2 : 1,
        warnings: this.tall || W > 700 ? ["two", "wall"] : ["wall"],
      },
      () => {
        b.add(rail, [0, 0, -200]);
        b.then(0.15);
        const xs = W > 700 ? [-W / 3, 0, W / 3] : [-W / 4, W / 4];
        k.fits(HW.plug, xs.map((x) => ({ on: rail, at: [x, ySus + 10, -D / 2 - 8] as Vec3, dir: [0, 0, -1] as Vec3, hole: false as const })));
        k.fits(HW.wallScrew, xs.map((x) => ({ on: rail, at: [x, ySus + 10, -D / 2 - 6] as Vec3, dir: [0, 0, -1] as Vec3, hole: false as const })));
      },
    );
    k.step({ title: "Adjust the suspension fittings", detail: "Turn the two screws in each: one raises it level, the other pulls it tight to the wall.", kind: "screws", tools: ["screwdriver", "level"] }, () =>
      k.fits(named(b, { kind: "screw", len: 30, dia: 5 }, "Adjusting screw"), sus.map((p) => ({ ...p, at: [p.at[0] - Math.sign(p.at[0]) * 2, p.at[1] + 10, p.at[2] + 12] as Vec3, hole: false as const }))),
    );
    k.step({ title: "Click on the covers", detail: "One over each suspension fitting.", kind: "general" }, () =>
      k.fits(named(b, { kind: "cap", len: 6, dia: 40 }, "Fitting cover"), sus.map((p) => ({ ...p, at: [p.at[0] - Math.sign(p.at[0]) * 8, p.at[1], p.at[2]] as Vec3, dir: [-p.dir[0], 0, 0] as Vec3, hole: false as const }))),
    );
  }

  /* ---------- inside ---------- */

  rowsAt() {
    const total = this.L.rows.reduce((a, r) => a + r.inch, 0);
    let y = 0;
    return this.L.rows.map((r) => {
      const h = (this.H * r.inch) / total;
      const out = { r, lo: y, hi: y + h };
      y += h;
      return out;
    });
  }

  fixedShelves() {
    const { b, k, D } = this;
    const grille = this.L.grille === "shelf" ? 60 : 0; // the air behind an appliance rises through it
    const z0 = -D / 2 + G + grille, z1 = D / 2 - 10;
    for (const f of this.L.fixed) {
      const y = Math.round(this.H * f - T / 2);
      const key = k.part("Fixed shelf", [this.Wi, T, z1 - z0], [0, y, (z0 + z1) / 2]);
      const zs = this.n === 3 ? [z0 + 50, (z0 + z1) / 2, z1 - 50] : [z0 + 50, z1 - 50];
      const pins = [-1, 1].flatMap((sx) => zs.map((z) => ({ on: this.side(sx), at: [(sx * this.Wi) / 2, y - T / 2, z] as Vec3, dir: [sx, 0, 0] as Vec3, hole: false as const })));
      const g = grille ? k.part("Ventilation grille", [this.Wi, 10, grille], [0, y + T / 2 - 5, z0 - grille / 2], { material: "metal" }) : "";
      if (g) {
        k.step({ title: "Screw the ventilation grille onto the fixed shelf", detail: "Along its back edge, one screw at each end. Lay the shelf flat to do it.", kind: "screws", tools: ["screwdriver"], scene: "shelf", warnings: ["floor"] }, () => {
          const c: Vec3 = [0, y, 0];
          for (const key2 of [key, g]) {
            const pp = b.partItem(key2).final.pos;
            b.stage(key2, [pp[0] - c[0], pp[1] - c[1] + T / 2, pp[2] - c[2]], [0, 0, 0]);
          }
          b.then(0.15);
          k.fits(SMALL, [-1, 1].map((sx) => ({ on: g, at: [sx * (this.Wi / 2 - 30), y + T / 2, z0 - 8] as Vec3, dir: [0, -1, 0] as Vec3, mate: key })));
        });
      }
      k.step(
        { title: "Push in the shelf connectors and fit the fixed shelf", detail: `${pins.length} connectors, ${pins.length / 2} into each side at the same height${grille ? ", just above where the appliance ends" : ""}. Lower the shelf onto them${grille ? ", grille to the back" : ""} and turn them until they lock it.`, kind: "shelves", tools: ["screwdriver"] },
        () => {
          k.fits(CONNECTOR, pins);
          b.stagger(0);
          b.add(key, [0, 300, 0]);
          if (g) b.add(g, [0, 300, 0]);
        },
      );
    }
  }

  shelves() {
    const { b, k, D } = this;
    const ys: number[] = [];
    for (const { r, lo, hi } of this.rowsAt()) {
      if (r.kind !== "doors" || !r.shelves) continue;
      for (let i = 1; i <= r.shelves; i++) ys.push(Math.round(lo + ((hi - lo) * i) / (r.shelves + 1)));
    }
    if (!ys.length) return;
    const sd = this.dd - 20;
    const z = D / 2 - sd / 2 - 6;
    const keys = ys.map((y) => k.part(this.glass ? "Glass shelf" : "Shelf", [this.Wi - 2, this.glass ? 6 : T, sd], [0, y, z], { material: this.glass ? "glass" : "board" }));
    const pins = ys.flatMap((y) => [-1, 1].flatMap((sx) => [z - sd / 2 + 40, z + sd / 2 - 40].map((zz) => ({ on: this.side(sx), at: [(sx * this.Wi) / 2, y - (this.glass ? 3 : T / 2), zz] as Vec3, dir: [sx, 0, 0] as Vec3, hole: false as const }))));
    k.step({ title: "Push in the shelf pins", detail: "Four for each shelf, at the same height on both sides.", kind: "shelves" }, () => k.fits(HW.pin, pins));
    k.step({ title: many(ys.length, "Lay the shelf on the pins", "Lay the shelves on the pins"), detail: "Slide each one in from the front until it rests on all four.", kind: "shelves" }, () => {
      b.stagger(0.25);
      for (const key of keys) b.add(key, [0, 0, 420]);
    });
  }

  /** A fixed front: two brackets screwed into the sides, then the front screwed to them. */
  fixedFront(lo: number, hi: number) {
    const { b, k, W, D } = this;
    const fh = hi - lo - DGAP;
    const y = (lo + hi) / 2;
    const key = k.part("Front", [W - DGAP, fh, DT], [0, y, this.fz]);
    const br = [-1, 1].map((sx) => ({ on: this.side(sx), at: [(sx * this.Wi) / 2, y, D / 2 - 15] as Vec3, dir: [sx, 0, 0] as Vec3, hole: false as const }));
    k.step({ title: "Screw the two front brackets into the sides", detail: "Just behind the front edge, at the height of the front. Two screws each.", kind: "screws", tools: ["screwdriver"] }, () => {
      k.fits(FRONT_BRACKET, br);
      k.fits(EURO, br.flatMap((p) => [-12, 12].map((dy) => ({ ...p, at: [p.at[0], p.at[1] + dy, p.at[2] - 12] as Vec3, hole: undefined }))));
    });
    k.step({ title: "Screw the front onto the brackets", detail: "Hold it level with the top edge, then two screws through each bracket into its back.", kind: "screws", tools: ["screwdriver"] }, () => {
      b.add(key, [0, 0, 360]);
      b.then(0.15);
      k.fits(SMALL, br.flatMap((p) => [-12, 12].map((dy) => ({ on: key, at: [p.at[0] - Math.sign(p.at[0]) * 14, p.at[1] + dy, this.fz - DT / 2] as Vec3, dir: [0, 0, 1] as Vec3 }))));
    });
  }

  /** MAXIMERA drawers: each box built on the floor and clicked onto its front, runners into the frame. */
  drawers() {
    const { b, k, W, D } = this;
    const bw = this.Wi - 26;
    const dd = Math.max(250, Math.floor((D - 60) / 50) * 50);
    const zc = D / 2 - 2 - dd / 2;
    const list: Drawer[] = [];
    const box = (size: DSize, inner: boolean, lo: number, hi: number, yb: number, front: string): Drawer => {
      const sh = size === "low" ? 70 : 120;
      const sides = [-1, 1].map((sx) => k.part("Drawer side", [16, sh, dd], [sx * (bw / 2 - 8), yb + sh / 2, zc], { material: "metal" })) as [string, string];
      const back = k.part("Drawer back", [bw - 32, sh - 20, 16], [0, yb + 16 + (sh - 20) / 2, zc - dd / 2 + 10]);
      const bottom = k.part("Drawer bottom", [bw - 32, 16, dd - 20], [0, yb + 8, zc + 8]);
      const rails =
        size === "low"
          ? []
          : (size === "high" ? [60, 140] : [60]).flatMap((dy) => [-1, 1].map((sx) => k.part("Gallery rail", [12, 12, dd - 20], [sx * (bw / 2 - 8), yb + sh + dy, zc + 8], { material: "metal" })));
      return { size, inner, lo, hi, front, sides, back, bottom, rails, yb, sh };
    };
    for (const { r, lo, hi } of this.rowsAt()) {
      if (r.kind !== "drawer") continue;
      const h = hi - lo;
      const size: DSize = h <= 150 ? "low" : h <= 300 ? "medium" : "high";
      const front = k.part("Drawer front", [W - DGAP, h - DGAP, DT], [0, (lo + hi) / 2, this.fz]);
      list.push(box(size, false, lo, hi, lo + 18, front));
      if (r.inner) {
        // an inner drawer behind the top of a tall front, with its own low front
        const ih = 100;
        const iy = hi - ih - 30;
        const ifront = k.part("Inner drawer front", [bw - 32, ih, T], [0, iy + ih / 2, zc + dd / 2 - T / 2]);
        list.push(box("low", true, iy, iy + ih, iy + 6, ifront));
      }
    }
    if (!list.length) return;
    const fitsOf = (d: Drawer) => {
      const z = d.inner ? b.partItem(d.front).final.pos[2] - T / 2 : this.fz - DT / 2;
      return [-1, 1].map((sx) => [sx * (bw / 2 - (d.inner ? 30 : 8)), d.yb + d.sh / 2, z] as Vec3);
    };
    const frontScrews = (d: Drawer) => fitsOf(d).flatMap((p) => [-1, 1].map((q) => ({ on: d.front, at: [p[0] + q * 12, p[1], p[2]] as Vec3, dir: [0, 0, 1] as Vec3 })));
    const bottomScrew = (d: Drawer): FitOpts => ({ on: d.bottom, at: [0, d.yb, zc - dd / 2 + 10], dir: [0, 1, 0], mate: d.back });
    const kinds = [...new Set(list.map((d) => `${d.size}${d.inner ? "-inner" : ""}`))];
    for (const kd of kinds) {
      const group = list.filter((d) => `${d.size}${d.inner ? "-inner" : ""}` === kd);
      const d0 = group[0];
      const scene = `drawer-${kd}`;
      const c0: Vec3 = [0, d0.yb + 80, zc];
      const rel = (key: string): Vec3 => {
        const p = b.partItem(key).final.pos;
        return [p[0] - c0[0], p[1] - c0[1], p[2] - c0[2]];
      };
      const rep = group.length > 1 ? group.length : undefined;
      const which = d0.inner ? " inner" : kinds.length > 1 ? ` ${d0.size}` : "";
      k.step({ title: `Click the back onto the${which} drawer sides`, detail: "Each end of the back hooks into a side with a click.", kind: "drawer", scene, repeat: rep, warnings: ["floor"] }, () => {
        b.stagger(0.25);
        for (const key of [...d0.sides, d0.back]) b.stage(key, rel(key), [0, 0, 0], [0, 0, -260]);
      });
      k.step({ title: "Slide the bottom in and screw it to the back", detail: "It runs in the grooves of the sides. One screw up through the bottom into the back.", kind: "drawer", tools: ["screwdriver"], scene, repeat: rep }, () => {
        b.stage(d0.bottom, rel(d0.bottom), [0, 0, 0], [0, 0, 420]);
        b.then(0.1);
        b.fit(SMALL, bottomScrew(d0));
      });
      k.step({ title: "Screw the front fittings on and click the front onto the drawer", detail: "One fitting at each end of the back of the front, two screws each. Then push the drawer onto them until both click.", kind: "drawer", tools: ["screwdriver"], scene, repeat: rep }, () => {
        b.stage(d0.front, rel(d0.front), [0, 0, 0], [0, 0, 300]);
        b.then(0.1);
        k.fits(FRONT_FIT, fitsOf(d0).map((p) => ({ on: d0.front, at: p, dir: [0, 0, 1] as Vec3, hole: false as const })));
        k.fits(EURO, frontScrews(d0));
      });
      if (d0.rails.length) {
        k.step({ title: d0.rails.length > 2 ? "Click the gallery rails on" : "Click the gallery rails on", detail: "Left and right are marked. Each one clicks into the front and the back.", kind: "drawer", scene, repeat: rep }, () => {
          b.stagger(0.25);
          for (const key of d0.rails) b.stage(key, rel(key), [0, 0, 0], [0, 200, 0]);
        });
        }
    }
    const runner: HwDef = { kind: "runner", len: dd, dia: 20 };
    k.step({ title: "Screw the runners into the cabinet", detail: "A pair for each drawer, front end flush with the frame, in the holes marked for its height. Two screws each.", kind: "runners", tools: ["screwdriver"] }, () => {
      const runners: FitOpts[] = [];
      const screws: FitOpts[] = [];
      for (const d of list)
        for (const sx of [-1, 1]) {
          const x = (sx * this.Wi) / 2;
          runners.push({ on: this.side(sx), at: [x, d.yb + 4, zc], dir: [sx, 0, 0], hole: false });
          for (const dz of [-dd / 2 + 40, dd / 2 - 30]) screws.push({ on: this.side(sx), at: [x - sx * 10, d.yb + 4, zc + dz], dir: [sx, 0, 0] });
        }
      k.fits(runner, runners);
      k.fits(EURO, screws);
    });
    k.step({ title: many(list.length, "Put the drawer on the runners", `Put the ${list.length} drawers on the runners`), detail: "Pull the runners out, rest each drawer on them and push it in until it clicks. Inner drawers first.", kind: "drawer" }, () => {
      const first = new Set(kinds.map((kd) => list.find((d) => `${d.size}${d.inner ? "-inner" : ""}` === kd)));
      const order = [...list.filter((d) => d.inner), ...list.filter((d) => !d.inner)];
      for (const d of order) {
        b.stagger(0);
        for (const key of [d.front, ...d.sides, d.back, d.bottom, ...d.rails]) b.add(key, [0, 0, 520]);
        if (!first.has(d)) {
          for (const p of fitsOf(d)) b.preset(FRONT_FIT, { on: d.front, at: p, dir: [0, 0, 1], hole: false });
          for (const o of frontScrews(d)) b.preset(EURO, o);
          b.preset(SMALL, bottomScrew(d));
        }
        b.wait(0.22);
      }
    });
  }

  doors() {
    const { b, k, W, D } = this;
    interface Door {
      key: string;
      x: number;
      w: number;
      lo: number;
      h: number;
      left: boolean;
      ys: number[];
    }
    const list: Door[] = [];
    for (const { r, lo, hi } of this.rowsAt()) {
      if (r.kind !== "doors") continue;
      const h = hi - lo - DGAP;
      const w = W / r.n - DGAP;
      const nh = h > 1500 ? 4 : h > 1100 ? 3 : 2;
      const ys = Array.from({ length: nh }, (_, i) => Math.round(lo + 100 + ((h - 200) * i) / (nh - 1)));
      for (let i = 0; i < r.n; i++) {
        const x = r.n === 1 ? 0 : (i === 0 ? -1 : 1) * (W / 4);
        const fw = 60;
        const pieces: PartPiece[] | undefined = this.glass
          ? [
              { shape: "box", size: [fw, h, DT], pos: [-w / 2 + fw / 2, 0, 0] },
              { shape: "box", size: [fw, h, DT], pos: [w / 2 - fw / 2, 0, 0] },
              { shape: "box", size: [w - 2 * fw, fw, DT], pos: [0, h / 2 - fw / 2, 0] },
              { shape: "box", size: [w - 2 * fw, fw, DT], pos: [0, -h / 2 + fw / 2, 0] },
              { shape: "box", size: [w - 2 * fw, h - 2 * fw, 4], pos: [0, 0, 0], material: "glass" },
            ]
          : undefined;
        const key = k.part(this.glass ? "Glass door" : "Door", [w, h, DT], [x, lo + DGAP / 2 + h / 2, this.fz], { pieces });
        list.push({ key, x, w, lo, h, left: r.n === 1 || i === 0, ys });
      }
    }
    if (!list.length) return;
    const n = list.length;
    const hx = (d: Door) => (d.left ? d.x - d.w / 2 + 22 : d.x + d.w / 2 - 22);
    k.step({ title: "Press the hinges into " + many(n, "the door", "the doors"), detail: "Lay it face down on a rug. Open each hinge, press its cup into the hole and push the lever down to lock it.", kind: "hinges", scene: "doors", warnings: ["floor", "face"] }, () => {
      b.stagger(0.15);
      let off = 0;
      for (const d of list) {
        b.stage(d.key, [off + d.w / 2, DT / 2, 0], [Math.PI / 2, 0, 0]);
        off += d.w + 90;
      }
      b.then(0.15);
      k.fits(HW.hinge, list.flatMap((d) => d.ys.map((y) => ({ on: d.key, at: [hx(d), y, this.fz - DT / 2] as Vec3, dir: [0, 0, 1] as Vec3, twist: d.left ? 0 : Math.PI }))));
    });
    const plates = list.flatMap((d) => d.ys.map((y) => ({ on: d.left ? this.sideL : this.sideR, at: [d.left ? -this.Wi / 2 : this.Wi / 2, y, D / 2 - 37] as Vec3, dir: [d.left ? -1 : 1, 0, 0] as Vec3 })));
    k.step({ title: "Screw the mounting plates to the " + many(new Set(list.map((d) => d.left)).size, "side", "sides"), detail: "Into the front holes, level with the hinges. Their screws come fitted.", kind: "hinges", tools: ["screwdriver"] }, () => k.fits(PLATE, plates));
    k.step(
      { title: many(n, "Clip the door onto the plates", "Clip the doors onto the plates"), detail: "Hook each hinge over its plate and press until it clicks. Turn the hinge screws until the gaps are even.", kind: "doors", tools: ["screwdriver"], people: list.some((d) => d.h > 1500) ? 2 : 1 },
      () => {
        b.stagger(0.3);
        for (const d of list) b.add(d.key, [0, 0, 360]);
      },
    );
  }

  /** A door that lifts up: a hinge mechanism screwed into each side, plates on the door, the door clicked onto the arms. */
  liftDoor() {
    const { b, k, W, D, H } = this;
    const row = this.rowsAt().find((x) => x.r.kind === "lift");
    if (!row) return;
    const h = row.hi - row.lo - DGAP;
    const key = k.part("Door", [W - DGAP, h, DT], [0, row.lo + DGAP / 2 + h / 2, this.fz]);
    const mech = [-1, 1].map((sx) => ({ on: this.side(sx), at: [(sx * this.Wi) / 2, H - T - 70, D / 2 - 110] as Vec3, dir: [sx, 0, 0] as Vec3, hole: false as const }));
    k.step({ title: "Screw a hinge mechanism into each side", detail: "Near the top front corner, three screws each. Keep them closed: the springs are strong.", kind: "hinges", tools: ["screwdriver"], warnings: ["hand"] }, () => {
      k.fits(named(b, { kind: "hinge", len: 120, dia: 60 }, "Lift-up hinge"), mech);
      k.fits(EURO, mech.flatMap((m) => [-30, 0, 30].map((dz) => ({ ...m, at: [m.at[0], m.at[1] - 40, m.at[2] + dz] as Vec3, hole: undefined }))));
    });
    const plates = [-1, 1].map((sx) => ({ on: key, at: [sx * (this.Wi / 2 - 30), H - 60, this.fz - DT / 2] as Vec3, dir: [0, 0, 1] as Vec3, hole: false as const }));
    k.step({ title: "Screw the two hinge plates onto the door", detail: "Lay it face down on a rug. One plate near each top corner, four screws each.", kind: "hinges", tools: ["screwdriver"], scene: "doors", warnings: ["floor", "face"] }, () => {
      b.stage(key, [0, DT / 2, 0], [Math.PI / 2, 0, 0]);
      b.then(0.15);
      k.fits(named(b, { kind: "plate", len: 10, dia: 50 }, "Hinge plate"), plates);
      k.fits(SMALL, plates.flatMap((p) => [-1, 1].flatMap((dx) => [-1, 1].map((dy) => ({ on: key, at: [p.at[0] + dx * 15, p.at[1] + dy * 12, p.at[2]] as Vec3, dir: [0, 0, 1] as Vec3 })))));
    });
    k.step({ title: "Lift the arms and click the door on", detail: "Raise both arms, hook the plates onto them and press until they click. Then adjust it level.", kind: "doors", tools: ["screwdriver"], people: 2, warnings: ["two", "hand"] }, () => b.add(key, [0, 0, 360]));
  }

  build() {
    this.frame();
    this.fixedShelves();
    this.drawers();
    this.shelves();
    for (const { r, lo, hi } of this.rowsAt()) if (r.kind === "front") this.fixedFront(lo, hi);
    this.doors();
    this.liftDoor();
    const use = this.L.use;
    if (use === "apron") this.k.step({ title: "Ready for the sink", detail: "The apron sink sits on the rails with its front over the open band at the top. Fit it, the tap and the drain following their own instructions.", kind: "general" }, () => {});
    else if (use === "sink") this.k.step({ title: "Ready for the sink", detail: "Fit the sink, tap and drain following their own instructions, or ask a plumber.", kind: "general" }, () => {});
    else if (use === "fridge") this.k.step({ title: "Ready for the fridge", detail: "Slide the fridge or freezer in and fix it following its own instructions. Its doors then join the cabinet doors with the connection hardware sold with it.", kind: "general" }, () => {});
    else if (use === "appliance") this.k.step({ title: "Ready for the appliances", detail: "Fit each one following its own instructions. Have a qualified electrician connect them.", kind: "general" }, () => {});
    else if (use === "hob") this.k.step({ title: "Ready for the cooktop", detail: "It goes in the countertop above. Have a qualified electrician connect it, or a gas fitter for gas.", kind: "general" }, () => {});
  }
}

const family: Family = {
  names: ["SEKTION"],
  build(b, s) {
    if (build(b, s)) return true;
    const L = layoutOf(s);
    if (!L) return false;
    new Sek(b, s, L).build();
    return true;
  },
};
export default family;
