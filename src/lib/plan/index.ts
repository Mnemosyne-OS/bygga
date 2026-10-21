import type { Plan, ProductSpec } from "../types";
import { PlanBuilder } from "./builder";
import { buildShelf } from "./shelf";
import { buildDrawers } from "./drawers";
import { buildTable } from "./table";
import { buildBed } from "./bed";
import { buildCabinet } from "./cabinet";
import { buildSeat } from "./seat";
import { buildSofa } from "./sofa";
import { buildCustom } from "./custom";

const cache = new Map<string, Plan>();

export function buildPlan(spec: ProductSpec): Plan {
  const key = JSON.stringify(spec);
  const hit = cache.get(key);
  if (hit) return hit;
  const b = new PlanBuilder(spec);
  switch (spec.archetype) {
    case "shelf":
      buildShelf(b, spec);
      break;
    case "drawers":
      buildDrawers(b, spec);
      break;
    case "table":
      buildTable(b, spec);
      break;
    case "bed":
      buildBed(b, spec);
      break;
    case "cabinet":
      buildCabinet(b, spec);
      break;
    case "seat":
      buildSeat(b, spec);
      break;
    case "sofa":
      buildSofa(b, spec);
      break;
    case "custom":
      buildCustom(b, spec);
      break;
  }
  const plan = b.build();
  cache.set(key, plan);
  return plan;
}
