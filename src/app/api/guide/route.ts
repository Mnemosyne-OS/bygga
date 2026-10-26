import { PRODUCTS, toSpec } from "@/lib/catalog";
import { categoryOf, fold, guessSpec, matchCatalog, searchCatalog } from "@/lib/search";
import { parseSpec, SPEC_PROMPT } from "@/lib/spec";
import { draft, type Draft } from "@/lib/draft";
import { chatText, extractJson, hasKey, ipOf, MODELS, rateLimited, TogetherError, userKey } from "@/lib/together";
import type { ProductSpec } from "@/lib/types";

const cache = new Map<string, { spec: ProductSpec; model: string }>();

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { q?: string };
  const q = (body.q ?? "").toString().slice(0, 80).trim();
  if (!q) return Response.json({ error: "empty" }, { status: 400 });

  const hit = matchCatalog(q);
  if (hit) return Response.json({ spec: hit, via: "catalog" });

  const key = fold(q);
  const cached = cache.get(key);
  if (cached) return Response.json({ spec: cached.spec, via: "ai", model: cached.model });

  const suggestions = () => [...new Set(searchCatalog(q, 8).filter((h) => h.score >= 40).map((h) => h.entry.name))].slice(0, 4);

  const own = userKey(req);
  if (hasKey() || own) {
    if (rateLimited(ipOf(req) + ":guide", 12)) return Response.json({ error: "slow down" }, { status: 429 });
    try {
      const d = await draftWith(own, key, q);
      if (d && "found" in d) {
        return Response.json({ found: false, suggestions: d.suggestions.concat(suggestions()).slice(0, 4), via: "ai" });
      }
      if (d) {
        const { spec, model } = d;
        // prefer our checked catalog when the model lands on a product we know
        const known = PRODUCTS.find((c) => fold(c.name) === fold(spec.name) && c.archetype === spec.archetype && Math.abs(c.size.w - spec.size.w) < 6 && Math.abs(c.size.h - spec.size.h) < 6);
        if (known) return Response.json({ spec: { ...toSpec(known), slug: known.slug }, via: "catalog" });
        const out = { ...spec, slug: key.replace(/\s+/g, "-") };
        cache.set(key, { spec: out, model });
        return Response.json({ spec: out, via: "ai", model });
      }
    } catch (e) {
      const err = e as TogetherError;
      console.error("[guide] together error", err.status, err.message);
    }
  }

  const g = guessSpec(q);
  if (g && categoryOf(q)) return Response.json({ spec: g, via: "guess" });
  return Response.json({ found: false, suggestions: suggestions(), via: hasKey() || own ? "ai" : "offline" });
}

/** The shared, cached draft on the server key; a visitor's own key is never cached under someone else's name. */
async function draftWith(own: string | undefined, key: string, q: string): Promise<Draft | null> {
  if (!own && hasKey()) return draft(key);
  const { text, model } = await chatText({
    key: own,
    models: MODELS.text,
    json: true,
    maxTokens: 1800,
    temperature: 0.2,
    messages: [
      { role: "system", content: SPEC_PROMPT },
      { role: "user", content: q },
    ],
  });
  const raw = extractJson(text) as { found?: boolean; suggestions?: string[] } | null;
  if (raw && raw.found === false) return { found: false, suggestions: (raw.suggestions ?? []).slice(0, 3) };
  const spec = parseSpec(raw);
  return spec ? { spec, model } : null;
}
