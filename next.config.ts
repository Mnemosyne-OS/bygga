import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // the share cards read their fonts and drawings from disk
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/lib/og/*.woff", "./public/og/step-hero.png", "./public/og/kallax-2x2.png"],
    "/twitter-image": ["./src/lib/og/*.woff", "./public/og/step-hero.png", "./public/og/kallax-2x2.png"],
    "/build/*/opengraph-image*": ["./src/lib/og/*.woff", "./public/og/*.png"],
    "/build/*/twitter-image*": ["./src/lib/og/*.woff", "./public/og/*.png"],
  },
  async headers() {
    return [
      {
        // the service worker itself must never be stale
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      },
      {
        // clips are named after their text, so a file only changes when it is re-recorded
        source: "/voice/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
    ];
  },
  async redirects() {
    // the manual scanner is parked for v2: old links land on the search instead
    return process.env.NEXT_PUBLIC_SCAN === "1" ? [] : [{ source: "/scan", destination: "/", permanent: false }];
  },
};

export default nextConfig;
