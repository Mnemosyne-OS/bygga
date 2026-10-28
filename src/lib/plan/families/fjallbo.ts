import type { Family } from "./family";
import type { CustomFix, CustomParams, CustomPart, CustomStep, PartPiece, ProductSpec, Vec3 } from "../../types";

/**
 * FJÄLLBO, read from its manuals. Black square steel tube with perforated mesh and solid wood boards, all joined
 * with small machine screws.
 * Shelving units are built lying on their back on a rug: the mesh shelves (or the bottom mesh shelf and the rails
 * the boards sit on) hook onto one side frame's lugs and get a screw each, the other side frame slides on, the
 * curved brackets under the front of each shelf are screwed to the shelf and bolted through the front posts with a
 * screw and a sleeve nut, the feet go in, and it stands up. The 100 wide unit gets a middle post at the back and the
 * front, held with long screws and angle brackets. The wooden top is screwed into the top frame upside down on the
 * rug, pushed onto the posts and screwed on, two curved braces go under its front corners, and it is fixed to the wall.
 * TV benches have an open back and are built lying on their back too: a side frame, the back top rail, the bottom
 * mesh shelf and the front top rail, the other side frame with two people, the brackets, the middle posts with long
 * screws, the board rails, the feet, then it is stood up for the board, the top, and the mesh doors on their hinges.
 * The 100x95 unit with doors, the desk and the sideboard have their own manuals and keep their old guides for now.
 */

type Kind = CustomFix["kind"];
const T = 25; // square tube
const F = 12; // the feet show under the posts
const PT = 20; // wooden top and boards
const MESH = 2;
const fx = (kind: Kind, at: Vec3[], dir: Vec3, o: Partial<CustomFix> = {}): CustomFix => ({ kind, count: at.length, at, dir, ...o });
const r1 = (n: number) => Math.round(n * 10) / 10;

// fittings, from the manuals' parts pages
const M6 = { len: 12, dia: 6 }; // machine screw, the main one
const ARCH_SCREW = { len: 10, dia: 6 }; // flat-headed, through the bracket and the post into the sleeve nut
const SLEEVE = { name: "Sleeve nut", len: 16, dia: 8 };
const LONG = { len: 70, dia: 5 }; // long screw into a middle post
const WOOD = { len: 16, dia: 4 }; // wood screw through a tab into a board
const FOOT = { len: 20, dia: 25 };

type Box = [Vec3, Vec3]; // lo, hi in product mm
const bx = (lo: Vec3, hi: Vec3): Box => [lo, hi];

/** One part drawn as boxes given by their corners in the product: works out its own box and the pieces in it. */
function part(id: string, name: string, boxes: Box[], material: CustomPart["material"], extra: PartPiece[] = []): CustomPart {
  const lo = [0, 1, 2].map((i) => Math.min(...boxes.map((b) => b[0][i]))) as Vec3;
  const hi = [0, 1, 2].map((i) => Math.max(...boxes.map((b) => b[1][i]))) as Vec3;
  const mid = lo.map((v, i) => r1((v + hi[i]) / 2)) as Vec3;
  const size = lo.map((v, i) => r1(hi[i] - v)) as Vec3;
  if (boxes.length === 1 && !extra.length) return { id, name, size, pos: mid, material };
  const pieces: PartPiece[] = boxes.map(([a, b]) => ({ shape: "box", size: a.map((v, i) => r1(b[i] - v)) as Vec3, pos: a.map((v, i) => r1((v + b[i]) / 2 - mid[i])) as Vec3 }));
  for (const p of extra) pieces.push({ ...p, pos: p.pos.map((v, i) => r1(v - mid[i])) as Vec3 });
  return { id, name, size, pos: mid, material, pieces };
}

interface Body {
  W: number;
  H: number;
  D: number;
  yp: number; // post tops, under the top frame
}
const bodyOf = (s: ProductSpec): Body => {
  const W = s.size.w * 10, H = s.size.h * 10, D = s.size.d * 10;
  return { W, H, D, yp: H - PT - T };
};

/** A side frame: two posts welded to rungs (and on the benches a mesh panel between them). */
function sideFrame(b: Body, id: string, sx: number, rungs: number[], mesh?: [number, number]): CustomPart {
  const x0 = sx < 0 ? -b.W / 2 : b.W / 2 - T, x1 = x0 + T;
  const zb = -b.D / 2, zf = b.D / 2;
  const boxes: Box[] = [bx([x0, F, zb], [x1, b.yp, zb + T]), bx([x0, F, zf - T], [x1, b.yp, zf])];
  for (const y of rungs) boxes.push(bx([x0, y - 20, zb + T], [x1, y, zf - T]));
  if (mesh) boxes.push(bx([x0 + T / 2 - MESH / 2, mesh[0], zb + T], [x0 + T / 2 + MESH / 2, mesh[1], zf - T]));
  return part(id, "Side frame", boxes, "metal");
}

/** A mesh shelf: a frame of flat bar round a perforated sheet. */
function meshShelf(id: string, x0: number, x1: number, z0: number, z1: number, y: number, name = "Mesh shelf"): CustomPart {
  const h = 20, w = 20;
  return part(
    id,
    name,
    [
      bx([x0, y - h, z0], [x1, y, z0 + w]),
      bx([x0, y - h, z1 - w], [x1, y, z1]),
      bx([x0, y - h, z0 + w], [x0 + w, y, z1 - w]),
      bx([x1 - w, y - h, z0 + w], [x1, y, z1 - w]),
      bx([x0 + w, y - MESH - 2, z0 + w], [x1 - w, y - 2, z1 - w]),
    ],
    "metal",
  );
}

/** A curved bracket in the front face, from a post (side sx) in under the front edge of a shelf whose top is at y. */
function arch(b: Body, id: string, sx: number, y: number, name = "Curved bracket", span = 110): CustomPart {
  const xi = sx * (b.W / 2 - T); // inner face of the post
  const z0 = b.D / 2, z1 = z0 + 3;
  const yb = y - 20;
  const along = (x: number) => (sx < 0 ? [xi, xi + x] : [xi - x, xi]) as [number, number];
  const [ax, bx2] = along(span);
  const post = sx < 0 ? [xi - T, xi] : [xi, xi + T];
  // a quarter curve from the post up and in to the shelf, drawn as three short strips
  const u = -sx, R = span * 0.9;
  const strips: PartPiece[] = [0.17, 0.5, 0.83].map((t) => {
    const a = (t * Math.PI) / 2;
    return { shape: "box", size: [R * 0.6, 6, 3], pos: [xi + u * R * (1 - Math.cos(a)), yb - R * (1 - Math.sin(a)), (z0 + z1) / 2], rot: [0, 0, u * (Math.PI / 2 - a)] };
  });
  return part(id, name, [bx([post[0], yb - span, z0], [post[1], yb - span + 60, z1]), bx([sx < 0 ? bx2 - 60 : ax, yb - 20, z0], [sx < 0 ? bx2 : ax + 60, yb, z1])], "metal", strips);
}

/** Two screws through the bracket into the shelf, and two screws and sleeve nuts through the front post. */
function archFix(b: Body, id: string, sx: number, y: number, post: string, span = 110) {
  const xi = sx * (b.W / 2 - T);
  const yb = y - 20;
  const xa = xi - sx * (span - 45);
  const xp = xi - sx * (T / 2);
  return {
    shelf: fx("screw", [[xa - 12, yb - 10, b.D / 2 + 3], [xa + 12, yb - 10, b.D / 2 + 3]], [0, 0, -1], { ...M6, on: id }),
    post: [
      fx("screw", [[xp, yb - span + 15, b.D / 2 + 3], [xp, yb - span + 45, b.D / 2 + 3]], [0, 0, -1], { ...ARCH_SCREW, on: id, mate: post }),
      fx("nut", [[xp, yb - span + 15, b.D / 2 - T], [xp, yb - span + 45, b.D / 2 - T]], [0, 0, 1], { ...SLEEVE, on: post }),
    ],
  };
}

/** The top frame and the wooden top, and the steps that fit them, as every manual does it. */
function topSteps(b: Body, postXs: number[], frontOnly: number[], nTabs: number) {
  const { W, H, D, yp } = b;
  const yf = yp; // bottom of the top frame
  const frame = part(
    "TF",
    "Top frame",
    [
      bx([-W / 2, yf, -D / 2], [W / 2, yf + T, -D / 2 + T]),
      bx([-W / 2, yf, D / 2 - T], [W / 2, yf + T, D / 2]),
      bx([-W / 2, yf, -D / 2 + T], [-W / 2 + T, yf + T, D / 2 - T]),
      bx([W / 2 - T, yf, -D / 2 + T], [W / 2, yf + T, D / 2 - T]),
    ],
    "metal",
  );
  const top: CustomPart = { id: "TP", name: "Top", size: [W, PT, D], pos: [0, H - PT / 2, 0], material: "wood" };
  const half = nTabs / 2;
  const tabX = Array.from({ length: half }, (_, i) => -W / 2 + 60 + ((W - 120) * i) / Math.max(1, half - 1));
  const tabs: Vec3[] = [-1, 1].flatMap((sz) => tabX.map((x) => [x, yf + T, sz * (D / 2 - T - 10)] as Vec3));
  const posts = [...postXs.flatMap((x) => [-1, 1].map((sz) => [x, sz] as const)), ...frontOnly.map((x) => [x, 1] as const)];
  const steps: CustomStep[] = [
    {
      title: "Screw the top into the top frame",
      detail: "Lay the top on a rug, show side down, with the frame on it and its lugs pointing up. One screw through each tab.",
      add: ["TP", "TF"],
      fix: [fx("screw", tabs, [0, 1, 0], { ...WOOD, on: "TF", mate: "TP" })],
      tools: ["screwdriver"],
    },
    { title: "Push the top onto the posts", detail: "Turn it the right way up and lower it so every lug slides over a post end." },
    {
      title: "Screw the top frame to the posts",
      detail: "One screw through each post into its lug.",
      fix: [fx("screw", posts.map(([x, sz]) => [x, yp - 12, sz * (D / 2)] as Vec3), [0, 0, -1], { ...M6, on: "TF" })],
      tools: ["screwdriver"],
    },
  ];
  return { parts: [frame, top], steps };
}

function wallStep(b: Body, two: boolean): CustomStep {
  const pts: Vec3[] = [-1, 1].map((sx) => [sx * (b.W / 2 - 120), b.yp + T / 2, -b.D / 2] as Vec3);
  return {
    title: "Fix it to the wall",
    detail: "Two screws through the back rail of the top frame into the wall. Screws and plugs aren't included: pick ones made for your wall.",
    fix: [fx("plug", pts.map((p) => [p[0], p[1], p[2] - 2] as Vec3), [0, 0, -1]), fx("screw", pts, [0, 0, -1], { len: 50, dia: 5, on: "TF" })],
    tools: ["drill", "screwdriver", "pencil"],
    wall: true,
    people: two ? 2 : 1,
    warnings: two ? ["two", "wall", "tip"] : ["wall", "tip"],
  };
}

const feetAt = (pts: [number, number, string][]) => pts.map(([x, z, on]) => fx("foot", [[x, F, z]], [0, 1, 0], { ...FOOT, on }));

/* ---------- shelving units, 51 and 100 wide ---------- */

function shelving(s: ProductSpec): CustomParams {
  const b = bodyOf(s);
  const { W, H, D } = b;
  const wide = W > 800;
  const levels = [160, 550, 940].map((y) => Math.round((y * H) / 1360)); // shelf tops, from the bottom
  const xs = W / 2 - T / 2, zs = D / 2 - T / 2;
  const xi = W / 2 - T;
  const parts: CustomPart[] = [];
  // the rungs sit under each shelf; on the wide unit under the board rails
  const rungY = (i: number) => (wide && i > 0 ? levels[i] - PT : levels[i]);
  parts.push(sideFrame(b, "L", -1, levels.map((_, i) => rungY(i))), sideFrame(b, "R", 1, levels.map((_, i) => rungY(i))));
  const shelfIds: string[] = [];
  const boardIds: string[] = [];
  const railB: string[] = [], railF: string[] = [];
  if (!wide) {
    levels.forEach((y, i) => {
      parts.push(meshShelf(`S${i}`, -xi, xi, -D / 2, D / 2, y));
      shelfIds.push(`S${i}`);
    });
  } else {
    parts.push(meshShelf("S0", -xi, xi, -D / 2 + T, D / 2 - T, levels[0]));
    shelfIds.push("S0");
    for (const i of [1, 2]) {
      const y = levels[i] - PT;
      parts.push(part(`RB${i}`, "Rail", [bx([-xi, y - T, -D / 2 + T], [xi, y, -D / 2 + 2 * T])], "metal"));
      parts.push(part(`RF${i}`, "Rail", [bx([-xi, y - T, D / 2 - 2 * T], [xi, y, D / 2 - T])], "metal"));
      parts.push({ id: `P${i}`, name: "Shelf board", size: [2 * xi, PT, D - 2 * T], pos: [0, levels[i] - PT / 2, 0], material: "wood" });
      railB.push(`RB${i}`);
      railF.push(`RF${i}`);
      boardIds.push(`P${i}`);
    }
    for (const sz of [-1, 1]) parts.push(part(sz < 0 ? "MB" : "MF", "Middle post", [bx([-T / 2, F, sz < 0 ? -D / 2 : D / 2 - T], [T / 2, b.yp, sz < 0 ? -D / 2 + T : D / 2])], "metal"));
  }
  // what the front brackets hold at each level: the shelf, or the front rail under a board
  const frontAt = (i: number) => (wide && i > 0 ? `RF${i}` : `S${i}`);
  const archY = (i: number) => (wide && i > 0 ? levels[i] - PT : levels[i]);
  const archIds: string[] = [];
  levels.forEach((_, i) => {
    for (const sx of [-1, 1]) {
      const id = `A${i}${sx < 0 ? "l" : "r"}`;
      parts.push(arch(b, id, sx, archY(i)));
      archIds.push(id);
    }
  });
  const sideScrew = (ids: string[], sx: number) =>
    fx(
      "screw",
      ids.map((id) => {
        const i = Number(id.replace(/\D/g, ""));
        const z = id.startsWith("RB") ? -D / 2 + 1.5 * T : -D / 2 + T + 40;
        return [sx * (W / 2), (id.startsWith("S") ? levels[i] : levels[i] - PT) - 10, z] as Vec3;
      }),
      [-sx, 0, 0],
      { ...M6, on: sx < 0 ? "L" : "R" },
    );

  const steps: CustomStep[] = [];
  const lie = "+z" as const;
  if (!wide) {
    steps.push({
      title: "Hook a mesh shelf onto a side frame",
      detail: "Stand the side frame on its long edge on a rug, lugs facing in. The shelf's hooks drop onto the lugs.",
      add: ["L", "S0"],
      pose: lie,
      warnings: ["floor"],
    });
    steps.push({ title: "Hook on the other two shelves", detail: "All three with the same edge to the front.", add: ["S1", "S2"] });
    steps.push({ title: "Screw the shelves to the side frame", detail: "One screw through the frame into each shelf.", fix: [sideScrew(shelfIds, -1)], tools: ["screwdriver"] });
    steps.push({ title: "Slide the other side frame on", detail: "Its lugs go under the shelf hooks, the same way as on the first side.", add: ["R"] });
    steps.push({ title: "Screw the shelves to it", detail: "Three more screws, one into each shelf.", fix: [sideScrew(shelfIds, 1)], tools: ["screwdriver"] });
  } else {
    steps.push({
      title: "Hook the bottom mesh shelf onto a side frame",
      detail: "Stand the side frame on its long edge on a rug, lugs facing in, and drop the shelf onto its lowest lugs.",
      add: ["L", "S0"],
      pose: lie,
      warnings: ["floor"],
    });
    steps.push({ title: "Screw it to the side frame", detail: "One screw through the frame into the shelf.", fix: [sideScrew(["S0"], -1)], tools: ["screwdriver"] });
    steps.push({ title: "Hook on the two back rails", detail: "The ones lying against the rug. Check the lug on each end points the way the drawing shows.", add: railB });
    steps.push({ title: "Screw the back rails on", detail: "One screw into each.", fix: [sideScrew(railB, -1)], tools: ["screwdriver"] });
    steps.push({ title: "Slide the back middle post under the rails", detail: "Holes facing up, its end level with the side frame's posts.", add: ["MB"] });
    steps.push({
      title: "Screw the bottom shelf to the middle post",
      detail: "One long screw down through the shelf into the post.",
      fix: [fx("screw", [[0, levels[0] - 10, -D / 2 + T]], [0, 0, -1], { ...LONG, on: "S0", mate: "MB" })],
      tools: ["screwdriver"],
    });
    steps.push({
      title: "Fix the back rails to the middle post",
      detail: "An angle bracket on each rail, and a long screw through it into the post.",
      fix: [
        fx("angle", railB.map((id) => [T, levels[Number(id.slice(2))] - PT, -D / 2 + 2 * T] as Vec3), [0, 0, -1], { name: "Angle bracket", len: 30, dia: 20, on: railB[0] }),
        fx("screw", railB.map((id) => [T, levels[Number(id.slice(2))] - PT - 10, -D / 2 + 2 * T] as Vec3), [0, 0, -1], { ...LONG, on: "MB" }),
      ],
      tools: ["screwdriver"],
    });
    steps.push({ title: "Hook on the two front rails", detail: "Onto the lugs on the upper posts, hooks the same way as at the back.", add: railF });
    steps.push({ title: "Slide the other side frame on together", detail: "One of you lines up the lugs while the other pushes it home.", add: ["R"], people: 2, warnings: ["two"] });
    steps.push({ title: "Screw it on", detail: "Three screws: the bottom shelf and the two back rails.", fix: [sideScrew(["S0", ...railB], 1)], tools: ["screwdriver"] });
  }

  // the curved brackets: screwed to the shelf, then through the front post
  steps.push({
    title: wide ? "Screw the curved brackets to the shelf and rails" : "Screw the curved brackets to the shelves",
    detail: "One under each front corner, the curve towards the post. Two screws each.",
    add: archIds,
    fix: levels.flatMap((_, i) => [-1, 1].map((sx) => archFix(b, `A${i}${sx < 0 ? "l" : "r"}`, sx, archY(i), sx < 0 ? "L" : "R").shelf)),
    tools: ["screwdriver"],
  });
  const postFix = levels.flatMap((_, i) => [-1, 1].flatMap((sx) => archFix(b, `A${i}${sx < 0 ? "l" : "r"}`, sx, archY(i), sx < 0 ? "L" : "R").post));
  steps.push({
    title: "Bolt the brackets through the front posts",
    detail: "A screw from the front and a sleeve nut from behind, two in each bracket. Hold the nut with one screwdriver and turn the screw with the other.",
    fix: postFix.slice(0, 6),
    tools: ["screwdriver"],
  });
  if (postFix.length > 6) steps.push({ title: "Bolt the rest of the brackets on", detail: "The same way, a screw and a sleeve nut through each hole.", fix: postFix.slice(6), tools: ["screwdriver"] });

  if (wide) {
    steps.push({ title: "Lay the front middle post on the rails", detail: "Holes facing down, its end level with the other posts.", add: ["MF"] });
    steps.push({
      title: "Screw the bottom shelf to it",
      detail: "One long screw up through the shelf into the post.",
      fix: [fx("screw", [[0, levels[0] - 10, D / 2 - T]], [0, 0, 1], { ...LONG, on: "S0", mate: "MF" })],
      tools: ["screwdriver"],
    });
    steps.push({
      title: "Fix the front rails to it",
      detail: "An angle bracket and a long screw at each rail, as at the back.",
      fix: [
        fx("angle", railF.map((id) => [T, levels[Number(id.slice(2))] - PT, D / 2 - 2 * T] as Vec3), [0, 0, 1], { name: "Angle bracket", len: 30, dia: 20, on: railF[0] }),
        fx("screw", railF.map((id) => [T, levels[Number(id.slice(2))] - PT - 10, D / 2 - 2 * T] as Vec3), [0, 0, 1], { ...LONG, on: "MF" }),
      ],
      tools: ["screwdriver"],
    });
    steps.push({ title: "Lay in the two shelf boards", detail: "Tilt each one in between the rails, show side towards the front of the rails.", add: boardIds });
    const boardTabs = (i: number): Vec3[] => [-1, 1].flatMap((sz) => [-0.75, -0.25, 0.25, 0.75].map((t) => [t * xi, levels[i] - PT, sz * (D / 2 - 1.5 * T)] as Vec3));
    steps.push({
      title: "Screw the boards to the rails",
      detail: "Eight screws through the tabs into each board.",
      fix: [1, 2].map((i) => fx("screw", boardTabs(i), [0, 1, 0], { ...WOOD, on: `RB${i}`, mate: `P${i}` })),
      tools: ["screwdriver"],
    });
  }
  const postsAll: [number, number, string][] = [-1, 1].flatMap((sx) => [-1, 1].map((sz) => [sx * xs, sz * zs, sx < 0 ? "L" : "R"] as [number, number, string]));
  if (wide) postsAll.push([0, -zs, "MB"], [0, zs, "MF"]);
  steps.push({ title: `Screw the ${postsAll.length} feet into the posts`, detail: "Turn each one into the bottom end of a post by hand.", fix: feetAt(postsAll) });
  steps.push({ title: wide ? "Stand it up together" : "Stand it up", detail: "Lift it upright from the top, don't drag it up by one post.", pose: "+y", people: wide ? 2 : 1, warnings: wide ? ["two"] : [] });

  const top = topSteps(b, [-xs, xs, ...(wide ? [0] : [])], [], wide ? 8 : 4);
  parts.push(...top.parts);
  steps.push(...top.steps);
  // two curved braces under the front corners of the top, three screws each
  for (const sx of [-1, 1]) parts.push(arch(b, `X${sx < 0 ? "l" : "r"}`, sx, b.yp + 20, "Corner brace", 90));
  steps.push({
    title: "Screw on the two corner braces",
    detail: "Under the front corners of the top frame, curve down. Two screws into the post, one into the frame.",
    add: ["Xl", "Xr"],
    fix: [-1, 1].map((sx) => {
      const xp = sx * (W / 2 - T / 2);
      return fx("screw", [[xp, b.yp - 70, D / 2 + 3], [xp, b.yp - 40, D / 2 + 3], [sx * (xi - 30), b.yp + 12, D / 2 + 3]], [0, 0, -1], { ...M6, on: `X${sx < 0 ? "l" : "r"}` });
    }),
    tools: ["screwdriver"],
  });
  steps.push({ title: "Level it with the feet", detail: "Turn the feet in or out until it stands steady and upright." });
  steps.push(wallStep(b, wide));
  return { parts, steps };
}

/* ---------- TV benches, 150 and 198 wide ---------- */

function bench(s: ProductSpec): CustomParams {
  const b = bodyOf(s);
  const { W, D, yp } = b;
  const bays = W > 1700 ? 4 : 3;
  const n = bays - 1; // middle posts at the front, and as many at the back
  const xi = W / 2 - T;
  const xs = W / 2 - T / 2, zs = D / 2 - T / 2;
  const yb = Math.round(b.H * 0.31); // top of the bottom mesh shelf
  const yr = Math.round(b.H * 0.67) - PT; // top of the board rails
  const zBack = -D / 2; // the back is open: the back posts and rails are flush with it
  const mids = Array.from({ length: n }, (_, i) => -xi + ((2 * xi) * (i + 1)) / bays);
  const parts: CustomPart[] = [sideFrame(b, "L", -1, [yb, yp], [yb, yp - 20]), sideFrame(b, "R", 1, [yb, yp], [yb, yp - 20])];
  parts.push(part("RT", "Top rail", [bx([-xi, yp - T, -D / 2], [xi, yp, -D / 2 + T])], "metal"));
  parts.push(part("RTF", "Top rail", [bx([-xi, yp - T, D / 2 - T], [xi, yp, D / 2])], "metal"));
  // the bottom shelf: one long mesh shelf with a cross bar where each pair of middle posts stands
  const shelf = meshShelf("M", -xi, xi, zBack + T, D / 2 - T, yb, "Bottom shelf");
  for (const x of mids) shelf.pieces!.push({ shape: "box", size: [20, 20, D - 2 * T - 40], pos: [x - shelf.pos[0], yb - 10 - shelf.pos[1], -shelf.pos[2]] });
  parts.push(shelf);
  mids.forEach((x, i) => {
    parts.push(part(`MF${i}`, "Middle post", [bx([x - T / 2, F, D / 2 - T], [x + T / 2, yp - T, D / 2])], "metal"));
    parts.push(part(`MB${i}`, "Middle post", [bx([x - T / 2, F, zBack], [x + T / 2, yp - T, zBack + T])], "metal"));
  });
  parts.push(part("RBk", "Board rail", [bx([-xi, yr - T, zBack + T], [xi, yr, zBack + 2 * T])], "metal"));
  parts.push(part("RFr", "Board rail", [bx([-xi, yr - T, D / 2 - 2 * T], [xi, yr, D / 2 - T])], "metal"));
  parts.push({ id: "P", name: "Shelf board", size: [2 * xi, PT, D / 2 - T - (zBack + T)], pos: [0, yr + PT / 2, (D / 2 - T + zBack + T) / 2], material: "wood" });
  for (const sx of [-1, 1]) parts.push(arch(b, `A${sx < 0 ? "l" : "r"}`, sx, yb));
  // doors: one in each bay, mesh in a frame
  const postX = [-xs, ...mids, xs];
  const doorIds: string[] = [];
  for (let i = 0; i < bays; i++) {
    const x0 = postX[i] + T / 2 + 3, x1 = postX[i + 1] - T / 2 - 3;
    const y0 = yb - 20, y1 = yp - 6, z0 = D / 2, z1 = D / 2 + 18;
    const f = 18;
    parts.push(
      part(
        `D${i}`,
        "Door",
        [
          bx([x0, y0, z0], [x1, y0 + f, z1]),
          bx([x0, y1 - f, z0], [x1, y1, z1]),
          bx([x0, y0 + f, z0], [x0 + f, y1 - f, z1]),
          bx([x1 - f, y0 + f, z0], [x1, y1 - f, z1]),
          bx([x0 + f, y0 + f, z0 + 8], [x1 - f, y1 - f, z0 + 10]),
        ],
        "metal",
      ),
    );
    doorIds.push(`D${i}`);
  }

  const sideScrews = (sx: number, which: ("RT" | "RTF" | "M")[]) =>
    which.map((id) => {
      const y = id === "M" ? yb - 10 : yp - T / 2;
      const z = id === "M" ? -D / 2 + 1.5 * T : id === "RT" ? -D / 2 + T / 2 : D / 2 - T / 2;
      return fx("screw", [[sx * (W / 2), y, z]], [-sx, 0, 0], { ...M6, on: sx < 0 ? "L" : "R", mate: id });
    });
  const steps: CustomStep[] = [
    {
      title: "Slide the top rail onto a side frame",
      detail: "Lying on its back on a rug: the side frame stands on its back edge, the rail lies along the rug against its top lug.",
      add: ["L", "RT"],
      pose: "+z",
      warnings: ["floor"],
    },
    { title: "Screw the rail on", detail: "One screw through the side frame.", fix: sideScrews(-1, ["RT"]), tools: ["screwdriver"] },
    { title: "Hook on the bottom shelf", detail: "Stand it on its edge on the rug. Its hooks drop onto the side frame's lowest lugs.", add: ["M"] },
    { title: "Screw the shelf on", detail: "One screw through the side frame.", fix: sideScrews(-1, ["M"]), tools: ["screwdriver"] },
    { title: "Hook on the front top rail", detail: "Along the top, the lug under its end onto the side frame.", add: ["RTF"] },
    { title: "Screw it on", detail: "One screw through the side frame.", fix: sideScrews(-1, ["RTF"]), tools: ["screwdriver"] },
    { title: "Slide on the other side frame together", detail: "One of you steadies the long parts while the other pushes the frame onto their ends.", add: ["R"], people: 2, warnings: ["two"] },
    { title: "Screw it on", detail: "Three screws: the two top rails and the shelf.", fix: sideScrews(1, ["RT", "M", "RTF"]), tools: ["screwdriver"] },
    {
      title: "Screw the curved brackets to the shelf",
      detail: "One at each front corner of the bottom shelf, curve towards the leg. Two screws each.",
      add: ["Al", "Ar"],
      fix: [-1, 1].map((sx) => archFix(b, `A${sx < 0 ? "l" : "r"}`, sx, yb, sx < 0 ? "L" : "R").shelf),
      tools: ["screwdriver"],
    },
    {
      title: "Bolt the brackets through the legs",
      detail: "A screw from the front and a sleeve nut from behind, two in each bracket.",
      fix: [-1, 1].flatMap((sx) => archFix(b, `A${sx < 0 ? "l" : "r"}`, sx, yb, sx < 0 ? "L" : "R").post),
      tools: ["screwdriver"],
    },
    {
      title: "Screw four feet into the side frames",
      detail: "Into the post ends pointing up, by hand.",
      fix: feetAt([-1, 1].flatMap((sx) => [-1, 1].map((sz) => [sx * xs, sz * zs, sx < 0 ? "L" : "R"] as [number, number, string]))),
    },
    {
      title: n > 2 ? `Fit the ${n} front middle posts` : "Fit the two front middle posts",
      detail: "The posts with hinge holes. Each one sits against the front of the bottom shelf, with a long screw through the shelf into it.",
      add: mids.map((_, i) => `MF${i}`),
      fix: [fx("screw", mids.map((x) => [x, yb - 10, D / 2 - T] as Vec3), [0, 0, 1], { ...LONG, on: "M" })],
      tools: ["screwdriver"],
    },
    {
      title: n > 2 ? `Fit the ${n} back middle posts` : "Fit the two back middle posts",
      detail: "The plain posts, along the back. A long screw through the back of the shelf into each.",
      add: mids.map((_, i) => `MB${i}`),
      fix: [fx("screw", mids.map((x) => [x, yb - 10, -D / 2 + T] as Vec3), [0, 0, -1], { ...LONG, on: "M" })],
      tools: ["screwdriver"],
    },
    {
      title: "Screw in the two board rails",
      detail: "Holes for the board facing the bottom shelf. A long screw through each rail into every middle post.",
      add: ["RBk", "RFr"],
      fix: [
        fx("screw", mids.map((x) => [x, yr - T / 2, zBack + 2 * T] as Vec3), [0, 0, -1], { ...LONG, on: "RBk", mate: "MB0" }),
        fx("screw", mids.map((x) => [x, yr - T / 2, D / 2 - 2 * T] as Vec3), [0, 0, 1], { ...LONG, on: "RFr", mate: "MF0" }),
      ],
      tools: ["screwdriver"],
    },
    {
      title: `Screw ${2 * n} feet into the middle posts`,
      detail: "By hand, the same as the others.",
      fix: feetAt(mids.flatMap((x, i) => [[x, zs, `MF${i}`], [x, zBack + T / 2, `MB${i}`]] as [number, number, string][])),
    },
    { title: "Stand it up together", detail: "Turn it over onto its feet.", pose: "+y", people: 2, warnings: ["two"] },
  ];
  const boardTabs: Vec3[] = [zBack + 1.5 * T, D / 2 - 1.5 * T].flatMap((z) => Array.from({ length: bays + 1 }, (_, i) => [-xi + 60 + ((2 * xi - 120) * i) / bays, yr, z] as Vec3));
  steps.push({ title: "Lay the board on its rails", detail: "Show side up. It drops in between the middle posts.", add: ["P"] });
  steps.push({
    title: "Screw the board to the rails",
    detail: "From underneath, one screw through each tab.",
    fix: [fx("screw", boardTabs, [0, 1, 0], { ...WOOD, on: "RBk", mate: "P" })],
    tools: ["screwdriver"],
  });
  const top = topSteps(b, [-xs, xs], [], 2 * (bays + 1));
  parts.push(...top.parts);
  // the top frame screws into the side frames and the back middle posts; the front ones get their own step
  top.steps[2].fix = [
    fx("screw", [...[-1, 1].flatMap((sx) => [-1, 1].map((sz) => [sx * xs, yp - 12, sz * (D / 2)] as Vec3)), ...mids.map((x) => [x, yp - 12, -D / 2] as Vec3)], [0, 0, 1], { ...M6, on: "TF" }),
  ];
  top.steps[2].detail = "One screw through each corner post, and one through the back rail at each middle post, into the frame.";
  steps.push(...top.steps);
  steps.push({
    title: "Screw the front middle posts to the top rail",
    detail: "One screw at the top of each, through the rail into the post.",
    fix: [fx("screw", mids.map((x) => [x, yp - T / 2, D / 2] as Vec3), [0, 0, -1], { ...M6, on: "RTF" })],
    tools: ["screwdriver"],
  });
  steps.push({ title: "Level it with the feet", detail: "Turn the feet in or out until it stands steady." });
  // doors: hinges on the door, then onto its post; the last door hangs on the right
  const hingeSide = (i: number) => (i === bays - 1 ? 1 : -1);
  const hingeYs = [yb + 40, yp - 60];
  const hingePts = (i: number): Vec3[] => {
    const x = hingeSide(i) < 0 ? postX[i] + T / 2 : postX[i + 1] - T / 2;
    return hingeYs.map((y) => [x, y, D / 2] as Vec3);
  };
  steps.push({
    title: "Screw two hinges onto each door",
    detail: "Lay the doors on the rug, mesh side down. Two screws hold each hinge to the door frame.",
    add: doorIds,
    from: Object.fromEntries(doorIds.map((id) => [id, [0, 0, 500] as Vec3])),
    fix: [
      ...doorIds.map((id, i) => fx("hinge", hingePts(i), [0, 0, -1], { on: id })),
      ...doorIds.map((id, i) => fx("screw", hingePts(i).flatMap((p) => [[p[0] - hingeSide(i) * 10, p[1] - 15, D / 2 + 18], [p[0] - hingeSide(i) * 10, p[1] + 15, D / 2 + 18]] as Vec3[]), [0, 0, -1], { ...M6, on: id })),
    ],
    tools: ["screwdriver"],
  });
  steps.push({
    title: "Hang the doors",
    detail: "Hold each door in its bay and screw its hinges to the post, two screws each. Adjust the hinges until the gaps are even.",
    fix: doorIds.map((id, i) => fx("screw", hingePts(i).flatMap((p) => [[p[0] + hingeSide(i) * 8, p[1] - 15, D / 2], [p[0] + hingeSide(i) * 8, p[1] + 15, D / 2]] as Vec3[]), [0, 0, -1], { ...M6, on: id })),
    tools: ["screwdriver"],
  });
  steps.push({
    title: "Fit the magnetic catches",
    detail: "One on each door, on the edge away from the hinges, with a screw.",
    fix: [
      fx(
        "clip",
        doorIds.map((_, i) => {
          const x = hingeSide(i) < 0 ? postX[i + 1] - T / 2 - 20 : postX[i] + T / 2 + 20;
          return [x, (yb + yp) / 2, D / 2 + 18] as Vec3;
        }),
        [0, 0, -1],
        { name: "Magnetic catch", len: 10, dia: 16, on: doorIds[0] },
      ),
    ],
    tools: ["screwdriver"],
  });
  steps.push(wallStep(b, true));
  return { parts, steps };
}

const family: Family = {
  names: ["FJÄLLBO", "FJALLBO"],
  recipe(s) {
    const slug = s.slug ?? "";
    if (/shelving-unit-(51-x-136|100-x-136)/.test(slug)) return shelving(s);
    if (/tv-(bench|unit)/.test(slug)) return bench(s);
    return null;
  },
};
export default family;
