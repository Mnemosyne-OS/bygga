import { fold } from "@/lib/fold";
import { categoryOf, guessSpec, matchCatalog, searchCatalog } from "@/lib/search";

/*
 * The site's /api routes run on a server, with the visitor's Together AI key. The cartridge
 * has neither, so each route answers here the way the site answers a visitor with no key:
 * - /api/guide works a product out from the catalog alone, as src/app/api/guide/route.ts does
 *   before it reaches for a key: the catalog match, then a typical build for its kind, then
 *   close names (IKEA's own product type, which that route looks up online, is left out);
 * - every other route says { error: "key" } with a 401.
 * /api/feedback is sent nowhere: the site's DonePanel and HelpSheet ignore the answer, so
 * their thank-you shows all the same.
 */

const answer = (body: unknown, status = 200) => Promise.resolve(Response.json(body, { status }));

function guide(init?: RequestInit): Promise<Response> {
  let q = "";
  try {
    const body = JSON.parse(typeof init?.body === "string" ? init.body : "{}") as { q?: unknown };
    q = String(body.q ?? "").slice(0, 80).trim();
  } catch (err) {
    console.warn("[bygga] /api/guide got a body it could not read:", err);
  }
  if (!q) return answer({ error: "empty" }, 400);
  const hit = matchCatalog(q);
  if (hit) return answer({ spec: hit, via: "catalog" });
  const guess = guessSpec(q);
  if (guess && categoryOf(q)) return answer({ spec: guess, via: "guess" });
  const key = fold(q);
  const suggestions = [...new Set(searchCatalog(q, 8).filter((h) => h.score >= 40).map((h) => h.entry.name))].filter((name) => fold(name) !== key).slice(0, 4);
  return answer({ found: false, suggestions, via: "offline" });
}

/** The answer to a site API call, or null for any other URL (the network takes it). */
export function answerSiteApi(url: string, init?: RequestInit): Promise<Response> | null {
  if (!url.startsWith("/api/")) return null;
  if (url === "/api/guide" || url.startsWith("/api/guide?")) return guide(init);
  return answer({ error: "key" }, 401);
}
