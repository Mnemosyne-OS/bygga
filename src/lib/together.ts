import "server-only";

const BASE = "https://api.together.xyz/v1";

export const MODELS = {
  // laying out a scanned manual: the strongest reasoning we can afford per scan
  plan: list(process.env.TOGETHER_PLAN_MODEL, "openai/gpt-oss-120b,zai-org/GLM-5.3-Flash,Qwen/Qwen3.7-Plus"),
  // product lookups and the "Stuck?" chat: cheap and quick
  text: list(process.env.TOGETHER_TEXT_MODEL, "openai/gpt-oss-120b,zai-org/GLM-5.3-Flash,Qwen/Qwen3.8-Flash"),
  // box labels and loose parts
  vision: list(process.env.TOGETHER_VISION_MODEL, "nvidia/NVIDIA-Nemotron-3.5-Super-VL,MiniMaxAI/MiniMax-M3,Qwen/Qwen3.5-9B"),
  // reading manual pages, where small print matters most
  read: list(process.env.TOGETHER_READ_MODEL, "MiniMaxAI/MiniMax-M3,nvidia/NVIDIA-Nemotron-3.5-Super-VL,Qwen/Qwen3.5-9B"),
};

function list(env: string | undefined, fallback: string) {
  return (env?.trim() || fallback).split(",").map((m) => m.trim()).filter(Boolean);
}

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
  /** The person's own key. Falls back to the server key, unless `fallback` is false. */
  key?: string;
  /** False for calls that must only ever spend the person's own credit. */
  fallback?: boolean;
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
  // a visitor's saved key can expire: the server key takes over when it is turned away
  const keys = [...new Set([o.key?.trim(), o.fallback === false ? undefined : process.env.TOGETHER_API_KEY?.trim()].filter((k): k is string => !!k))];
  if (!keys.length) throw new TogetherError("missing key", 401);
  let lastErr: TogetherError | null = null;
  for (const key of keys) {
    try {
      return await chatWith(o, key);
    } catch (e) {
      lastErr = e as TogetherError;
      if (!(e instanceof TogetherError) || (e.status !== 401 && e.status !== 403)) throw e;
    }
  }
  throw lastErr!;
}

async function chatWith(o: ChatOpts, key: string): Promise<{ res: Response; model: string }> {
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

/**
 * Tiny in-memory rate limiter. Pass a bucket per route ("1.2.3.4:voice") so a
 * chatty route can't use up another's allowance; refused calls don't count.
 */
const hits = new Map<string, number[]>();

export function rateLimited(bucket: string, max = 20, windowMs = 60_000) {
  const now = Date.now();
  const arr = (hits.get(bucket) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    hits.set(bucket, arr);
    return true;
  }
  arr.push(now);
  hits.set(bucket, arr);
  if (hits.size > 5000) hits.clear();
  return false;
}

/** A key the person pasted into the app, sent along with their request. Never stored or logged. */
export function userKey(req: Request) {
  const k = req.headers.get("x-together-key")?.trim() ?? "";
  return k.length >= 20 && k.length <= 200 && /^[\w.-]+$/.test(k) ? k : undefined;
}

/**
 * True for requests from this site's own pages. Other sites can't make their visitors'
 * browsers spend the key: browsers say where a request came from, and a JSON body
 * can't be sent across sites without a preflight we never answer.
 */
export function fromApp(req: Request, json = true) {
  if (json && !(req.headers.get("content-type") ?? "").includes("application/json")) return false;
  const site = req.headers.get("sec-fetch-site");
  if (site) return site === "same-origin";
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export function ipOf(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
}
