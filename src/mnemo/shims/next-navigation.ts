import { useMemo } from "react";
import { currentRoute, navigate, useHash } from "../router";

/** The three hooks the site's components use, on the hash route. */

const router = {
  push: (href: string) => navigate(href),
  replace: (href: string) => navigate(href, true),
  back: () => history.back(),
  forward: () => history.forward(),
  refresh: () => {},
  prefetch: () => {},
};

export function useRouter() {
  return router;
}

export function usePathname(): string {
  useHash();
  return currentRoute().path;
}

export function useSearchParams(): URLSearchParams {
  const hash = useHash();
  return useMemo(() => currentRoute().search, [hash]); // eslint-disable-line react-hooks/exhaustive-deps
}
