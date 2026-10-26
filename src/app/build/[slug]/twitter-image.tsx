import { catalogSpec } from "@/lib/catalog";
import { buildPlan } from "@/lib/plan";
import { KIND_LABELS } from "@/lib/products";
import { kindOf } from "@/lib/search";
import { OG_SIZE, drawing, guideCard } from "@/lib/og/card";

/** A drawing to fall back on for each archetype. */
const BY_ARCH: Record<string, string> = { shelf: "bookcase", drawers: "chest", table: "dining", bed: "bed", cabinet: "cabinet", seat: "chair", sofa: "sofa", custom: "cabinet" };

export const alt = "An IKEA assembly guide on Bygga, step by step in 3D";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decodeURIComponent((await params).slug);
  const spec = catalogSpec(slug);
  if (!spec) {
    // a product we draft on the fly: its name, and the drawing of the kind its slug names, if any
    const name = slug.split("-")[0].toUpperCase().slice(0, 18);
    const kind = kindOf(slug.replace(/-/g, " "));
    return guideCard({ name, variant: "Assembly, step by step", steps: null, art: await drawing(kind ? `kind-${kind}` : "kind-bookcase") });
  }
  const kind = kindOf(`${spec.category} ${spec.variant}`) ?? KIND_LABELS[0].kind;
  const art = (await drawing(slug)) ?? (await drawing(`kind-${kind}`)) ?? (await drawing(`kind-${BY_ARCH[spec.archetype]}`));
  let steps: number | null = null;
  try {
    steps = buildPlan(spec).steps.length;
  } catch {
    /* the card still works without a count */
  }
  return guideCard({ name: spec.name, variant: spec.variant, steps, art });
}
