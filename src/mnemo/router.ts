import { useSyncExternalStore } from "react";

/*
 * The cartridge has no server to answer /build/kallax-2x2, so the route lives in the hash:
 * index.html#/build/kallax-2x2?step=3. Everything the site links to stays a plain path.
 */

/** The route in the hash: its path ("/" when empty) and its query. */
export function currentRoute(): { path: string; search: URLSearchParams } {
  const raw = location.hash.replace(/^#/, "");
  const [path = "", query = ""] = raw.split("?");
  return { path: path.startsWith("/") ? path : "/", search: new URLSearchParams(query) };
}

/** A path on the site, as opposed to another site or a protocol-relative URL. */
export const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

/** The hash that carries a site path. */
export const toHash = (href: string) => "#" + href;

/** A path segment as written, when its escapes are broken (« 100% ») rather than a throw. */
export function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    // a malformed escape is the person's own text: keep it as typed
    return segment;
  }
}

/** Goes to a site path; `replace` rewrites the current entry instead of adding one. */
export function navigate(href: string, replace = false) {
  if (!replace) {
    location.hash = href;
    return;
  }
  history.replaceState(history.state, "", toHash(href));
  // replaceState fires nothing, and the app follows the hash
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

// Bumped to start the page under the route over, as a reload would: a guide only reads its
// ?step= deep link when it mounts.
let generation = 0;

/** How many times the page under the route was started over. */
export const pageGeneration = () => generation;

/** Starts the page under the route over, as a reload would. */
export function restartPage() {
  generation++;
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

/** Re-renders on every route change and every restart of the page. */
export function useHash(): string {
  return useSyncExternalStore(subscribe, () => `${generation}|${location.hash}`, () => "");
}
