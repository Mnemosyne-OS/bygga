import "server-only";

const BASE = "https://api.together.xyz/v1";

export const MODELS = {
  plan: (process.env.TOGETHER_PLAN_MODEL ?? "openai/gpt-oss-120b,deepseek-ai/DeepSeek-V3.1,zai-org/GLM-5.2,meta-llama/Llama-3.3-70B-Instruct-Turbo").split(","),
  text: (process.env.TOGETHER_TEXT_MODEL ?? "openai/gpt-oss-120b,zai-org/GLM-5.2,deepseek-ai/DeepSeek-V3.1,meta-llama/Llama-3.3-70B-Instruct-Turbo").split(","),
  vision: (process.env.TOGETHER_VISION_MODEL ?? "Qwen/Qwen3-VL-32B-Instruct,Qwen/Qwen2.5-VL-72B-Instruct,meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8").split(","),
};

export function hasKey() {
  return !!process.env.TOGETHER_API_KEY?.trim();
}

type Content = string | ({ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } })[];
export interface Msg {
  role: "system" | "user" | "assistant";
  content: Content;
}

interface ChatOpts {
  models: string[];
  messages: Msg[];
  json?: boolean;
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
  signal?: AbortSignal;
  /** The person's own key. Falls back to the server key. */
  key?: string;
  reasoning?: "low" | "medium" | "high";
}

export class TogetherError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

/** Calls Together's chat completions, falling back through the model list when one is unavailable. */
export async function chat(o: ChatOpts): Promise<{ res: Response; model: string }> {
  const key = o.key?.trim() || process.env.TOGETHER_API_KEY?.trim();
  if (!key) throw new TogetherError("missing key", 401);
  let lastErr: TogetherError | null = null;
  for (const model of o.models.map((m) => m.trim()).filter(Boolean)) {
    const reasoning = model.includes("gpt-oss") ? { reasoning_effort: o.reasoning ?? "low" } : {};
    for (const withExtras of [true, false]) {
      const body = {
        model,
        messages: o.messages,
        max_tokens: o.maxTokens ?? 1400,
        temperature: o.temperature ?? 0.3,
        stream: !!o.stream,
        ...(o.json && withExtras ? { response_format: { type: "json_object" } } : {}),
        ...(withExtras ? reasoning : {}),
      };
      let res: Response;
      try {
        res = await fetch(`${BASE}/chat/completions`, {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: o.signal,
        });
      } catch (e) {
        lastErr = new TogetherError((e as Error).message, 502);
        break;
      }
      if (res.ok) return { res, model };
      const text = await res.text().catch(() => "");
      lastErr = new TogetherError(text.slice(0, 300) || res.statusText, res.status);
      if (res.status === 401 || res.status === 402 || res.status === 403 || res.status === 429) throw lastErr;
      // 400 may be an unsupported extra parameter: retry once without extras, otherwise move on
      if (res.status !== 400) break;
    }
  }
  throw lastErr ?? new TogetherError("no model available", 503);
}

export async function chatText(o: Omit<ChatOpts, "stream">) {
  const { res, model } = await chat(o);
  const j = await res.json();
  const text: string = j?.choices?.[0]?.message?.content ?? "";
  return { text, model };
}

export function extractJson(text: string): unknown {
  const t = text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fence ? fence[1] : t;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start < 0 || end < start) return null;
  try {
    return JSON.parse(body.slice(start, end + 1));
  } catch {
    return null;
  }
}

/** Tiny in-memory rate limiter per IP. */
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, max = 20, windowMs = 60_000) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > max;
}

/** A key the person pasted into the app, sent along with their request. Never stored or logged. */
export function userKey(req: Request) {
  const k = req.headers.get("x-together-key")?.trim() ?? "";
  return k.length >= 20 && k.length <= 200 && /^[\w.-]+$/.test(k) ? k : undefined;
}

export function ipOf(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
}
