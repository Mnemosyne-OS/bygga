import type { Family } from "./family";
import type { CustomParams, CustomPart, CustomStep, ProductSpec } from "../../types";

/**
 * BALTSAR, read from the swivel chair's manual. No tools and no screws: the column pushes into the round base
 * with a ring, the seat shell presses onto its top with a cup, and the seat pad clips into the shell. Sitting on
 * it presses the shell home. The four-legged chair is sold with no manual to follow, so it keeps its old guide.
 */

function swivel(s: ProductSpec): CustomParams {
  const W = s.size.w * 10, D = s.size.d * 10;
  const H = Math.min(s.size.h * 10, 850); // IKEA: 85 cm at the top of the back
  const seatY = 450; // top of the pad
  const base = 480, bt = 30;
  const shellY = seatY - 25; // top of the shell's seat
  const colTop = shellY - 60;
  const mid = colTop + (H - colTop) / 2;
  const parts: CustomPart[] = [
    { id: "A", name: "Base", shape: "cyl", size: [base, bt, base], pos: [0, bt / 2, 0], material: "metal" },
    { id: "B", name: "Column", shape: "cyl", size: [55, colTop - bt, 55], pos: [0, bt + (colTop - bt) / 2, 0], material: "metal" },
    {
      id: "C",
      name: "Seat shell",
      size: [W, H - colTop, D],
      pos: [0, colTop + (H - colTop) / 2, 0],
      material: "board",
      pieces: [
        // the bowl of the seat, the cup under it, the back and its rounded sides
        { shape: "box", size: [W - 100, 30, D - 60], pos: [0, shellY - 15 - mid, 30] },
        { shape: "cyl", size: [90, 30, 90], pos: [0, colTop + 15 - mid, 0] },
        // the back: straight at the bottom, rounded at the top
        { shape: "box", size: [W - 60, H - shellY - (W - 60) / 2, 30], pos: [0, (shellY + H - (W - 60) / 2) / 2 - mid, -D / 2 + 15] },
        { shape: "halfcyl", size: [W - 60, 30, (W - 60) / 2], pos: [0, H - (W - 60) / 4 - mid, -D / 2 + 15], rot: [-Math.PI / 2, 0, 0] },
        { shape: "box", size: [30, 120, D - 160], pos: [-W / 2 + 15, shellY + 50 - mid, -40] },
        { shape: "box", size: [30, 120, D - 160], pos: [W / 2 - 15, shellY + 50 - mid, -40] },
      ],
    },
    { id: "D", name: "Seat pad", size: [W - 140, 25, D - 130], pos: [0, seatY - 12, 40], material: "soft" },
  ];
  const steps: CustomStep[] = [
    {
      title: "Push the column into the base",
      detail: "Put the ring into the hole in the base first, then push the narrow end of the column into it.",
      add: ["A", "B"],
      fix: [{ kind: "clip", name: "Ring", count: 1, len: 8, dia: 40, at: [[0, bt, 0]], dir: [0, -1, 0], on: "A", mate: "B" }],
      warnings: ["floor"],
    },
    { title: "Press the column down", detail: "Push down hard on top of the column until it sits firmly in the base.", warnings: ["hand"] },
    {
      title: "Press the seat shell onto the column",
      detail: "Fit the cup onto the top of the column, then push the shell straight down onto it.",
      add: ["C"],
      fix: [{ kind: "clip", name: "Cup", count: 1, len: 30, dia: 60, at: [[0, colTop, 0]], dir: [0, -1, 0], on: "B", mate: "C" }],
    },
    {
      title: "Clip in the seat pad",
      detail: "Slide its back edge in under the lip first, then press the front down. Sit on the chair once to press the shell fully home.",
      add: ["D"],
    },
  ];
  return { parts, steps };
}

const family: Family = {
  names: ["BALTSAR"],
  recipe(s) {
    if (/swivel/i.test(s.variant)) return swivel(s);
    return null; // the chair: no manual
  },
};
export default family;
