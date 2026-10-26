export const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO ?? "Luffixos/bygga";
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

/** Where the site lives, for share cards, the sitemap and absolute links. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bygga-eta.vercel.app").replace(/\/$/, "");

/** The manual scanner (/scan) is parked for a later version: hidden everywhere unless NEXT_PUBLIC_SCAN=1. */
export const SCAN_ENABLED = process.env.NEXT_PUBLIC_SCAN === "1";
