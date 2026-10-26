/*
 * Keeps guides working with a bad signal (garages, basements, new flats).
 * Pages: network first, the last copy when offline. Hashed build files and
 * voice clips: cache first, they never change under the same name.
 * The API is never cached here.
 */
const PAGES = "bygga-pages-v3";
const FILES = "bygga-files-v3";
const KEEP = [PAGES, FILES];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  // the search is always there, even if the first visit was a guide
  e.waitUntil(caches.open(PAGES).then((c) => c.add("/")).catch(() => {}));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function trim(name, max) {
  const c = await caches.open(name);
  const keys = await c.keys();
  for (const k of keys.slice(0, Math.max(0, keys.length - max))) await c.delete(k);
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || url.pathname.startsWith("/api/") || url.pathname.startsWith("/dev/")) return;
  // media elements ask for byte ranges: let the network answer those
  if (req.headers.has("range")) return;

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(PAGES).then((c) => c.put(req, copy).then(() => trim(PAGES, 40)));
          }
          return res;
        })
        // offline: this page, the same guide at another step, or the home page
        .catch(async () => (await caches.match(req)) || (await caches.match(req, { ignoreSearch: true })) || caches.match("/")),
    );
    return;
  }

  // the clip list changes with every recording: network first, the last copy when offline
  if (url.pathname.endsWith("/manifest.json")) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(FILES).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req)),
    );
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/voice/") || /\.(woff2?|png|svg)$/.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok && res.type === "basic") {
              const copy = res.clone();
              caches.open(FILES).then((c) => c.put(req, copy).then(() => trim(FILES, 600)));
            }
            return res;
          }),
      ),
    );
  }
});
