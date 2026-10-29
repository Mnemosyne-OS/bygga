// @vitest-environment node
/*
 * Doc 188 §3, rule 2, the module swap and the title guard: the build-time plugins of
 * vite.mnemo.config.ts, fed with the site's REAL files.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import config from "../../../vite.mnemo.config";

const root = path.resolve(fileURLToPath(new URL("../../../", import.meta.url)));
const at = (p: string) => path.join(root, p);
const norm = (p: string) => p.replace(/\\/g, "/").toLowerCase();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cfg = (config as any)({ mode: "production", command: "build" });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const plugin = (name: string) => cfg.plugins.find((p: any) => p?.name === name);

/** The bit of Rollup's plugin context the two hooks use. */
const ctx = {
  error(msg: string): never {
    throw new Error(msg);
  },
};

const SCRIPT = at("src/lib/voice/script.ts");
const DRAWING = at("src/components/Drawing.tsx");

describe("rule 2: relativeAssets rewrites the two files, and breaks the build when they moved", () => {
  const relative = plugin("mnemo-relative-assets");

  it("the site's own voice script loads clips from ./voice/", () => {
    const code = readFileSync(SCRIPT, "utf8");
    const out = relative.transform.call(ctx, code, SCRIPT);
    expect(out).not.toBeNull();
    expect(out.code).toContain("`./voice/");
    expect(out.code).not.toContain("`/voice/");
  });

  it("the site's own Drawing loads its pictures from ./og/", () => {
    const code = readFileSync(DRAWING, "utf8");
    const out = relative.transform.call(ctx, code, DRAWING);
    expect(out).not.toBeNull();
    expect(out.code).toContain("`./og/");
    expect(out.code).not.toContain("`/og/");
  });

  it("another file of the site is left alone", () => {
    const file = at("src/components/guide/voice.ts");
    expect(relative.transform.call(ctx, readFileSync(file, "utf8"), file)).toBeNull();
  });

  it("a Vite query suffix does not hide the file", () => {
    const code = readFileSync(SCRIPT, "utf8");
    expect(relative.transform.call(ctx, code, SCRIPT + "?v=123").code).toContain("`./voice/");
  });

  it("the build FAILS when the path moved upstream, instead of shipping a mute cartridge", () => {
    const moved = readFileSync(SCRIPT, "utf8").replaceAll("`/voice/", "`/sounds/");
    expect(() => relative.transform.call(ctx, moved, SCRIPT)).toThrow(/asset paths moved upstream/);
    const movedDrawing = readFileSync(DRAWING, "utf8").replaceAll("`/og/", "`/pictures/");
    expect(() => relative.transform.call(ctx, movedDrawing, DRAWING)).toThrow(/asset paths moved upstream/);
  });
});

describe("guideTitleGuard: the build stops if GuideApp no longer writes the titles the door parses", () => {
  const guard = plugin("mnemo-guide-title-guard");
  const GUIDE = at("src/components/guide/GuideApp.tsx");

  it("the site's real GuideApp passes untouched", () => {
    expect(guard.transform.call(ctx, readFileSync(GUIDE, "utf8"), GUIDE)).toBeNull();
  });

  it("a GuideApp that words the end differently breaks the build, naming what to update", () => {
    const moved = readFileSync(GUIDE, "utf8").replace("`Built: ", "`Done: ");
    expect(() => guard.transform.call(ctx, moved, GUIDE)).toThrow(/Built: .*agentDoor\.ts/);
  });

  it("any other file is left alone", () => {
    expect(guard.transform.call(ctx, "no titles here", at("src/components/Logo.tsx"))).toBeNull();
  });
});

describe("swapModules: the cartridge's KeyModal and SiteHeader reach every importer", () => {
  const swap = plugin("mnemo-swap-modules");
  /** A resolver like Vite's: relative to the importer, `@/` to src/, `.tsx` added. */
  const resolveCtx = {
    async resolve(source: string, importer: string) {
      const base = source.startsWith("@/") ? at(path.join("src", source.slice(2))) : path.resolve(path.dirname(importer), source);
      return { id: base.endsWith(".tsx") ? base : base + ".tsx" };
    },
  };

  it("../KeyModal from GuideApp becomes src/mnemo/KeyModal.tsx", async () => {
    const id = await swap.resolveId.call(resolveCtx, "../KeyModal", at("src/components/guide/GuideApp.tsx"), {});
    expect(norm(id)).toBe(norm(at("src/mnemo/KeyModal.tsx")));
  });

  it("@/components/SiteHeader from a page becomes src/mnemo/SiteHeader.tsx", async () => {
    const id = await swap.resolveId.call(resolveCtx, "@/components/SiteHeader", at("src/app/page.tsx"), {});
    expect(norm(id)).toBe(norm(at("src/mnemo/SiteHeader.tsx")));
  });

  it("a file that is not swapped resolves as usual (null = let Vite do it)", async () => {
    expect(await swap.resolveId.call(resolveCtx, "../Logo", at("src/components/guide/GuideApp.tsx"), {})).toBeNull();
  });

  it("the real importers of the two swapped files exist in the site", () => {
    const grep = (file: string, needle: RegExp) => needle.test(readFileSync(at(file), "utf8"));
    expect(grep("src/components/guide/GuideApp.tsx", /from "\.\.\/KeyModal"/)).toBe(true);
    expect(grep("src/components/home/Search.tsx", /from "\.\.\/KeyModal"/)).toBe(true);
    expect(grep("src/app/page.tsx", /SiteHeader/)).toBe(true);
  });
});
