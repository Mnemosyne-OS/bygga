import { useSyncExternalStore } from "react";

/*
 * The cartridge has no server to answer /build/kallax-2x2, so the route lives in the hash:
 * index.html#/build/kallax-2x2?step=3. Everything the site links to stays a plain path.
 */

export function currentRoute(): { path: string; search: URLSearchParams } {
  const raw = location.hash.replace(/^#/, "");
  const [path = "", query = ""] = raw.split("?");
  return { path: path.startsWith("/") ? path : "/", search: new URLSearchParams(query) };
}

/** A path on the site, as opposed to another site or a protocol-relative URL. */
export const isInternal = (href: string) => href.startsWith("/") && !href.startsWith("//");

export const toHash = (href: string) => "#" + href;

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

export function useHash(): string {
  return useSyncExternalStore(subscribe, () => location.hash, () => "");
}
