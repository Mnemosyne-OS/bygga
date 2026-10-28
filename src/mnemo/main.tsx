import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import "../app/guide.css";
import "../app/home.css";
import "./mnemo.css";
import Home from "../app/page";
import Browse from "../app/browse/page";
import Builds from "../app/builds/page";
import NotFound from "../app/not-found";
import GuideApp from "@/components/guide/GuideApp";
import PrintGuide from "@/components/guide/PrintGuide";
import { currentRoute, isInternal, navigate, useHash } from "./router";

/*
 * The site's /api routes run on a server with the visitor's Together key. The cartridge has
 * neither: they answer at once, the way the site answers a visitor with no key, until the
 * host's inference takes their place.
 */
const siteFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (url.startsWith("/api/")) return Promise.resolve(Response.json({ error: "key" }, { status: 401 }));
  return siteFetch(input, init);
};

// Some links are plain <a href="/builds">, outside next/link: they would leave the cartridge.
document.addEventListener("click", (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element | null)?.closest("a");
  const href = a?.getAttribute("href");
  if (!a || !href || a.target === "_blank" || !isInternal(href)) return;
  e.preventDefault();
  navigate(href);
});

/** The routes of src/app, read the way their pages read params and searchParams. */
function App() {
  useHash();
  const { path, search } = currentRoute();
  // braces matter: scrollTo returns a Promise in recent Chromium, and React would call it as the cleanup
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const build = /^\/build\/([^/]+)(\/print)?$/.exec(path);
  if (build) {
    const slug = decodeURIComponent(build[1]);
    if (build[2]) return <PrintGuide key={slug} slug={slug} />;
    const step = Number(search.get("step"));
    return <GuideApp key={slug} slug={slug} query={search.get("q")?.slice(0, 80)} kind={search.get("kind") ?? undefined} step={step > 0 ? Math.floor(step) : undefined} />;
  }
  if (path === "/") return <Home />;
  if (path === "/browse") return <Browse />;
  if (path === "/builds") return <Builds />;
  return <NotFound />;
}

createRoot(document.getElementById("root")!).render(<App />);
