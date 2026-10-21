import { userKey } from "@/lib/together";

/** Checks that a pasted Together AI key works, without storing it. */
export async function POST(req: Request) {
  const key = userKey(req);
  if (!key) return Response.json({ ok: false, reason: "format" });
  if (key === "bygga-dev-mock-key-000000" && process.env.NODE_ENV !== "production") return Response.json({ ok: true });
  try {
    const r = await fetch("https://api.together.xyz/v1/models", { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(8000) });
    await r.body?.cancel();
    if (r.ok) return Response.json({ ok: true });
    return Response.json({ ok: false, reason: r.status === 401 || r.status === 403 ? "rejected" : "unavailable" });
  } catch {
    return Response.json({ ok: false, reason: "unavailable" });
  }
}
