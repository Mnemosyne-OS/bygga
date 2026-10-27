import { fromApp, hasKey, ipOf, rateLimited, userKey } from "@/lib/together";
import { transcribe } from "@/lib/voice/stt";

/** 3 s of 16 kHz 16-bit mono is 96 KB; a little room above that, nothing like a recording. */
const MAX_BYTES = 128 * 1024;

/**
 * Hands-free listening: the guide sends a short piece of mic audio each time
 * someone talks (and, where echo cancelling fails, while the voice reads),
 * and gets back what was said. Nothing is kept.
 */
export async function POST(req: Request) {
  if (!fromApp(req, false) || !(req.headers.get("content-type") ?? "").startsWith("audio/wav")) return Response.json({ error: "forbidden" }, { status: 403 });
  // the person's own key when they've added one; the site's when it's turned away, as for the other routes
  const keys = [...new Set([userKey(req), hasKey() ? process.env.TOGETHER_API_KEY!.trim() : undefined].filter((k): k is string => !!k))];
  if (!keys.length) return Response.json({ error: "ai-off" }, { status: 503 });
  // a busy room sends a piece every second or so; this is well above that
  if (rateLimited(ipOf(req) + ":listen", 150)) return Response.json({ error: "slow down" }, { status: 429 });
  const wav = await req.arrayBuffer().catch(() => null);
  if (!wav || wav.byteLength < 44 + 3200 || wav.byteLength > MAX_BYTES) return Response.json({ error: "bad audio" }, { status: 400 });
  const head = new TextDecoder().decode(new Uint8Array(wav, 0, 12));
  if (!head.startsWith("RIFF") || !head.endsWith("WAVE")) return Response.json({ error: "bad audio" }, { status: 400 });
  let err = "";
  for (const key of keys) {
    try {
      const text = await transcribe(wav, key, AbortSignal.timeout(8000));
      return Response.json({ text }, { headers: { "Cache-Control": "no-store" } });
    } catch (e) {
      err = (e as Error).message;
      if (!/ 40[123]:/.test(err)) break;
    }
  }
  console.error("[listen]", err);
  return Response.json({ error: "failed" }, { status: 502 });
}
