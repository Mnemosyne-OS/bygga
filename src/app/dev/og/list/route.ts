import { PRODUCTS } from "@/lib/catalog";
import { KIND_LABELS } from "@/lib/products";

/** Dev only: what scripts/og/render.mjs should draw: every kind, then every catalog product. */
export async function GET() {
  if (process.env.NODE_ENV === "production") return new Response(null, { status: 404 });
  const picks = PRODUCTS.map((p) => ({ slug: p.slug }));
  return Response.json([...KIND_LABELS.map((k) => ({ kind: k.kind })), ...picks]);
}
