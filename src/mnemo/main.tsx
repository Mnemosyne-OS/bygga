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
import { currentRoute, decodeSegment, isInternal, navigate, pageGeneration, useHash } from "./router";
import { startAgentDoor } from "./agentDoor";
import { answerSiteApi } from "./siteApi";
import PageErrorBoundary from "./PageErrorBoundary";

// before the first render: the host's relay keeps a subscription that arrives before it listens (doc 149 §17)
startAgentDoor();

// The site's /api routes run on a server: siteApi.ts answers them as the site does without a key.
const siteFetch = window.fetch.bind(window);
window.fetch = (input, init) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  return answerSiteApi(url, init) ?? siteFetch(input, init);
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

/** The page under a route of src/app, read the way their pages read params and searchParams. */
function Page({ path, search }: { path: string; search: URLSearchParams }) {
  const build = /^\/build\/([^/]+)(\/print)?$/.exec(path);
  if (build) {
    const slug = decodeSegment(build[1]);
    if (build[2]) return <PrintGuide key={slug} slug={slug} />;
    const step = Number(search.get("step"));
    return <GuideApp key={`${slug}:${pageGeneration()}`} slug={slug} query={search.get("q")?.slice(0, 80)} kind={search.get("kind") ?? undefined} step={step > 0 ? Math.floor(step) : undefined} />;
  }
  if (path === "/") return <Home />;
  if (path === "/browse") return <Browse />;
  if (path === "/builds") return <Builds />;
  return <NotFound />;
}

function App() {
  useHash();
  const { path, search } = currentRoute();
  // braces matter: scrollTo returns a Promise in recent Chromium, and React would call it as the cleanup
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  return (
    <PageErrorBoundary key={path}>
      <Page path={path} search={search} />
    </PageErrorBoundary>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
