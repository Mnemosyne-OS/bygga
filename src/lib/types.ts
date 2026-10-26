export type Vec3 = [number, number, number];

export type Archetype = "shelf" | "drawers" | "table" | "bed" | "cabinet" | "seat" | "sofa" | "custom";

export interface ShelfParams {
  style: "grid" | "bookcase";
  cols: number;
  rows: number;
  shelves: number; // adjustable shelves (bookcase)
  fixedShelf: boolean;
  back: boolean;
  plinth: boolean;
  outer: number; // mm panel thickness of frame
  inner: number; // mm thickness of inner shelves/dividers
  wall?: boolean; // hangs on the wall instead of standing on the floor
}

export interface DrawersParams {
  cols: 1 | 2;
  rows: number;
  knobs: "none" | "knob" | "bar";
  plinth: boolean;
  thickness: number;
}

export interface TableParams {
  topThickness: number;
  legs: "square" | "round";
  legSize: number;
  shelf: boolean;
  attach: "screw" | "plate" | "apron";
  round?: boolean; // round top, size.w is the diameter
}

export interface BedParams {
  mattressW: number; // cm
  mattressL: number; // cm
  headH: number; // cm
  footH: number; // cm, 0 for none
  slats: number;
  centerBeam: boolean;
}

export interface CabinetParams {
  fronts: "doors" | "tilt";
  compartments: number;
  doors: 0 | 1 | 2;
  shelves: number;
  rail: boolean;
  plinth: boolean;
  handles: "knob" | "bar" | "none";
  thickness: number;
  wall?: boolean; // hangs on the wall instead of standing on the floor
}

export interface SeatParams {
  kind: "stool" | "chair" | "bench" | "office";
  seat: "round" | "square";
  seatH: number; // cm
  backH: number; // cm (chair total height)
  stretchers: boolean;
  splay: boolean;
  arms?: boolean; // office chairs: armrests
}

export interface SofaParams {
  seats: number;
  arms: "wide" | "slim" | "none";
  legs: "round" | "block";
  chaise?: "left" | "right" | "both"; // a chaise longue at that end, seen from the front; size.d is its length
  corner?: "left" | "right"; // an L: the return runs forward on that side; size.d is its length
  open?: boolean; // corner sofas: no armrest at the front of the return
  depth?: number; // cm, depth of the seat sections of a corner or chaise sofa
}

/** A product read from someone's own manual: parts as boxes in the assembled product, steps that add them. */
export interface CustomPart {
  id: string;
  label?: string; // the manual's own part number or letter, when short
  name: string;
  size: Vec3; // mm along x (width), y (height), z (depth) as it sits in the finished product
  pos: Vec3; // mm, centre of the part; y up from the floor, x left to right, z back to front
  shape?: "box" | "cyl";
  material?: PartMaterial;
}

export interface CustomFix {
  kind: HwKind;
  count: number;
  len?: number;
  dia?: number;
  to?: string[]; // parts it goes into, when the manual says
}

export interface CustomStep {
  title: string;
  detail?: string;
  add?: string[];
  fix?: CustomFix[];
  tools?: ToolId[];
  people?: 1 | 2;
  pose?: Pose;
  warnings?: WarnId[];
}

export interface CustomParams {
  parts: CustomPart[];
  steps: CustomStep[];
  fromCover?: boolean;
}

export type TipKey =
  | "general"
  | "frame"
  | "back"
  | "shelves"
  | "drawers"
  | "doors"
  | "legs"
  | "slats"
  | "cushions"
  | "anchor";

export interface ProductSpec {
  name: string;
  variant: string;
  category: string;
  archetype: Archetype;
  size: { w: number; h: number; d: number }; // cm
  minutes: number;
  people: 1 | 2;
  difficulty: 1 | 2 | 3;
  material?: string;
  shelf?: Partial<ShelfParams>;
  drawers?: Partial<DrawersParams>;
  table?: Partial<TableParams>;
  bed?: Partial<BedParams>;
  cabinet?: Partial<CabinetParams>;
  seat?: Partial<SeatParams>;
  sofa?: Partial<SofaParams>;
  custom?: CustomParams;
  brand?: string;
  tips?: Partial<Record<TipKey, string>>;
  watchOut?: string[];
  source: "catalog" | "ai" | "guess" | "scan";
  slug?: string;
  variants?: { label: string; slug: string }[];
  siblings?: { label: string; slug: string }[];
}

/* ---------- generated plan ---------- */

export type PartMaterial = "board" | "fiber" | "wood" | "metal" | "soft";

/** One box or cylinder of a part made of several (a star base, a cot side with bars), in the part's own frame. */
export interface PartPiece {
  shape: "box" | "cyl";
  size: Vec3; // mm, box extents or cylinder [dia, length, dia]
  pos: Vec3; // mm, from the centre of the part
  rot?: Vec3;
  material?: PartMaterial;
}

export interface PartType {
  id: string;
  label: string; // letter
  name: string;
  size: Vec3; // mm, box extents or cylinder [dia, length, dia]; the bounding box when it has pieces
  shape: "box" | "cyl";
  material: PartMaterial;
  qty: number;
  extra?: boolean; // not in the box (e.g. mattress)
  pieces?: PartPiece[]; // drawn as these boxes and cylinders instead of one
}

export type HwKind =
  | "dowel"
  | "camScrew"
  | "cam"
  | "screw"
  | "nail"
  | "pin"
  | "legScrew"
  | "bolt"
  | "plate"
  | "bracket"
  | "runner"
  | "knob"
  | "handle"
  | "hinge"
  | "glide"
  | "plug"
  | "castor"
  | "gasLift";

export interface HwType {
  id: string;
  kind: HwKind;
  name: string;
  spec: string;
  len: number;
  dia: number;
  qty: number;
  notIncluded?: boolean;
}

export interface Hole {
  p: Vec3;
  n: Vec3;
  r: number;
}

/** A display state of a part: from `step` on it sits at pos/rot inside `scene`. The last state is the assembled one. */
export interface PartState {
  step: number;
  scene: string;
  pos: Vec3;
  rot: Vec3;
  from?: Vec3; // approach offset in scene frame
  spin?: number; // revolutions about local Y while approaching
  delay: number;
}

export interface PartItem {
  key: string;
  kind: "part";
  ref: string;
  final: { pos: Vec3; rot: Vec3 };
  states: PartState[];
  holes: Hole[];
}

export interface HwItem {
  key: string;
  kind: "hw";
  ref: string;
  parent?: string; // part key (local coords) or none (scene coords)
  scene?: string;
  step: number;
  pos: Vec3;
  dir: Vec3; // insertion direction, pointing into the material
  twist?: number;
  travel: number;
  spin?: number;
  turn?: number;
  delay: number;
  scale?: number;
  preset?: boolean;
}

export type Item = PartItem | HwItem;

export type ToolId =
  | "allen"
  | "screwdriver"
  | "flathead"
  | "hammer"
  | "drill"
  | "level"
  | "tape"
  | "pencil"
  | "wrench"
  | "knife";

export type WarnId =
  | "two"
  | "loose"
  | "hand"
  | "wall"
  | "square"
  | "floor"
  | "face"
  | "tip";

export type Pose = "+y" | "-y" | "+z" | "-z" | "+x" | "-x";

export type StepKind =
  | "dowels"
  | "bolts"
  | "cams"
  | "nails"
  | "square"
  | "flip"
  | "standup"
  | "shelves"
  | "anchor"
  | "drawer"
  | "runners"
  | "legs"
  | "doors"
  | "hinges"
  | "slats"
  | "join"
  | "screws"
  | "cushions"
  | "general";

export interface Step {
  n: number;
  title: string;
  detail?: string;
  tools: ToolId[];
  people: 1 | 2;
  repeat?: number;
  scene: string;
  pose: Pose;
  warnings: WarnId[];
  kind: StepKind;
  check?: "square";
  wall?: boolean;
  quiet?: boolean;
  minutes: number;
}

export interface ToolNeed {
  id: ToolId;
  included?: boolean;
  optional?: boolean;
  why?: string;
}

export interface Plan {
  spec: ProductSpec;
  parts: PartType[];
  hardware: HwType[];
  items: Item[];
  steps: Step[];
  tools: ToolNeed[];
}
