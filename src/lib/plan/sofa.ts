import type { ProductSpec, SofaParams, Vec3 } from "../types";
import { HW, PlanBuilder, type FitOpts } from "./builder";
import { clamp } from "./math";

export function defaultsSofa(s: ProductSpec): SofaParams {
  const p = s.sofa ?? {};
  return {
    seats: clamp(Math.round(p.seats ?? Math.max(1, Math.round((s.size.w - 30) / 62))), 1, 4),
    arms: p.arms ?? "wide",
    legs: p.legs ?? "round",
  };
}

/** Upholstered sofas and armchairs: legs on the base, arms and back bolted on, cushions last. */
export function buildSofa(b: PlanBuilder, s: ProductSpec) {
  const p = defaultsSofa(s);
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const a = p.arms === "wide" ? Math.min(170, W * 0.12) : p.arms === "slim" ? 80 : 0;
  const legH = p.legs === "round" ? 110 : 70;
  const baseTop = 300;
  const backT = Math.min(200, D * 0.22);
  const armH = Math.min(H - 60, 640);
  const seatT = 140;
  const big = W > 1500;

  const baseT = b.part("Seat frame", [W - 2 * a, baseTop - legH, D], { material: "soft" });
  const base = b.place(baseT, [0, legH + (baseTop - legH) / 2, 0]);
  const legT = b.part("Leg", p.legs === "round" ? [42, legH, 42] : [56, legH, 56], { shape: p.legs === "round" ? "cyl" : "box", material: "wood" });
  const lx = W / 2 - a - 60, lz = D / 2 - 70;
  const legPts: [number, number][] = [
    [-lx, lz],
    [lx, lz],
    [lx, -lz],
    [-lx, -lz],
  ];
  if (W > 2000) legPts.push([0, lz], [0, -lz]);
  const legs = legPts.map(([x, z]) => b.place(legT, [x, legH / 2, z]));
  const arms: string[] = [];
  if (a > 0) {
    const armT = b.part("Armrest", [a, armH - legH + 40, D], { material: "soft" });
    for (const sgn of [-1, 1]) arms.push(b.place(armT, [sgn * (W / 2 - a / 2), legH - 40 + (armH - legH + 40) / 2, 0]));
  }
  const backPT = b.part("Backrest", [W - 2 * a, H - baseTop, backT], { material: "soft" });
  const back = b.place(backPT, [0, baseTop + (H - baseTop) / 2, -D / 2 + backT / 2]);
  const cw = (W - 2 * a) / p.seats;
  const seatCT = b.part("Seat cushion", [cw - 8, seatT, D - backT - 16], { material: "soft" });
  const seats = Array.from({ length: p.seats }, (_, i) => b.place(seatCT, [-(W - 2 * a) / 2 + cw * (i + 0.5), baseTop + seatT / 2, backT / 2 + 4]));
  const bh = Math.max(240, H - baseTop - seatT - 40);
  const backCT = b.part("Back cushion", [cw - 14, bh, 170], { material: "soft" });
  const backs = Array.from({ length: p.seats }, (_, i) =>
    b.place(backCT, [-(W - 2 * a) / 2 + cw * (i + 0.5), baseTop + seatT + bh / 2 - 6, -D / 2 + backT + 80], [-0.16, 0, 0]),
  );

  b.step(
    {
      title: "Lay the seat frame upside down",
      detail: "Put a blanket or the flattened box under it first.",
      pose: "-y",
      kind: "general",
      people: big ? 2 : 1,
      warnings: big ? ["two", "floor"] : ["floor"],
    },
    () => b.add(base, [0, 220, 0]),
  );
  b.step(
    {
      title: "Screw in the legs",
      detail: "Clockwise by hand until each one is snug.",
      pose: "-y",
      kind: "legs",
      warnings: ["hand"],
    },
    () => {
      b.stagger(0.22);
      legs.forEach((l) => b.add(l, [0, -260, 0], { spin: 2 }));
    },
  );
  b.step(
    {
      title: big ? "Turn it over together" : "Turn it over",
      detail: "Lift it by the frame, never by the legs.",
      pose: "+y",
      kind: "flip",
      people: big ? 2 : 1,
      warnings: big ? ["two"] : [],
    },
    () => {},
  );
  if (arms.length) {
    b.step(
      {
        title: "Bolt on the armrests",
        detail: "Line up the holes, then bolt loosely. Tighten once both arms are on.",
        tools: ["allen"],
        kind: "bolts",
        warnings: ["loose"],
      },
      () => {
        b.stagger(0.3);
        arms.forEach((k, i) => b.add(k, [(i === 0 ? -1 : 1) * 420, 0, 0]));
        b.then(0.1);
        const bolts: FitOpts[] = [];
        arms.forEach((k, i) => {
          const sgn = i === 0 ? -1 : 1;
          for (const z of [-D / 4, D / 4]) bolts.push({ on: k, at: [sgn * (W / 2 - a), legH + 90, z] as Vec3, dir: [sgn, 0, 0] as Vec3, mate: base });
        });
        b.fits(HW.boltL, bolts, 0.1);
      },
    );
  }
  b.step(
    {
      title: "Attach the backrest",
      detail: "Slide it down behind the seat, then bolt it from the back.",
      tools: ["allen"],
      kind: "bolts",
      people: big ? 2 : 1,
      warnings: big ? ["two"] : [],
    },
    () => {
      b.add(back, [0, 120, -420]);
      b.then(0.1);
      const n = W > 1600 ? 3 : 2;
      const bolts: FitOpts[] = Array.from({ length: n }, (_, i) => ({ on: back, at: [-(W - 2 * a) / 2 + ((W - 2 * a) * (i + 1)) / (n + 1), baseTop + 60, -D / 2] as Vec3, dir: [0, 0, 1] as Vec3, mate: base }));
      b.fits(HW.boltL, bolts, 0.12);
    },
  );
  b.step(
    {
      title: p.seats > 1 ? "Drop in the seat cushions" : "Drop in the seat cushion",
      detail: "Zips face the back.",
      kind: "cushions",
    },
    () => {
      b.stagger(0.18);
      seats.forEach((k) => b.add(k, [0, 320, 0]));
    },
  );
  b.step(
    {
      title: p.seats > 1 ? "Add the back cushions" : "Add the back cushion",
      detail: "Plump them up and lean them against the backrest.",
      kind: "cushions",
    },
    () => {
      b.stagger(0.18);
      backs.forEach((k) => b.add(k, [0, 160, 360]));
    },
  );
}
