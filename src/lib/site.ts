export const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO ?? "Luffixos/bygga";
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

/** The manual scanner (/scan) is parked for a later version: hidden everywhere unless NEXT_PUBLIC_SCAN=1. */
export const SCAN_ENABLED = process.env.NEXT_PUBLIC_SCAN === "1";
