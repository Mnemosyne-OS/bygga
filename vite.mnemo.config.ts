import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/*
 * The Mnemosyne OS cartridge build. It compiles the site's own components with Vite, next to
 * the Next build and without touching it: an installed cartridge is a folder of static files,
 * opened with no server behind it.
 */

const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));

/** The site serves its clips and drawings from the domain root; a cartridge lives in a folder. */
function relativeAssets(): Plugin {
  const files = [/src[\\/]lib[\\/]voice[\\/]script\.ts$/, /src[\\/]components[\\/]Drawing\.tsx$/];
  return {
    name: "mnemo-relative-assets",
    enforce: "pre",
    transform(code, id) {
      if (!files.some((f) => f.test(id.split("?")[0]))) return null;
      const out = code.replaceAll("`/voice/", "`./voice/").replaceAll("`/og/", "`./og/");
      // a silent no-op here would ship a cartridge with no voice and no drawings
      if (out === code) this.error(`nothing to rewrite in ${id}: the asset paths moved upstream`);
      return { code: out, map: null };
    },
  };
}

export default defineConfig(({ mode }) => ({
  root: here("./src/mnemo"),
  base: "./",
  publicDir: here("./public"),
  plugins: [relativeAssets(), react()],
  resolve: {
    alias: [
      { find: /^@\/components\/SiteHeader$/, replacement: here("./src/mnemo/SiteHeader.tsx") },
      { find: /^next\/link$/, replacement: here("./src/mnemo/shims/next-link.tsx") },
      { find: /^next\/navigation$/, replacement: here("./src/mnemo/shims/next-navigation.ts") },
      { find: /^@vercel\/analytics$/, replacement: here("./src/mnemo/shims/vercel-analytics.ts") },
      { find: /^@\//, replacement: here("./src/") },
    ],
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode === "production" ? "production" : "development"),
    "process.env.NEXT_PUBLIC_SCAN": "undefined",
    "process.env.NEXT_PUBLIC_GITHUB_REPO": "undefined",
    "process.env.NEXT_PUBLIC_SITE_URL": "undefined",
  },
  build: {
    // the host serves an installed cartridge from <cartridge>/dist
    outDir: here("./dist"),
    emptyOutDir: true,
    rollupOptions: {
      onwarn(w, warn) {
        // "use client" means nothing to a single client bundle
        if (w.code === "MODULE_LEVEL_DIRECTIVE") return;
        warn(w);
      },
    },
  },
  server: { host: "127.0.0.1", port: 5397, strictPort: true },
  preview: { host: "127.0.0.1", port: 5397, strictPort: true },
}));
