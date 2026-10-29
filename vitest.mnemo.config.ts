import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/*
 * The cartridge layer's tests (src/mnemo/test). The same aliases as vite.mnemo.config.ts, so
 * the site's modules load as the cartridge build loads them.
 */

const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: [
      { find: /^next\/link$/, replacement: here("./src/mnemo/shims/next-link.tsx") },
      { find: /^next\/navigation$/, replacement: here("./src/mnemo/shims/next-navigation.ts") },
      { find: /^@vercel\/analytics$/, replacement: here("./src/mnemo/shims/vercel-analytics.ts") },
      { find: /^@\//, replacement: here("./src/") },
    ],
  },
  test: {
    environment: "node",
    include: ["src/mnemo/test/**/*.test.{ts,tsx}"],
    testTimeout: 15000,
  },
});
