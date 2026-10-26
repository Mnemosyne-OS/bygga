import "server-only";
import { cacheLife } from "next/cache";
import { parseSpec, SPEC_PROMPT } from "./spec";
import { chatText, extractJson, MODELS } from "./together";
import type { ProductSpec } from "./types";

export type Draft = { spec: ProductSpec; model: string } | { found: false; suggestions: string[] };

/**
 * Asks the model what a product name is, on the server key. Shared by every
 * server instance and kept for good, so each name is only paid for once and
 * the second person to ask gets it instantly. Failures throw and aren't kept.
 */
/** `key` is the folded name (and IKEA's type for it), so every spelling of a name shares one entry; `q` is what the model reads. */
export async function draft(key: string, q: string): Promise<Draft | null> {
  "use cache: remote";
  cacheLife("max");
  void key;
  const { text, model } = await chatText({
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
