import { connection } from "next/server";
import { ipOf, rateLimited } from "@/lib/together";

/**
 * Records a line live in the same voice as the pre-recorded clips, for text
 * that has no clip yet: scanned guides and spoken help answers. Responses are
 * cached for good, so each line is only paid for once per edge.
 */
const MODEL = "elevenlabs/tts/eleven-v4-turbo";

export async function GET(req: Request) {
  await connection();
  const key = process.env.FAL_KEY?.trim();
  if (!key) return Response.json({ error: "voice-off" }, { status: 404 });
  // only the app itself, not other sites hotlinking a free voice
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return Response.json({ error: "forbidden" }, { status: 403 });
  const text = (new URL(req.url).searchParams.get("t") ?? "").replace(/\s+/g, " ").trim();
  if (!text || text.length > 400) return Response.json({ error: "bad text" }, { status: 400 });
  if (rateLimited(ipOf(req), 40)) return Response.json({ error: "slow down" }, { status: 429 });
  try {
    const r = await fetch(`https://fal.run/${MODEL}`, {
      method: "POST",
      headers: { Authorization: `Key ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice: "Matilda", stability: 0.5, output_format: "mp3_44100_64" }),
    });
    if (!r.ok) throw new Error(`fal ${r.status}`);
    const url = (await r.json()).audio?.url;
    if (!url) throw new Error("no audio");
    const audio = await fetch(url);
    if (!audio.ok || !audio.body) throw new Error(`audio ${audio.status}`);
    return new Response(audio.body, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch (e) {
    console.error("[voice]", (e as Error).message);
    return Response.json({ error: "failed" }, { status: 502 });
  }
}
