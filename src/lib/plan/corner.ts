import type { ProductSpec, Vec3 } from "../types";
import { HW, PlanBuilder, type FitOpts } from "./builder";
import { clamp } from "./math";

/** One seat section on the floor: its footprint and how its seats run. */
interface Section {
  name: string;
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  seats: number;
  /** seats run front to back (the return of a corner sofa) */
  along: "x" | "z";
  /** where it waits before it is pushed against the others, or none when it stays put */
  slide?: Vec3;
  frame?: string;
  legs: string[];
}

/**
 * Sofas with a chaise longue at one or both ends, and corner sofas (an L with a return on one side).
 * The sections are laid out like the straight sofa: legs in upside down, turned over, then pushed together
 * and bolted, armrests, backrests, and the cushions last.
 */
export function buildCornerSofa(b: PlanBuilder, s: ProductSpec) {
  const p = s.sofa ?? {};
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const arms = p.arms ?? "wide";
  const a = arms === "wide" ? Math.min(170, W * 0.12) : arms === "slim" ? 80 : 0;
  const sd = clamp((p.depth ?? 92) * 10, 700, Math.min(1100, D - 300));
  const legH = 110, baseTop = 300, seatT = 140;
  const fh = baseTop - legH;
  const backT = Math.min(200, sd * 0.22);
  const armH = Math.min(H - 60, 640);
  const hb = H - baseTop;
  const bh = Math.max(240, H - baseTop - seatT - 40);
  const N = clamp(Math.round(p.seats ?? 3), 2, 6);
  const back = -D / 2;
  const corner = p.corner !== undefined;
  // a corner on the left is the right one mirrored
  const sx = p.corner === "left" ? -1 : 1;
  const X = (x: number) => sx * x;

  /* ---------- sections ---------- */
  const secs: Section[] = [];
  const sectionName = (n: number) => `${n}-seat section`;
  let frontArm = false;
  if (!corner) {
    const side = p.chaise ?? "right";
    const nCh = side === "both" ? 2 : 1;
    const cw = (W - 2 * a) / N;
    const nm = N - nCh;
    let x = -W / 2 + a;
    const chaise = (dir: number) => {
      secs.push({ name: "Chaise longue", x0: x, x1: x + cw, z0: back, z1: D / 2, seats: 1, along: "x", slide: [dir * 300, 0, 0], legs: [] });
      x += cw;
    };
    if (side !== "right") chaise(-1);
    if (nm > 0) secs.push({ name: sectionName(nm), x0: x, x1: x + nm * cw, z0: back, z1: back + sd, seats: nm, along: "x", legs: [] });
    x += nm * cw;
    if (side !== "left") chaise(1);
  } else {
    const n1 = Math.ceil((N - 1) / 2);
    const nRet = N - 1 - n1;
    // a corner with no seats in front of it is open there: no armrest across the seat
    frontArm = !p.open && nRet > 0 && a > 0;
    const aFront = frontArm ? a : 0;
    secs.push({ name: sectionName(n1), x0: -W / 2 + a, x1: W / 2 - sd, z0: back, z1: back + sd, seats: n1, along: "x", slide: [-300, 0, 0], legs: [] });
    secs.push({ name: "Corner section", x0: W / 2 - sd, x1: W / 2, z0: back, z1: back + sd, seats: 1, along: "x", legs: [] });
    if (nRet > 0) secs.push({ name: sectionName(nRet), x0: W / 2 - sd, x1: W / 2, z0: back + sd, z1: D / 2 - aFront, seats: nRet, along: "z", slide: [0, 0, 300], legs: [] });
  }

  // parts of the same name and size are one part, however they are turned
  const types = new Map<string, string>();
  const soft = (name: string, size: Vec3) => {
    const k = `${name}|${size.map(Math.round).join("x")}`;
    if (!types.has(k)) types.set(k, b.part(name, size, { material: "soft" }));
    return types.get(k)!;
  };

  // frames and legs
  const legT = b.part("Leg", [42, legH, 42], { shape: "cyl", material: "wood" });
  for (const sec of secs) {
    const lx = sec.x1 - sec.x0, lz = sec.z1 - sec.z0;
    const turned = sec.along === "z";
    const cx = (sec.x0 + sec.x1) / 2, cz = (sec.z0 + sec.z1) / 2;
    sec.frame = b.place(soft(sec.name, turned ? [lz, fh, lx] : [lx, fh, lz]), [X(cx), legH + fh / 2, cz], turned ? [0, Math.PI / 2, 0] : [0, 0, 0]);
    const ix = Math.min(60, lx / 4), iz = Math.min(70, lz / 4);
    const xs = [sec.x0 + ix, sec.x1 - ix];
    const zs = [sec.z0 + iz, sec.z1 - iz];
    if (lx > 2000) xs.splice(1, 0, cx);
    if (lz > 2000) zs.splice(1, 0, cz);
    for (const x of xs) for (const z of zs) sec.legs.push(b.place(legT, [X(x), legH / 2, z]));
  }

  // armrests: at the outer ends, and at the front of a corner sofa's return
  const armKeys: { key: string; from: Vec3 }[] = [];
  const ah = armH - legH + 40, ay = legH - 40 + ah / 2;
  if (a > 0) {
    const first = secs[0], last = secs[secs.length - 1];
    // an armrest along a chaise longue is longer than the others
    const typeFor = (d: number) => soft(Math.abs(d - sd) < 1 ? "Armrest" : "Chaise armrest", [a, ah, d]);
    const depthOf = (sec: Section) => sec.z1 - sec.z0;
    armKeys.push({ key: b.place(typeFor(depthOf(first)), [X(-W / 2 + a / 2), ay, (first.z0 + first.z1) / 2]), from: [X(-420), 0, 0] });
    if (!corner) armKeys.push({ key: b.place(typeFor(depthOf(last)), [W / 2 - a / 2, ay, (last.z0 + last.z1) / 2]), from: [420, 0, 0] });
    else if (frontArm) armKeys.push({ key: b.place(typeFor(sd), [X(W / 2 - sd / 2), ay, D / 2 - a / 2], [0, Math.PI / 2, 0]), from: [0, 0, 420] });
  }

  // backrests, along the back and down the outer side of a corner sofa's return
  const backs: { key: string; bolts: FitOpts[] }[] = [];
  const by = baseTop + hb / 2;
  const boltY = baseTop + 60;
  for (const sec of secs) {
    if (sec.name === "Corner section") {
      const c = b.compound(
        "Corner backrest",
        [
          { shape: "box", size: [sd, hb, backT], pos: [X(W / 2 - sd / 2), by, back + backT / 2] },
          { shape: "box", size: [backT, hb, sd - backT], pos: [X(W / 2 - backT / 2), by, back + backT + (sd - backT) / 2] },
        ],
        { material: "soft" },
      );
      const key = b.place(c.type, c.mid);
      backs.push({ key, bolts: [{ on: key, at: [X(W / 2 - sd / 2), boltY, back], dir: [0, 0, 1], mate: sec.frame }, { on: key, at: [X(W / 2), boltY, back + sd / 2], dir: [X(-1), 0, 0], mate: sec.frame }] });
    } else if (sec.along === "z") {
      const len = sec.z1 - sec.z0;
      const t = soft(`Backrest, ${sec.seats}-seat`, [len, hb, backT]);
      const key = b.place(t, [X(W / 2 - backT / 2), by, (sec.z0 + sec.z1) / 2], [0, Math.PI / 2, 0]);
      const n = len > 1600 ? 3 : 2;
      backs.push({ key, bolts: Array.from({ length: n }, (_, i) => ({ on: key, at: [X(W / 2), boltY, sec.z0 + (len * (i + 1)) / (n + 1)] as Vec3, dir: [X(-1), 0, 0] as Vec3, mate: sec.frame })) });
    } else {
      const len = sec.x1 - sec.x0;
      const t = soft(sec.name === "Chaise longue" ? "Chaise backrest" : `Backrest, ${sec.seats}-seat`, [len, hb, backT]);
      const key = b.place(t, [X((sec.x0 + sec.x1) / 2), by, back + backT / 2]);
      const n = len > 1600 ? 3 : len > 800 ? 2 : 1;
      backs.push({ key, bolts: Array.from({ length: n }, (_, i) => ({ on: key, at: [X(sec.x0 + (len * (i + 1)) / (n + 1)), boltY, back] as Vec3, dir: [0, 0, 1] as Vec3, mate: sec.frame })) });
    }
  }

  // cushions
  const seatCs: string[] = [];
  const backCs: string[] = [];
  const cd = sd - backT - 16;
  const zSeat = back + backT + 8 + cd / 2;
  const zBack = back + backT + 80;
  for (const sec of secs) {
    if (sec.along === "x") {
      const cw = (sec.x1 - sec.x0) / sec.seats;
      const depth = sec.z1 - sec.z0 - backT - 16;
      const isCorner = sec.name === "Corner section";
      for (let i = 0; i < sec.seats; i++) {
        const x = sec.x0 + cw * (i + 0.5);
        if (isCorner) {
          // the corner seat stops at the side backrest
          const cx = W / 2 - backT - 8 - cd / 2;
          seatCs.push(b.place(soft("Seat cushion", [cd, seatT, cd]), [X(cx), baseTop + seatT / 2, zSeat]));
          backCs.push(b.place(soft("Back cushion", [sd - backT - 14, bh, 170]), [X(W / 2 - backT - (sd - backT) / 2), baseTop + seatT + bh / 2 - 6, zBack], [-0.16, 0, 0]));
          continue;
        }
        const sz = sec.name === "Chaise longue" ? "Chaise cushion" : "Seat cushion";
        seatCs.push(b.place(soft(sz, [cw - 8, seatT, depth]), [X(x), baseTop + seatT / 2, back + backT + 8 + depth / 2]));
        backCs.push(b.place(soft("Back cushion", [cw - 14, bh, 170]), [X(x), baseTop + seatT + bh / 2 - 6, zBack], [-0.16, 0, 0]));
      }
    } else {
      const cw = (sec.z1 - sec.z0) / sec.seats;
      const cx = W / 2 - backT - 8 - cd / 2;
      for (let i = 0; i < sec.seats; i++) {
        const z = sec.z0 + cw * (i + 0.5);
        seatCs.push(b.place(soft("Seat cushion", [cw - 8, seatT, cd]), [X(cx), baseTop + seatT / 2, z], [0, Math.PI / 2, 0]));
        // thin across, leaning out against the side backrest
        backCs.push(b.place(soft("Back cushion", [170, bh, cw - 14]), [X(W / 2 - backT - 80), baseTop + seatT + bh / 2 - 6, z], [0, 0, X(-0.16)]));
      }
    }
  }

  /* ---------- steps ---------- */
  const at = (key: string) => b.partItem(key).final;
  const moved = (pos: Vec3, off: Vec3): Vec3 => [pos[0] + off[0], pos[1] + off[1], pos[2] + off[2]];
  const slid = (sec: Section) => (sec.slide ? ([X(sec.slide[0]), sec.slide[1], sec.slide[2]] as Vec3) : null);

  b.step(
    {
      title: "Lay the sections upside down",
      detail: "Put a blanket or the flattened box under them first.",
      pose: "-y",
      kind: "general",
      people: 2,
      warnings: ["two", "floor"],
    },
    () => {
      b.stagger(0.3);
      for (const sec of secs) {
        const off = slid(sec);
        if (off) b.stage(sec.frame!, moved(at(sec.frame!).pos, off), at(sec.frame!).rot, [0, 220, 0]);
        else b.add(sec.frame!, [0, 220, 0]);
      }
    },
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
      b.stagger(0.14);
      for (const sec of secs) {
        const off = slid(sec);
        for (const l of sec.legs) {
          if (off) b.stage(l, moved(at(l).pos, off), [0, 0, 0], [0, -260, 0]);
          else b.add(l, [0, -260, 0], { spin: 2 });
        }
      }
    },
  );
  b.step(
    {
      title: "Turn them over together",
      detail: "Lift them by the frame, never by the legs.",
      pose: "+y",
      kind: "flip",
      people: 2,
      warnings: ["two"],
    },
    () => {},
  );

  const sliders = secs.filter((x) => x.slide);
  b.step(
    {
      title: corner ? (sliders.length > 1 ? "Join the sections to the corner" : "Join the section to the corner") : sliders.length > 1 ? "Join the chaise longues to the sofa" : "Join the chaise longue to the sofa",
      detail: "Push them together, then bolt them through the frames.",
      tools: ["allen"],
      people: 2,
      kind: "join",
      warnings: ["two"],
    },
    () => {
      b.stagger(0.35);
      for (const sec of sliders) {
        b.add(sec.frame!);
        for (const l of sec.legs) b.add(l);
        b.stagger(0);
      }
      b.then(0.1);
      const bolts: FitOpts[] = [];
      for (const sec of sliders) {
        const fixed = corner ? secs[1] : secs.find((x) => !x.slide);
        if (!fixed) continue;
        const y = legH + 90;
        if (sec.along === "z") {
          // the return meets the corner along its back edge
          for (const f of [0.3, 0.7]) bolts.push({ on: sec.frame, at: [X(sec.x0 + (sec.x1 - sec.x0) * f), y, sec.z0], dir: [0, 0, 1], mate: fixed.frame });
        } else {
          const right = sec.x0 >= fixed.x1 - 1;
          const jx = right ? sec.x0 : sec.x1;
          for (const f of [0.3, 0.7]) bolts.push({ on: sec.frame, at: [X(jx), y, back + sd * f], dir: [X(right ? 1 : -1), 0, 0], mate: fixed.frame });
        }
      }
      b.fits(HW.boltL, bolts, 0.1);
    },
  );

  if (armKeys.length) {
    b.step(
      {
        title: armKeys.length > 1 ? "Bolt on the armrests" : "Bolt on the armrest",
        detail: armKeys.length > 1 ? "Line up the holes, then bolt loosely. Tighten once both arms are on." : "Line up the holes, then bolt it on firmly.",
        tools: ["allen"],
        kind: "bolts",
        warnings: armKeys.length > 1 ? ["loose"] : [],
      },
      () => {
        b.stagger(0.3);
        armKeys.forEach((k) => b.add(k.key, k.from));
        b.then(0.1);
        const bolts: FitOpts[] = [];
        for (const k of armKeys) {
          const pos = at(k.key).pos;
          const turned = at(k.key).rot[1] !== 0;
          if (!turned) {
            const sgn = Math.sign(pos[0]);
            const sec = sgn * sx < 0 ? secs[0] : secs[secs.length - 1];
            const depth = (sec.z1 - sec.z0) / 2;
            for (const f of [-0.5, 0.5]) bolts.push({ on: k.key, at: [pos[0] - (sgn * a) / 2, legH + 90, pos[2] + f * depth] as Vec3, dir: [sgn, 0, 0] as Vec3, mate: sec.frame });
          } else {
            const sec = secs[secs.length - 1];
            for (const f of [-0.25, 0.25]) bolts.push({ on: k.key, at: [pos[0] + f * sd, legH + 90, pos[2] - a / 2] as Vec3, dir: [0, 0, 1] as Vec3, mate: sec.frame });
          }
        }
        b.fits(HW.boltL, bolts, 0.1);
      },
    );
  }

  b.step(
    {
      title: "Attach the backrests",
      detail: "Slide each one down behind the seat, then bolt it from the back.",
      tools: ["allen"],
      kind: "bolts",
      people: 2,
      warnings: ["two"],
    },
    () => {
      b.stagger(0.3);
      // the backrest of a return comes in from its side
      for (const bk of backs) b.add(bk.key, at(bk.key).rot[1] !== 0 ? [X(420), 120, 0] : [0, 120, -420]);
      b.then(0.1);
      b.fits(
        HW.boltL,
        backs.flatMap((bk) => bk.bolts),
        0.1,
      );
    },
  );
  b.step(
    {
      title: "Drop in the seat cushions",
      detail: "Zips face the back.",
      kind: "cushions",
    },
    () => {
      b.stagger(0.14);
      seatCs.forEach((k) => b.add(k, [0, 320, 0]));
    },
  );
  b.step(
    {
      title: "Add the back cushions",
      detail: "Plump them up and lean them against the backrest.",
      kind: "cushions",
    },
    () => {
      b.stagger(0.14);
      backCs.forEach((k) => b.add(k, at(k).rot[2] !== 0 ? [X(-360), 160, 0] : [0, 160, 360]));
    },
  );
}
