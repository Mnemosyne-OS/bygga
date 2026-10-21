import { chat, hasKey, ipOf, MODELS, rateLimited, userKey, type Msg } from "@/lib/together";

interface Body {
  context?: string;
  question?: string;
  history?: { role: "user" | "assistant"; content: string }[];
  image?: string;
}

const SYSTEM = `You are the helper inside Bygga, an app that walks people through assembling flat pack furniture step by step, mostly from IKEA. The person is mid-build, often on the floor with tools in hand.
Answer in plain, warm English. At most 3 short sentences, or a short numbered list when giving steps. No headings, no markdown tables.
Be practical and specific to the step they are on. If something could hurt them or damage the furniture, say so first.
If a part is missing or broken: tell them to note the number printed on the bag or panel, and that IKEA stores and customer service usually replace small fittings for free.
If they send a photo of a part, say which part from the list it most likely is and why (size, shape, head).
Never use em dashes or en dashes.`;

export async function POST(req: Request) {
  const key = userKey(req);
  if (!hasKey() && !key) return Response.json({ error: "ai-off" }, { status: 503 });
  if (rateLimited(ipOf(req), 20)) return Response.json({ error: "slow down" }, { status: 429 });
  const b = (await req.json().catch(() => ({}))) as Body;
  const question = (b.question ?? "").toString().slice(0, 600);
  const context = (b.context ?? "").toString().slice(0, 3000);
  const history = (b.history ?? []).slice(-6).map((m) => ({ role: m.role, content: String(m.content).slice(0, 800) })) as Msg[];
  const image = b.image && b.image.startsWith("data:image/") && b.image.length < 6_000_000 ? b.image : undefined;
  const user: Msg = image
    ? { role: "user", content: [{ type: "text", text: question || "Which part is this?" }, { type: "image_url", image_url: { url: image } }] }
    : { role: "user", content: question };
  try {
    const { res } = await chat({
      key,
      models: image ? MODELS.vision : MODELS.text,
      stream: true,
      maxTokens: 700,
      temperature: 0.4,
      messages: [{ role: "system", content: SYSTEM + "\n\nWhere they are:\n" + context }, ...history, user],
    });
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    const stream = new ReadableStream({
      async start(ctrl) {
        const reader = res.body!.getReader();
        let buf = "";
        try {
          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;
            buf += dec.decode(value, { stream: true });
            const lines = buf.split("\n");
            buf = lines.pop() ?? "";
            for (const line of lines) {
              const t = line.trim();
              if (!t.startsWith("data:")) continue;
              const data = t.slice(5).trim();
              if (data === "[DONE]") continue;
              try {
                const j = JSON.parse(data);
                const piece: string = j?.choices?.[0]?.delta?.content ?? "";
                if (piece) ctrl.enqueue(enc.encode(piece.replace(/\s*[\u2013\u2014]\s*/g, ", ")));
              } catch {
                /* partial line */
              }
            }
          }
        } finally {
          ctrl.close();
        }
      },
    });
    return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[help]", (e as Error).message);
    return Response.json({ error: "failed" }, { status: 502 });
  }
}
