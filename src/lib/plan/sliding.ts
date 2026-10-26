import type { ProductSpec, Vec3 } from "../types";
import { HW, PlanBuilder, type FitOpts } from "./builder";
import { FrameKit } from "./frame";
import { clamp } from "./math";

/**
 * Wardrobes and cabinets with sliding doors: the usual carcass, a track under the top and one on the bottom,
 * and two or three doors on rollers that run in the two lanes of the tracks, so they pass each other.
 * The back door goes in first, lifted into the top track and lowered into the bottom one.
 */
export function buildSliding(b: PlanBuilder, s: ProductSpec) {
  const c = s.cabinet ?? {};
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const t = clamp(c.thickness ?? 18, 12, 25);
  const plinth = c.plinth ?? s.size.h > 120;
  const base = plinth ? 70 : 0;
  const lying = H > 1100;
  const n = clamp(Math.round(c.slides ?? 2), 2, 3);
  const f = new FrameKit(b, { W, H, D, t, base, plinth, fixed: [], back: true, pinRows: false, lying });
  const inner = W - 2 * t;

  /* ---------- tracks and doors ---------- */
  const trackD = 56, trackZ = D / 2 - trackD / 2 - 2;
  const lanes = [D / 2 - 44, D / 2 - 16]; // back lane, front lane: door centres
  const topY = H - t, botY = base + t; // undersides of the top, top of the bottom panel
  const topT = b.part("Top track", [inner, 24, trackD], { material: "metal" });
  const botT = b.part("Bottom track", [inner, 10, trackD], { material: "metal" });
  const topTrack = b.place(topT, [0, topY - 12, trackZ]);
  const botTrack = b.place(botT, [0, botY + 5, trackZ]);
  const ov = 40; // the doors overlap where they meet
  const dW = (inner + (n - 1) * ov) / n, dT = 16;
  const dLo = botY + 10 + 4, dHi = topY - 24 - 4;
  const dH = dHi - dLo;
  const doorT = b.part("Sliding door", [dW, dH, dT]);
  // two doors: the left one at the back; three: the outer two at the back, the middle one in front
  const doors = Array.from({ length: n }, (_, i) => {
    const lane = n === 2 ? i : i === 1 ? 1 : 0;
    return { lane, x: -inner / 2 + dW / 2 + i * (dW - ov), key: b.place(doorT, [-inner / 2 + dW / 2 + i * (dW - ov), dLo + dH / 2, lanes[lane]]) };
  });
  const back = doors.filter((d) => d.lane === 0), front = doors.filter((d) => d.lane === 1);

  /* ---------- steps: the carcass ---------- */
  f.prepSides();
  f.join();
  f.otherSide();
  f.cams();
  f.plinthStep();
  f.backSteps();
  f.standUp();

  // shelves sit behind the tracks, so they're a little shallower than the carcass
  const shD = D - 26 - trackD, shZ = -D / 2 + 13 + shD / 2;
  const rail = !!c.rail;
  const nSh = clamp(Math.round(c.shelves ?? 1), 0, 4);
  const shelfYs: number[] = rail ? [topY - 320] : Array.from({ length: nSh }, (_, i) => Math.round((botY + ((topY - botY) * (i + 1)) / (nSh + 1)) / 32) * 32);
  if (shelfYs.length) {
    const shT = b.part("Shelf", [inner - 3, t, shD]);
    const shelves = shelfYs.map((y) => b.place(shT, [0, y + 3 + t / 2, shZ]));
    const zs = [shZ + shD / 2 - 30, shZ - shD / 2 + 30];
    for (const y0 of shelfYs)
      for (const dy of [-64, 0, 64])
        for (const [i, side] of f.sides.entries()) for (const z of zs) b.hole(side, [i === 0 ? -W / 2 + t : W / 2 - t, y0 + dy, z], [i === 0 ? 1 : -1, 0, 0], 2.5);
    b.step(
      {
        title: shelves.length > 1 ? "Add the shelf pins and shelves" : rail ? "Add the shelf pins and the top shelf" : "Add the shelf pins and the shelf",
        detail: "Pick any height you like. Use the same hole on all four corners.",
        kind: "shelves",
      },
      () => {
        const pins: FitOpts[] = [];
        for (const y of shelfYs)
          for (const [i, sd] of f.sides.entries()) for (const z of zs) pins.push({ on: sd, at: [i === 0 ? -W / 2 + t : W / 2 - t, y, z], dir: [i === 0 ? -1 : 1, 0, 0], hole: false });
        b.fits(HW.pin, pins, 0.05);
        b.then(0.2);
        b.stagger(0.25);
        shelves.forEach((k) => b.add(k, [0, 0, 420]));
      },
    );
  }
  if (rail) {
    const rT = b.part("Clothes rail", [24, inner - 2, 24], { shape: "cyl", material: "metal" });
    const ry = shelfYs[0] - 80;
    const railKey = b.place(rT, [0, ry, shZ], [0, 0, Math.PI / 2]);
    b.step(
      {
        title: "Fit the clothes rail",
        detail: "Clip the holders on first, then drop the rail in.",
        tools: ["screwdriver"],
        kind: "screws",
      },
      () => {
        b.fits(
          HW.screwS,
          f.sides.map((sd, i) => ({ on: sd, at: [(i === 0 ? -1 : 1) * (W / 2 - t), ry, shZ] as Vec3, dir: [i === 0 ? -1 : 1, 0, 0] as Vec3, hole: false })),
          0.1,
        );
        b.then(0.1);
        b.add(railKey, [0, -180, 260]);
      },
    );
  }

  /* ---------- steps: tracks and doors ---------- */
  b.step(
    {
      title: "Screw the tracks under the top and onto the bottom",
      detail: "Push each one against the front edge, then screw it on.",
      tools: ["screwdriver"],
      kind: "screws",
    },
    () => {
      b.add(topTrack, [0, -220, 0]);
      b.add(botTrack, [0, 220, 0]);
      b.then(0.1);
      const xs = [-inner / 2 + 60, 0, inner / 2 - 60];
      const sc: FitOpts[] = [];
      for (const x of xs) {
        sc.push({ on: topTrack, at: [x, topY - 24, trackZ], dir: [0, 1, 0], hole: false });
        sc.push({ on: botTrack, at: [x, botY + 10, trackZ], dir: [0, -1, 0], hole: false });
      }
      b.fits(HW.screwS, sc, 0.06);
    },
  );

  b.step(
    {
      title: "Screw two rollers onto the top of each door",
      detail: "One near each corner, with the wheels upwards.",
      tools: ["screwdriver"],
      scene: "doors",
      kind: "screws",
      warnings: ["floor"],
    },
    () => {
      b.stagger(0.2);
      doors.forEach((d, i) => b.stage(d.key, [(i - (n - 1) / 2) * (dW + 80), dT / 2, 0], [Math.PI / 2, 0, 0], [0, 160, 0]));
      b.then(0.1);
      const list: FitOpts[] = doors.flatMap((d) => [-1, 1].map((k) => ({ on: d.key, at: [d.x + k * (dW / 2 - 70), dHi, lanes[d.lane]] as Vec3, dir: [0, -1, 0] as Vec3, travel: 40, hole: false as const })));
      b.fits(HW.roller, list, 0.1);
    },
  );

  const tall = dH > 1500;
  const hang = (list: typeof doors, title: string, detail: string) =>
    b.step(
      { title, detail, kind: "doors", people: tall ? 2 : 1, warnings: tall ? ["two"] : [] },
      () => {
        b.stagger(0.4);
        list.forEach((d) => b.add(d.key, [0, 70, 300]));
      },
    );
  hang(back, back.length > 1 ? "Hang the two back doors" : "Hang the back door", "Lift the rollers up into the back of the top track, then lower the door into the bottom track.");
  hang(front, front.length > 1 ? "Hang the front doors" : "Hang the front door", "Same again in the front lane, so it can slide past the other door.");

  // slide a front door across, then back
  const mover = front[0];
  const along = mover.x > 0 ? -1 : 1;
  b.step(
    {
      title: "Slide the doors to check them",
      detail: "Each one should run the full width without catching.",
      kind: "doors",
      weight: 1,
    },
    () => {
      const at = b.partItem(mover.key).final;
      b.stage(mover.key, [at.pos[0] + along * (dW - ov), at.pos[1], at.pos[2]], at.rot);
    },
  );
  b.step(
    {
      title: "Line up the doors",
      detail: "Turn the screw on each roller until the doors hang straight and meet the sides evenly.",
      tools: ["screwdriver"],
      kind: "doors",
      weight: 1,
    },
    () => b.add(mover.key),
  );

  if (H >= 800) f.anchor();
}
