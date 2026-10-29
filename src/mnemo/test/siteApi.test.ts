// @vitest-environment node
/*
 * siteApi.ts: the site's /api routes, answered here the way the site answers a visitor with
 * no key. /api/guide is the one that works without a key on the site, so it works here too.
 */
import { describe, expect, it, vi } from "vitest";
import { matchCatalog } from "@/lib/search";
import { answerSiteApi } from "../siteApi";

const post = (q: unknown) => ({ method: "POST", body: JSON.stringify({ q }) });
const read = async (r: Promise<Response> | null) => {
  const res = await r!;
  return { status: res.status, body: (await res.json()) as Record<string, unknown> };
};

describe("/api/guide: the catalog alone, as the route does before it reaches for a key", () => {
  it("a product of the catalog comes back as the catalog's own", async () => {
    const { status, body } = await read(answerSiteApi("/api/guide", post("BILLY")));
    expect(status).toBe(200);
    expect(body).toMatchObject({ via: "catalog", spec: { slug: matchCatalog("BILLY")!.slug } });
  });

  it("a name the catalog does not have, with a kind it can draw, gets a typical build", async () => {
    const { body } = await read(answerSiteApi("/api/guide", post("NORDBO bookcase")));
    expect(body.via).toBe("guess");
    expect(body.spec).toBeTruthy();
  });

  it("nothing to draw: found false with close names, never an invented product", async () => {
    const { body } = await read(answerSiteApi("/api/guide", post("zzzzqq")));
    expect(body).toMatchObject({ found: false, via: "offline" });
    expect(Array.isArray(body.suggestions)).toBe(true);
  });

  it("an empty or unreadable question is a 400, said in the console", async () => {
    expect((await read(answerSiteApi("/api/guide", post("")))).status).toBe(400);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect((await read(answerSiteApi("/api/guide", { method: "POST", body: "{not json" }))).status).toBe(400);
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });
});

describe("every other route: the answer the site gives a visitor with no key", () => {
  it("help, identify, listen, scan, voice and feedback say { error: key } with a 401", async () => {
    for (const route of ["/api/help", "/api/identify", "/api/listen", "/api/scan", "/api/voice?t=hi", "/api/feedback"]) {
      expect(await read(answerSiteApi(route, { method: "POST" }))).toEqual({ status: 401, body: { error: "key" } });
    }
  });

  it("a URL outside /api is left to the network", () => {
    expect(answerSiteApi("./voice/heart/manifest.json")).toBeNull();
    expect(answerSiteApi("/apiary")).toBeNull();
  });
});
