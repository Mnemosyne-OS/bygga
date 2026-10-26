import type { ProductSpec, ShelfParams, Vec3 } from "../types";
import { HW, PlanBuilder, type FitOpts } from "./builder";
import { FrameKit, anchorStep } from "./frame";
import { clamp } from "./math";

export function defaultsShelf(s: ProductSpec): ShelfParams {
  const p = s.shelf ?? {};
  const grid = p.style === "grid";
  return {
    style: grid ? "grid" : "bookcase",
    cols: clamp(Math.round(p.cols ?? (grid ? 2 : 1)), 1, 5),
    rows: clamp(Math.round(p.rows ?? (grid ? 2 : 1)), 1, 5),
    shelves: clamp(Math.round(p.shelves ?? Math.max(1, Math.round(s.size.h / 45) - 1)), 0, 6),
    fixedShelf: p.fixedShelf ?? s.size.h > 150,
    back: p.back ?? !grid,
    plinth: p.plinth ?? (!grid && s.size.h > 150),
    outer: clamp(p.outer ?? (grid ? 40 : 16), 12, 50),
    inner: clamp(p.inner ?? 16, 12, 30),
  };
}

export function buildShelf(b: PlanBuilder, s: ProductSpec) {
  const p = defaultsShelf(s);
  if (p.style === "grid") return grid(b, s, p);
  return bookcase(b, s, p);
}

function bookcase(b: PlanBuilder, s: ProductSpec, p: ShelfParams) {
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const t = p.outer;
  if (s.shelf?.wall) p.plinth = false;
  const base = p.plinth ? 60 : 0;
  const lying = H > 1100;
  const f = new FrameKit(b, {
    W, H, D, t, base,
    plinth: p.plinth,
    fixed: p.fixedShelf ? [Math.round((base + H) / 2 / 32) * 32] : [],
    back: p.back,
    pinRows: p.shelves > 0,
    lying,
  });
  const two: 1 | 2 = H > 1500 ? 2 : 1;
  f.prepSides();
  f.join(lying ? 1 : two);
  f.otherSide(lying ? 1 : two);
  f.cams();
  f.plinthStep();
  if (p.back) f.backSteps();
  if (p.back || lying) f.standUp();
  f.shelves(p.shelves);
  if (s.shelf?.wall) f.hang();
  else if (H >= 900) f.anchor();
}

/** Cube shelving: full-width top and bottom, sides between, an inner grid on dowels. Built upright from the bottom. */
function grid(b: PlanBuilder, s: ProductSpec, p: ShelfParams) {
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  const T = p.outer, ti = p.inner;
  const { cols, rows } = p;
  const cellW = (W - 2 * T - (cols - 1) * ti) / cols;
  const cellH = (H - 2 * T - (rows - 1) * ti) / rows;
  const zb = D / 2 - 55;
  const zd = Math.max(D / 2 - 120, 30);
  const zi = Math.max(D / 2 - 90, 30);

  const tbT = b.part("Top and bottom", [W, T, D]);
  const bottom = b.place(tbT, [0, T / 2, 0]);
  const top = b.place(tbT, [0, H - T / 2, 0]);
  const sideT = b.part("Side panel", [T, H - 2 * T, D]);
  const sides = [b.place(sideT, [-(W / 2 - T / 2), H / 2, 0]), b.place(sideT, [W / 2 - T / 2, H / 2, 0], [0, Math.PI, 0])];
  const longT = rows > 1 ? b.part("Long shelf", [W - 2 * T, ti, D]) : "";
  const divT = cols > 1 ? b.part("Divider", [ti, cellH, D]) : "";

  const rowY0 = (r: number) => T + r * (cellH + ti); // bottom of row r
  const longs = Array.from({ length: rows - 1 }, (_, r) => b.place(longT, [0, rowY0(r) + cellH + ti / 2, 0]));
  const divX = (c: number) => -W / 2 + T + (c + 1) * cellW + c * ti + ti / 2;
  const divs = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols - 1 }, (_, c) => b.place(divT, [divX(c), rowY0(r) + cellH / 2, 0])),
  );
  const below = (r: number) => (r === 0 ? bottom : longs[r - 1]);
  const above = (r: number) => (r === rows - 1 ? top : longs[r]);
  const sx = W / 2 - T / 2;

  // 1. bottom
  b.step(
    {
      title: "Fit bolts and dowels into the bottom",
      detail: "Twist the bolts in by hand. Tap the dowels in halfway.",
      tools: ["screwdriver", "hammer"],
      kind: "dowels",
      warnings: ["floor"],
    },
    () => {
      b.add(bottom, [0, 160, 0]);
      b.then(0.15);
      const bolts: FitOpts[] = [];
      const dowels: FitOpts[] = [];
      for (const [i, x] of [-sx, sx].entries()) {
        for (const z of [-zb, zb]) bolts.push({ on: bottom, at: [x, T, z], dir: [0, -1, 0], mate: sides[i], mateHole: 4 });
        for (const z of [-zd, zd]) dowels.push({ on: bottom, at: [x, T, z], dir: [0, -1, 0], mate: sides[i] });
      }
      for (const d of divs[0]) for (const z of [-zi, zi]) dowels.push({ on: bottom, at: [b.partItem(d).final.pos[0], T, z], dir: [0, -1, 0], mate: d });
      b.fits(HW.camScrew, bolts, 0.08);
      b.then(0.1);
      b.fits(HW.dowel, dowels, 0.05);
    },
  );

  for (let r = 0; r < rows; r++) {
    if (cols > 1) {
      b.step(
        {
          title: r === 0 ? "Stand the dividers on the dowels" : "Add the next row of dividers",
          detail: "Then tap dowels into their top edges.",
          tools: ["hammer"],
          kind: "join",
        },
        () => {
          b.stagger(0.2);
          divs[r].forEach((d) => b.add(d, [0, 260, 0]));
          b.then(0.15);
          const list: FitOpts[] = [];
          for (const d of divs[r]) {
            const x = b.partItem(d).final.pos[0];
            for (const z of [-zi, zi]) list.push({ on: d, at: [x, rowY0(r) + cellH, z], dir: [0, -1, 0], mate: above(r) });
          }
          b.fits(HW.dowel, list, 0.06);
        },
      );
    }
    if (r < rows - 1) {
      const L = longs[r];
      const yc = rowY0(r) + cellH + ti / 2;
      b.step(
        {
          title: r === 0 ? "Lay the long shelf on top" : "Add the next long shelf",
          detail: "Dowels go into both ends, and on top for the next row.",
          tools: ["hammer"],
          kind: "join",
        },
        () => {
          b.add(L, [0, 280, 0]);
          b.then(0.15);
          const list: FitOpts[] = [];
          for (const [i, x] of [-(W / 2 - T), W / 2 - T].entries())
            for (const z of [-zi, zi]) list.push({ on: L, at: [x, yc, z], dir: [i === 0 ? 1 : -1, 0, 0], mate: sides[i] });
          if (cols > 1)
            for (const d of divs[r + 1]) {
              const x = b.partItem(d).final.pos[0];
              for (const z of [-zi, zi]) list.push({ on: L, at: [x, yc + ti / 2, z], dir: [0, -1, 0], mate: d });
            }
          b.fits(HW.dowel, list, 0.05);
        },
      );
    }
  }
  void below;

  b.step(
    {
      title: "Add both sides",
      detail: "Slide them onto the bolts and dowels from the outside.",
      kind: "join",
      people: H > 1200 ? 2 : 1,
    },
    () => {
      b.stagger(0.3);
      b.add(sides[0], [-420, 0, 0]);
      b.add(sides[1], [420, 0, 0]);
    },
  );

  // top prepared upside down in its own scene
  b.step(
    {
      title: "Fit bolts and dowels into the top",
      detail: "Lay it upside down on the box first.",
      tools: ["screwdriver", "hammer"],
      scene: "top",
      kind: "dowels",
      warnings: ["floor"],
    },
    () => {
      b.stage(top, [0, T / 2, 0], [Math.PI, 0, 0], [0, 160, 0]);
      b.then(0.15);
      const bolts: FitOpts[] = [];
      const dowels: FitOpts[] = [];
      for (const [i, x] of [-sx, sx].entries()) {
        for (const z of [-zb, zb]) bolts.push({ on: top, at: [x, H - T, z], dir: [0, 1, 0], mate: sides[i], mateHole: 4 });
        for (const z of [-zd, zd]) dowels.push({ on: top, at: [x, H - T, z], dir: [0, 1, 0], mate: sides[i] });
      }
      b.fits(HW.camScrew, bolts, 0.08);
      b.then(0.1);
      b.fits(HW.dowel, dowels, 0.06);
    },
  );

  b.step(
    {
      title: "Put the top on",
      detail: "Lower it evenly so every dowel finds its hole.",
      kind: "join",
      people: H > 1200 ? 2 : 1,
      warnings: H > 1200 ? ["two"] : [],
    },
    () => b.add(top, [0, 320, 0]),
  );

  b.step(
    {
      title: "Lock all the cam locks",
      detail: "Arrow towards the bolt, then turn clockwise until it's snug.",
      tools: ["screwdriver"],
      kind: "cams",
    },
    () => {
      const list: FitOpts[] = [];
      for (const [i, side] of sides.entries()) {
        const xi = i === 0 ? -W / 2 + T : W / 2 - T;
        for (const y of [T + 26, H - T - 26]) for (const z of [-zb, zb]) list.push({ on: side, at: [xi, y, z], dir: [i === 0 ? -1 : 1, 0, 0] });
      }
      b.fits(HW.cam, list, 0.08);
    },
  );

  if (H >= 700) anchorStep(b, { W, D, top, y: H, backZ: -D / 2, severe: H > 1200 });
}

export type { Vec3 };
