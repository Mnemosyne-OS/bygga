import type { Archetype, ProductSpec } from "./types";

/**
 * A wide offline index of real IKEA product names. Each row is a kind plus outer size (cm);
 * the kind decides the archetype and sensible parameters. Hand-tuned catalog entries win over these.
 */
export type Kind =
  | "cube"
  | "bookcase"
  | "open"
  | "chest"
  | "nightstand"
  | "desk"
  | "coffee"
  | "side"
  | "dining"
  | "bed"
  | "wardrobe"
  | "cabinet"
  | "sideboard"
  | "tv"
  | "shoe"
  | "chair"
  | "stool"
  | "bench"
  | "sofa"
  | "armchair"
  // added with the IKEA product data: existing archetypes with other parameters
  | "wallshelf"
  | "wallcab"
  | "kitchen"
  | "trolley"
  | "bar"
  | "console"
  | "kidstable"
  | "kidschair"
  // added later: new shapes of an existing archetype
  | "office"
  | "chaise"
  | "corner"
  | "cot";

export type X = {
  rows?: number;
  cols?: 1 | 2;
  knobs?: "none" | "knob" | "bar";
  plinth?: boolean;
  doors?: 0 | 1 | 2;
  shelves?: number;
  c?: number;
  m?: number;
  l?: number;
  f?: number;
  seats?: number;
  arms?: "wide" | "slim" | "none";
  legs?: "round" | "square";
  attach?: "screw" | "plate" | "apron";
  shelf?: boolean;
  min?: number;
  round?: boolean;
  seatH?: number;
  chaise?: "left" | "right" | "both";
  corner?: "left" | "right";
  open?: boolean;
  sd?: number;
  drawer?: boolean;
};

export type Row = [name: string, kind: Kind, variant: string, w: number, h: number, d: number, x?: X, keywords?: string];

export const ROWS: Row[] = [
  // shelving and bookcases
  ["HEMNES", "bookcase", "Bookcase, 90 × 197 cm", 90, 197, 37, { shelves: 4 }, "bookshelf"],
  ["HEMNES", "bookcase", "Bookcase, 49 × 197 cm", 49, 197, 31, { shelves: 4 }, "narrow bookshelf"],
  ["IVAR", "open", "Shelving unit, 89 × 179 cm", 89, 179, 30, { shelves: 3 }, "pine shelf"],
  ["FINNBY", "bookcase", "Bookcase, 60 × 180 cm", 60, 180, 24, { shelves: 3 }],
  ["GERSBY", "bookcase", "Bookcase, 60 × 180 cm", 60, 180, 24, { shelves: 3 }],
  ["LAIVA", "bookcase", "Bookcase, 62 × 165 cm", 62, 165, 24, { shelves: 3 }],
  ["BRIMNES", "bookcase", "Bookcase, 60 × 190 cm", 60, 190, 35, { shelves: 3 }, "bookshelf"],
  ["HAUGA", "bookcase", "Bookcase, 80 × 199 cm", 80, 199, 35, { shelves: 3 }],
  ["IDANÄS", "bookcase", "Bookcase, 81 × 225 cm", 81, 225, 39, { shelves: 4 }],
  ["FJÄLKINGE", "open", "Shelving unit, 118 × 193 cm", 118, 193, 35, { shelves: 4 }],
  ["BAGGEBO", "open", "Shelf unit, 50 × 160 cm", 50, 160, 30, { shelves: 4 }, "metal shelf"],
  ["HYLLIS", "open", "Shelf unit, 60 × 140 cm", 60, 140, 27, { shelves: 3 }, "metal shelf"],
  ["OMAR", "open", "Shelf section, 92 × 181 cm", 92, 181, 36, { shelves: 4 }, "metal shelving"],
  ["ALBERT", "open", "Shelving unit, 64 × 159 cm", 64, 159, 28, { shelves: 3 }],
  ["BROR", "open", "Shelving unit, 85 × 190 cm", 85, 190, 40, { shelves: 3 }, "garage shelf"],
  ["VITTSJÖ", "open", "Shelving unit, 51 × 175 cm", 51, 175, 36, { shelves: 4 }],
  ["KOLBJÖRN", "open", "Shelving unit, 80 × 81 cm", 80, 81, 37, { shelves: 1 }],
  ["TROFAST", "cube", "Storage frame, 99 × 94 cm", 99, 94, 44, {}, "kids toy storage"],
  ["EKET", "cube", "Cabinet combination, 70 × 70 cm", 70, 70, 35],
  ["KALLAX", "cube", "Shelving unit, 112 × 112 cm", 112, 112, 39, {}, "3x3 9 cube"],
  ["KALLAX", "cube", "Shelving unit, 147 × 77 cm", 147, 77, 39, {}, "4x2"],
  // chests of drawers
  ["HEMNES", "chest", "Chest of 8 drawers", 160, 96, 50, { cols: 2, rows: 4, knobs: "knob", plinth: true, min: 240 }, "dresser"],
  ["HEMNES", "chest", "Chest of 6 drawers", 108, 131, 50, { cols: 2, rows: 3, knobs: "knob", plinth: true, min: 210 }, "dresser"],
  ["HEMNES", "nightstand", "Nightstand, 2 drawers", 46, 70, 35, { rows: 2, knobs: "knob", plinth: true }, "bedside table"],
  ["KULLEN", "chest", "Chest of 5 drawers", 35, 103, 40, { rows: 5, knobs: "knob" }],
  ["KULLEN", "chest", "Chest of 6 drawers", 140, 72, 40, { cols: 2, rows: 3, knobs: "knob" }],
  ["KULLEN", "nightstand", "Chest of 2 drawers", 35, 49, 40, { rows: 2, knobs: "knob" }, "bedside"],
  ["NORDLI", "chest", "Chest of 8 drawers", 160, 99, 47, { cols: 2, rows: 4, knobs: "none", min: 240 }],
  ["NORDLI", "chest", "Chest of 4 drawers", 40, 99, 47, { rows: 4, knobs: "none" }],
  ["TARVA", "chest", "Chest of 5 drawers", 79, 129, 48, { rows: 5, knobs: "knob" }, "pine"],
  ["TARVA", "chest", "Chest of 6 drawers", 118, 92, 48, { cols: 2, rows: 3, knobs: "knob" }, "pine"],
  ["TARVA", "nightstand", "Nightstand", 39, 61, 38, { rows: 1, knobs: "knob" }, "bedside pine"],
  ["KOPPANG", "chest", "Chest of 3 drawers", 90, 83, 55, { rows: 3, knobs: "bar" }],
  ["KOPPANG", "chest", "Chest of 6 drawers", 172, 83, 55, { cols: 2, rows: 3, knobs: "bar" }],
  ["SONGESAND", "chest", "Chest of 4 drawers", 82, 104, 50, { rows: 4, knobs: "knob", plinth: true }],
  ["SONGESAND", "chest", "Chest of 6 drawers", 161, 81, 50, { cols: 2, rows: 3, knobs: "knob", plinth: true }],
  ["SONGESAND", "nightstand", "Nightstand", 42, 58, 40, { rows: 2, knobs: "knob" }],
  ["BRIMNES", "chest", "Chest of 3 drawers", 78, 95, 41, { rows: 3, knobs: "none" }],
  ["BRIMNES", "nightstand", "Nightstand", 39, 41, 41, { rows: 1, knobs: "none" }],
  ["HAUGA", "chest", "Chest of 6 drawers", 138, 84, 46, { cols: 2, rows: 3, knobs: "bar" }],
  ["HAUGA", "chest", "Chest of 3 drawers", 70, 84, 46, { rows: 3, knobs: "bar" }],
  ["IDANÄS", "chest", "Chest of 6 drawers", 162, 95, 47, { cols: 2, rows: 3, knobs: "bar", min: 210 }],
  ["GURSKEN", "chest", "Chest of 3 drawers", 69, 74, 39, { rows: 3, knobs: "knob" }],
  ["GURSKEN", "nightstand", "Bedside table", 39, 55, 40, { rows: 2, knobs: "knob" }],
  ["VIHALS", "chest", "Chest of 6 drawers", 140, 85, 47, { cols: 2, rows: 3, knobs: "bar" }],
  ["HELMER", "chest", "Drawer unit on castors", 28, 69, 43, { rows: 6, knobs: "none" }, "metal office"],
  ["NESNA", "nightstand", "Bedside table", 36, 45, 35, { rows: 1, knobs: "none" }],
  ["MALM", "nightstand", "Bedside table, 1 drawer", 40, 55, 48, { rows: 1, knobs: "none" }],
  // tables and desks
  ["MICKE", "desk", "Desk, 105 × 50 cm", 105, 75, 50, { attach: "apron", legs: "square" }, "computer desk"],
  ["LAGKAPTEN", "desk", "Desk, 120 × 60 cm", 120, 73, 60, { attach: "plate", legs: "round" }, "adils olov desk"],
  ["BEKANT", "desk", "Desk, 160 × 80 cm", 160, 65, 80, { attach: "apron", legs: "square" }, "office"],
  ["IDÅSEN", "desk", "Desk, 160 × 80 cm", 160, 72, 80, { attach: "apron", legs: "square" }, "sit stand standing"],
  ["TROTTEN", "desk", "Desk, 120 × 70 cm", 120, 75, 70, { attach: "apron", legs: "square" }, "office"],
  ["LINNMON", "desk", "Table top with legs, 120 × 60 cm", 120, 74, 60, { attach: "plate", legs: "round" }],
  ["LISABO", "dining", "Table, 140 × 78 cm", 140, 74, 78, {}, "dining table ash"],
  ["EKEDALEN", "dining", "Extendable table, 120 × 80 cm", 120, 75, 80, {}, "dining"],
  ["MÖRBYLÅNGA", "dining", "Table, 220 × 100 cm", 220, 74, 100, {}, "oak dining"],
  ["INGO", "dining", "Table, 120 × 75 cm", 120, 73, 75, {}, "pine dining"],
  ["NORRÅKER", "dining", "Table, 125 × 74 cm", 125, 74, 74, {}, "birch dining"],
  ["VANGSTA", "dining", "Extendable table, 120 × 75 cm", 120, 73, 75, {}, "dining"],
  ["SKOGSTA", "dining", "Dining table, 235 × 100 cm", 235, 74, 100, {}, "acacia"],
  ["LERHAMN", "dining", "Table, 118 × 74 cm", 118, 74, 74, {}, "dining"],
  ["SANDSBERG", "dining", "Table, 110 × 67 cm", 110, 75, 67, {}, "dining"],
  ["INGATORP", "dining", "Extendable table, 155 × 87 cm", 155, 74, 87, {}, "dining"],
  ["TOMMARYD", "dining", "Table, 130 × 70 cm", 130, 75, 70, {}, "dining"],
  ["HEMNES", "coffee", "Coffee table, 118 × 75 cm", 118, 46, 75, { attach: "apron", shelf: true }],
  ["LISTERBY", "coffee", "Coffee table, 140 × 60 cm", 140, 50, 60, { attach: "apron", shelf: false }],
  ["HOLMERUD", "coffee", "Coffee table, 90 × 55 cm", 90, 50, 55, { shelf: true }],
  ["VITTSJÖ", "coffee", "Coffee table, 90 × 50 cm", 90, 40, 50, { legs: "square", shelf: true }],
  ["LACK", "coffee", "Coffee table, 90 × 55 cm", 90, 45, 55, { shelf: true }],
  ["HEMNES", "side", "Side table, 55 × 55 cm", 55, 55, 55, { attach: "apron" }, "end table"],
  ["KLIMPEN", "desk", "Table, 120 × 60 cm", 120, 75, 60, { attach: "apron" }],
  // beds
  ["MALM", "bed", "Bed frame, 140 × 200 cm", 156, 100, 209, { m: 140 }, "double"],
  ["MALM", "bed", "Bed frame, 90 × 200 cm", 106, 100, 209, { m: 90 }, "single"],
  ["HEMNES", "bed", "Bed frame, 160 × 200 cm", 174, 120, 211, { m: 160, f: 66 }, "queen double"],
  ["HEMNES", "bed", "Bed frame, 90 × 200 cm", 105, 120, 211, { m: 90, f: 66 }, "single"],
  ["TARVA", "bed", "Bed frame, 140 × 200 cm", 147, 92, 209, { m: 140, f: 40 }, "pine double"],
  ["TARVA", "bed", "Bed frame, 90 × 200 cm", 97, 92, 209, { m: 90, f: 40 }, "pine single"],
  ["NEIDEN", "bed", "Bed frame, 90 × 200 cm", 97, 72, 206, { m: 90, f: 46 }, "single pine"],
  ["BRIMNES", "bed", "Bed frame, 160 × 200 cm", 166, 102, 206, { m: 160 }, "storage"],
  ["SONGESAND", "bed", "Bed frame, 160 × 200 cm", 167, 95, 207, { m: 160, f: 59 }],
  ["SLATTUM", "bed", "Upholstered bed frame, 160 × 200 cm", 168, 85, 213, { m: 160, f: 30 }],
  ["KLEPPSTAD", "bed", "Bed frame, 160 × 200 cm", 168, 96, 206, { m: 160 }],
  ["IDANÄS", "bed", "Bed frame, 160 × 200 cm", 174, 101, 211, { m: 160 }],
  ["SAGSTUA", "bed", "Bed frame, 160 × 200 cm", 167, 123, 209, { m: 160, f: 84 }, "metal"],
  ["NORDLI", "bed", "Bed frame with storage, 160 × 200 cm", 168, 64, 207, { m: 160 }],
  ["KRITTER", "bed", "Kids bed frame, 70 × 160 cm", 75, 64, 165, { m: 70, l: 160, f: 50 }, "children"],
  ["SUNDVIK", "bed", "Extendable bed, 80 × 200 cm", 85, 80, 207, { m: 80, f: 60 }, "kids"],
  // wardrobes, cabinets, sideboards
  ["PAX", "wardrobe", "Wardrobe frame, 50 × 236 cm", 50, 236, 58, { doors: 0, shelves: 2 }],
  ["PAX", "wardrobe", "Wardrobe frame, 100 × 236 cm", 100, 236, 58, { doors: 0, shelves: 2 }],
  ["HEMNES", "wardrobe", "Wardrobe with 2 doors, 120 × 197 cm", 120, 197, 59, { knobs: "knob" }],
  ["KLEPPSTAD", "wardrobe", "Wardrobe with 2 doors, 79 × 176 cm", 79, 176, 55],
  ["SONGESAND", "wardrobe", "Wardrobe, 120 × 191 cm", 120, 191, 60],
  ["RAKKESTAD", "wardrobe", "Wardrobe with 2 doors, 79 × 176 cm", 79, 176, 51],
  ["VISTHUS", "wardrobe", "Wardrobe, 122 × 216 cm", 122, 216, 59],
  ["DOMBÅS", "wardrobe", "Wardrobe, 140 × 181 cm", 140, 181, 51],
  ["HAUGA", "wardrobe", "Wardrobe, 70 × 199 cm", 70, 199, 55],
  ["IDANÄS", "wardrobe", "Wardrobe, 121 × 211 cm", 121, 211, 59],
  ["BRIMNES", "wardrobe", "Wardrobe with 3 doors, 117 × 190 cm", 117, 190, 50],
  ["HAVSTA", "cabinet", "Cabinet with doors, 81 × 123 cm", 81, 123, 35],
  ["HEMNES", "cabinet", "Glass-door cabinet, 90 × 197 cm", 90, 197, 37, { shelves: 3 }, "display vitrine"],
  ["FABRIKÖR", "cabinet", "Glass-door cabinet, 81 × 113 cm", 81, 113, 41, { shelves: 2 }, "metal display"],
  ["DETOLF", "cabinet", "Glass-door cabinet, 43 × 163 cm", 43, 163, 37, { doors: 1, shelves: 3 }, "display"],
  ["RUDSTA", "cabinet", "Glass-door cabinet, 80 × 170 cm", 80, 170, 37, { shelves: 3 }],
  ["MILSBO", "cabinet", "Glass-door cabinet, 101 × 186 cm", 101, 186, 42, { shelves: 3 }],
  ["KOLBJÖRN", "cabinet", "Cabinet, 80 × 81 cm", 80, 81, 37, { shelves: 1 }, "outdoor balcony"],
  ["IVAR", "cabinet", "Cabinet with doors, 80 × 83 cm", 80, 83, 30, { shelves: 1 }, "pine"],
  ["BESTÅ", "cabinet", "Shelf unit with doors, 60 × 64 cm", 60, 64, 40, { doors: 1, shelves: 1, knobs: "none" }],
  ["BRIMNES", "cabinet", "Cabinet with doors, 39 × 95 cm", 39, 95, 34, { doors: 1, shelves: 2 }],
  ["HEMNES", "sideboard", "Sideboard, 157 × 88 cm", 157, 88, 47, { knobs: "knob" }, "buffet"],
  ["HAVSTA", "sideboard", "Sideboard, 100 × 89 cm", 100, 89, 47],
  ["TONSTAD", "sideboard", "Sideboard, 121 × 81 cm", 121, 81, 47],
  ["IDANÄS", "sideboard", "Sideboard, 160 × 87 cm", 160, 87, 47],
  ["BESTÅ", "tv", "TV bench, 120 × 40 cm", 120, 40, 42, { knobs: "none" }],
  ["BESTÅ", "tv", "TV bench, 180 × 38 cm", 180, 38, 42, { knobs: "none" }],
  ["BRIMNES", "tv", "TV bench, 120 × 53 cm", 120, 53, 41, { knobs: "none" }],
  ["HEMNES", "tv", "TV bench, 148 × 57 cm", 148, 57, 47, { knobs: "knob" }],
  ["HAUGA", "tv", "TV bench, 138 × 54 cm", 138, 54, 36, { knobs: "bar" }],
  // shoe cabinets
  ["BISSA", "shoe", "Shoe cabinet with 2 compartments", 49, 93, 28, { c: 2 }, "shoe storage"],
  ["BISSA", "shoe", "Shoe cabinet with 3 compartments", 49, 135, 28, { c: 3 }, "shoe storage"],
  ["HEMNES", "shoe", "Shoe cabinet with 2 compartments", 89, 127, 30, { c: 2, knobs: "knob" }, "shoe storage"],
  ["HEMNES", "shoe", "Shoe cabinet with 4 compartments", 107, 101, 22, { c: 2, knobs: "knob" }, "shoe storage"],
  ["STÄLL", "shoe", "Shoe cabinet with 3 compartments", 79, 148, 29, { c: 3, knobs: "knob" }, "shoe storage"],
  ["TRONES", "shoe", "Shoe cabinet, 52 × 39 cm", 52, 39, 18, { c: 1, knobs: "none" }, "shoe storage wall"],
  ["BRUSALI", "shoe", "Shoe cabinet with 3 compartments", 61, 130, 31, { c: 3, knobs: "knob" }],
  ["MACKAPÄR", "shoe", "Shoe cabinet, 80 × 102 cm", 80, 102, 35, { c: 2, knobs: "bar" }],
  // seating
  ["POÄNG", "armchair", "Armchair", 68, 100, 82, { arms: "slim" }, "rocking chair"],
  ["STRANDMON", "armchair", "Wing chair", 82, 101, 96, { arms: "wide" }],
  ["EKERÖ", "armchair", "Armchair", 70, 73, 73, { arms: "slim" }],
  ["KIVIK", "sofa", "3-seat sofa", 228, 83, 95, { seats: 3 }, "couch"],
  ["KLIPPAN", "sofa", "2-seat sofa", 180, 66, 88, { seats: 2, arms: "slim" }, "couch"],
  ["EKTORP", "sofa", "3-seat sofa", 218, 88, 88, { seats: 3 }, "couch"],
  ["FRIHETEN", "sofa", "Corner sofa-bed", 230, 66, 151, { seats: 3, arms: "slim" }, "couch sleeper"],
  ["SÖDERHAMN", "sofa", "3-seat sofa", 198, 69, 99, { seats: 3, arms: "slim" }, "couch"],
  ["VIMLE", "sofa", "3-seat sofa", 241, 83, 98, { seats: 3 }, "couch"],
  ["LANDSKRONA", "sofa", "3-seat sofa", 204, 89, 89, { seats: 3, arms: "slim" }, "couch"],
  ["GLOSTAD", "sofa", "2-seat sofa", 145, 78, 82, { seats: 2 }, "couch"],
  ["UPPLAND", "sofa", "3-seat sofa", 231, 89, 98, { seats: 3 }, "couch"],
  ["HEMLINGBY", "sofa", "2-seat sofa", 156, 80, 80, { seats: 2, arms: "slim" }, "couch"],
  ["STEFAN", "chair", "Chair", 42, 90, 49, {}, "dining chair pine"],
  ["ODGER", "chair", "Chair", 45, 80, 52, {}, "dining chair"],
  ["TEODORES", "chair", "Chair", 46, 80, 53, {}, "dining chair"],
  ["ADDE", "chair", "Chair", 39, 77, 47, {}, "dining chair"],
  ["LISABO", "chair", "Chair", 45, 76, 51, {}, "dining chair"],
  ["NORRÅKER", "chair", "Chair", 41, 81, 50, {}, "dining chair"],
  ["JANINGE", "chair", "Chair", 50, 76, 47, {}, "dining chair"],
  ["EKEDALEN", "chair", "Chair", 45, 95, 51, {}, "dining chair"],
  ["BERGMUND", "chair", "Chair", 52, 95, 59, {}, "dining chair upholstered"],
  ["TERJE", "chair", "Folding chair", 44, 79, 50, {}, "folding"],
  ["STIG", "stool", "Bar stool, 74 cm", 37, 74, 37, {}, "bar"],
  ["DALFRED", "stool", "Bar stool", 50, 74, 50, {}, "bar"],
  ["KYRRE", "stool", "Stool", 35, 45, 35],
  ["BEKVÄM", "stool", "Step stool", 43, 50, 43, {}, "step"],
  ["ÄPPLARÖ", "bench", "Bench, outdoor", 114, 44, 41, {}, "garden outdoor"],
  ["HEMNES", "bench", "Bench", 98, 45, 37, {}, "hallway"],
];

const MIN: Record<Kind, number> = {
  cube: 40, bookcase: 50, open: 40, chest: 90, nightstand: 40, desk: 25, coffee: 20, side: 15, dining: 40,
  bed: 100, wardrobe: 120, cabinet: 60, sideboard: 80, tv: 60, shoe: 45, chair: 25, stool: 12, bench: 20, sofa: 40, armchair: 30,
  wallshelf: 25, wallcab: 40, kitchen: 50, trolley: 25, bar: 35, console: 30, kidstable: 15, kidschair: 20,
  office: 20, chaise: 55, corner: 70, cot: 35,
};

const CATEGORY: Record<Kind, string> = {
  cube: "Shelving unit", bookcase: "Bookcase", open: "Shelving unit", chest: "Chest of drawers", nightstand: "Nightstand",
  desk: "Desk", coffee: "Coffee table", side: "Side table", dining: "Dining table", bed: "Bed frame", wardrobe: "Wardrobe",
  cabinet: "Cabinet", sideboard: "Sideboard", tv: "TV bench", shoe: "Shoe cabinet", chair: "Chair", stool: "Stool",
  bench: "Bench", sofa: "Sofa", armchair: "Armchair", wallshelf: "Wall shelf", wallcab: "Wall cabinet", kitchen: "Kitchen cabinet",
  trolley: "Trolley", bar: "Bar table", console: "Console table", kidstable: "Children's table", kidschair: "Children's chair",
  office: "Office chair", chaise: "Sofa with chaise longue", corner: "Corner sofa", cot: "Cot",
};

export const KIND_ARCH: Record<Kind, Archetype> = {
  cube: "shelf", bookcase: "shelf", open: "shelf", chest: "drawers", nightstand: "drawers", desk: "table", coffee: "table",
  side: "table", dining: "table", bed: "bed", wardrobe: "cabinet", cabinet: "cabinet", sideboard: "cabinet", tv: "cabinet",
  shoe: "cabinet", chair: "seat", stool: "seat", bench: "seat", sofa: "sofa", armchair: "sofa", wallshelf: "shelf", wallcab: "cabinet",
  kitchen: "cabinet", trolley: "table", bar: "table", console: "table", kidstable: "table", kidschair: "seat",
  office: "seat", chaise: "sofa", corner: "sofa", cot: "bed",
};

const round = (x: X) => (x.round ? { round: true } : {});

/** Turn a kind and a size into a full product spec. */
export function specFor(kind: Kind, name: string, variant: string, w: number, h: number, d: number, x: X = {}): Omit<ProductSpec, "source"> {
  const big = h > 150 || w > 150;
  const base = {
    name,
    variant,
    category: CATEGORY[kind],
    archetype: KIND_ARCH[kind],
    size: { w, h, d },
    minutes: x.min ?? MIN[kind],
    people: (big ? 2 : 1) as 1 | 2,
    difficulty: (["chest", "wardrobe", "sideboard"].includes(kind) ? 3 : ["cube", "side", "stool", "coffee"].includes(kind) ? 1 : 2) as 1 | 2 | 3,
  };
  switch (kind) {
    case "cube":
      return { ...base, shelf: { style: "grid", cols: Math.max(1, Math.round((w - 6) / 35)), rows: Math.max(1, Math.round((h - 6) / 35)), outer: 40, inner: 16, back: false } };
    case "bookcase":
      return { ...base, shelf: { style: "bookcase", shelves: x.shelves ?? Math.max(1, Math.round(h / 45) - 1), fixedShelf: h > 150, back: true, plinth: h > 100, outer: 16 } };
    case "open":
      return { ...base, difficulty: 1, shelf: { style: "bookcase", shelves: x.shelves ?? Math.max(1, Math.round(h / 45) - 1), fixedShelf: h > 150, back: false, plinth: false, outer: 18 } };
    case "chest":
    case "nightstand":
      return { ...base, minutes: x.min ?? (kind === "nightstand" ? 30 + 15 * (x.rows ?? 2) : 30 + 20 * (x.rows ?? 3) * (x.cols ?? 1)), drawers: { cols: x.cols ?? 1, rows: x.rows ?? (kind === "nightstand" ? 2 : 3), knobs: x.knobs ?? "knob", plinth: x.plinth ?? false, thickness: 16 } };
    case "desk":
      return { ...base, table: { attach: x.attach ?? "plate", legs: x.legs ?? "round", legSize: x.legs === "square" ? 45 : 34, topThickness: 28, shelf: false } };
    case "coffee":
      return { ...base, table: { attach: x.attach ?? "screw", legs: x.legs ?? "square", legSize: 48, topThickness: 40, shelf: x.shelf ?? true, ...round(x) } };
    case "side":
      return { ...base, table: { attach: x.attach ?? "screw", legs: "square", legSize: 40, topThickness: 30, shelf: false, ...round(x) } };
    case "dining":
      return { ...base, people: w > 140 ? 2 : 1, table: { attach: "apron", legs: x.legs ?? "square", legSize: 55, topThickness: 25, shelf: false, ...round(x) } };
    case "bed":
      return { ...base, people: 2, bed: { mattressW: x.m ?? Math.max(80, w - 16), mattressL: x.l ?? 200, headH: h, footH: x.f ?? 38, slats: x.l && x.l < 190 ? 13 : 17, centerBeam: (x.m ?? w) >= 120 } };
    case "wardrobe":
      return { ...base, people: 2, cabinet: { doors: x.doors ?? (w >= 60 ? 2 : 1), shelves: x.shelves ?? 1, rail: true, plinth: true, handles: x.knobs ?? "knob", thickness: 18 } };
    case "cabinet":
      return { ...base, cabinet: { doors: x.doors ?? (w > 50 ? 2 : 1), shelves: x.shelves ?? (h > 100 ? 2 : 1), rail: false, plinth: h > 100, handles: x.knobs ?? "knob", thickness: 18 } };
    case "sideboard":
      return { ...base, cabinet: { doors: 2, shelves: 1, rail: false, plinth: true, handles: x.knobs ?? "knob", thickness: 18 } };
    case "tv":
      return { ...base, cabinet: { doors: 2, shelves: 0, rail: false, plinth: false, handles: x.knobs ?? "knob", thickness: 16 } };
    case "shoe":
      return { ...base, cabinet: { fronts: "tilt", compartments: x.c ?? 2, doors: 0, shelves: 0, rail: false, plinth: false, handles: x.knobs ?? "knob", thickness: 16 } };
    case "chair":
      return { ...base, seat: { kind: "chair", seat: "square", seatH: x.seatH ?? 45, backH: h } };
    case "stool":
      return { ...base, seat: { kind: "stool", seat: "round", seatH: h, splay: true, stretchers: h > 60 } };
    case "bench":
      return { ...base, seat: { kind: "bench", seat: "square", seatH: h, splay: false } };
    case "sofa":
    case "armchair":
      return { ...base, people: kind === "sofa" ? 2 : 1, sofa: { seats: x.seats ?? (kind === "armchair" ? 1 : Math.max(1, Math.round((w - 30) / 62))), arms: x.arms ?? "wide", legs: "round" } };
    case "wallshelf":
      return { ...base, difficulty: 1, people: 1, shelf: { style: "bookcase", shelves: x.shelves ?? Math.max(0, Math.round(h / 35) - 1), fixedShelf: false, back: false, plinth: false, outer: 16, wall: true } };
    case "wallcab":
      return { ...base, people: w > 100 ? 2 : 1, cabinet: { doors: x.doors ?? (w > 50 ? 2 : 1), shelves: x.shelves ?? (h > 50 ? 1 : 0), rail: false, plinth: false, handles: x.knobs ?? "knob", thickness: 16, wall: true } };
    case "kitchen":
      return { ...base, cabinet: { doors: x.doors ?? (w > 50 ? 2 : 1), shelves: x.shelves ?? Math.max(1, Math.round(h / 45) - 1), rail: false, plinth: true, handles: x.knobs ?? "bar", thickness: 18 } };
    case "trolley":
      return { ...base, difficulty: 1, table: { attach: "plate", legs: "round", legSize: 25, topThickness: 20, shelf: true } };
    case "bar":
      return { ...base, people: 2, table: { attach: x.attach ?? "apron", legs: x.legs ?? "square", legSize: 50, topThickness: 25, shelf: false, ...round(x) } };
    case "console":
      return { ...base, difficulty: 1, table: { attach: "apron", legs: x.legs ?? "square", legSize: 40, topThickness: 22, shelf: x.shelf ?? false } };
    case "kidstable":
      return { ...base, difficulty: 1, people: 1, table: { attach: x.attach ?? "screw", legs: x.legs ?? "round", legSize: 40, topThickness: 22, shelf: false, ...round(x) } };
    case "kidschair":
      return { ...base, difficulty: 1, seat: { kind: "chair", seat: "square", seatH: x.seatH ?? 31, backH: h } };
    case "office":
      // x.arms: "slim" for armrests, "none" without
      return { ...base, difficulty: 1, seat: { kind: "office", seat: "square", seatH: x.seatH ?? 48, backH: h, arms: (x.arms ?? "none") !== "none" } };
    case "chaise":
    case "corner": {
      const sofa = { seats: x.seats ?? (kind === "corner" ? 4 : 3), arms: x.arms ?? "wide", legs: "round" as const, depth: x.sd ?? 92 };
      const shape = kind === "corner" ? { corner: x.corner ?? "left", ...(x.open ? { open: true } : {}) } : { chaise: x.chaise ?? "right" };
      return { ...base, people: 2, sofa: { ...sofa, ...shape } };
    }
    case "cot":
      return { ...base, people: 1, bed: { type: "cot", mattressW: x.m ?? 60, mattressL: x.l ?? 120, headH: h, footH: h, slats: 9, centerBeam: false, ...(x.drawer ? { drawer: true } : {}) } };
  }
}

export const KIND_LABELS: { kind: Kind; label: string }[] = [
  { kind: "bookcase", label: "Bookcase" },
  { kind: "cube", label: "Cube shelf" },
  { kind: "chest", label: "Chest of drawers" },
  { kind: "nightstand", label: "Nightstand" },
  { kind: "wardrobe", label: "Wardrobe" },
  { kind: "cabinet", label: "Cabinet" },
  { kind: "shoe", label: "Shoe cabinet" },
  { kind: "tv", label: "TV bench" },
  { kind: "desk", label: "Desk" },
  { kind: "dining", label: "Dining table" },
  { kind: "coffee", label: "Coffee table" },
  { kind: "bed", label: "Bed frame" },
  { kind: "sofa", label: "Sofa" },
  { kind: "chair", label: "Chair" },
  { kind: "stool", label: "Stool" },
  { kind: "bench", label: "Bench" },
];

export const KIND_DEFAULT_SIZE: Record<Kind, [number, number, number]> = {
  cube: [77, 77, 39], bookcase: [80, 190, 30], open: [80, 180, 35], chest: [80, 90, 48], nightstand: [42, 55, 40], desk: [120, 74, 60],
  coffee: [110, 45, 60], side: [50, 50, 50], dining: [140, 74, 80], bed: [156, 100, 209], wardrobe: [100, 200, 58], cabinet: [80, 120, 40],
  sideboard: [140, 85, 45], tv: [150, 50, 42], shoe: [60, 100, 28], chair: [44, 88, 50], stool: [35, 45, 35], bench: [100, 45, 38],
  sofa: [210, 85, 92], armchair: [75, 90, 80], wallshelf: [60, 60, 22], wallcab: [60, 60, 35], kitchen: [60, 80, 60], trolley: [50, 80, 40],
  bar: [120, 105, 60], console: [100, 79, 35], kidstable: [77, 48, 55], kidschair: [34, 60, 34],
  office: [64, 105, 64], chaise: [250, 85, 160], corner: [250, 85, 220], cot: [130, 84, 68],
};
