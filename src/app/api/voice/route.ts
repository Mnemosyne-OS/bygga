import { connection } from "next/server";
import { hasKey, ipOf, rateLimited } from "@/lib/together";
import { speak } from "@/lib/voice/tts";

/**
 * Records a line live in the same voice as the pre-recorded clips, for text
 * that has no clip yet: scanned guides and spoken help answers. Responses are
 * cached for good, so each line is only paid for once per edge.
 */
export async function GET(req: Request) {
  await connection();
  if (!hasKey()) return Response.json({ error: "voice-off" }, { status: 404 });
  // only the app itself, not other sites hotlinking a free voice
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return Response.json({ error: "forbidden" }, { status: 403 });
  const text = (new URL(req.url).searchParams.get("t") ?? "").replace(/\s+/g, " ").trim();
  if (!text || text.length > 400) return Response.json({ error: "bad text" }, { status: 400 });
  if (rateLimited(ipOf(req) + ":voice", 90)) return Response.json({ error: "slow down" }, { status: 429 });
  try {
    const audio = await speak(text, process.env.TOGETHER_API_KEY!.trim());
    return new Response(audio, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch (e) {
    console.error("[voice]", (e as Error).message);
    return Response.json({ error: "failed" }, { status: 502 });
  }
}
