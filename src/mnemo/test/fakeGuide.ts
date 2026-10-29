import { catalogSpec } from "@/lib/catalog";

/*
 * Test fixture for the cartridge layer (born from the verification pass of doc 188).
 * A page that behaves like GuideApp as far as the agent door can see it: the title says
 * where you are (the exact three shapes GuideApp writes), the arrow keys and R are read on
 * window, a step deep link is read once at mount, and a sheet over the guide swallows keys.
 */
export type FakeGuide = {
  phase: "cover" | "steps" | "done";
  step: number;
  of: number;
  /** Every key is ignored, with nothing drawn over the guide to say why. */
  swallow: boolean;
  /** A role="dialog" is open over the guide, as GuideApp's help, overview and key dialog are: keys are ignored. */
  dialog: boolean;
  /** Whether ?step= is honoured at mount (GuideApp does). */
  deepLinks: boolean;
  replays: number;
  /** When false the page never paints its title: a guide that never mounts. */
  paints: boolean;
};

function route() {
  const raw = location.hash.replace(/^#/, "");
  const [path = "", q = ""] = raw.split("?");
  return { path, search: new URLSearchParams(q) };
}

export function mountFakeGuide(opts: Partial<FakeGuide> = {}) {
  const g: FakeGuide = { phase: "cover", step: 0, of: 9, swallow: false, dialog: false, deepLinks: true, replays: 0, paints: true, ...opts };
  const sheet = g.dialog ? document.body.appendChild(Object.assign(document.createElement("div"), { role: "dialog" })) : null;
  sheet?.setAttribute("role", "dialog");

  const paint = () => {
    if (!g.paints) return;
    const m = /^\/build\/([^/]+)$/.exec(route().path);
    if (!m) {
      document.title = "Bygga";
      return;
    }
    const spec = catalogSpec(decodeURIComponent(m[1]));
    const name = spec?.name ?? m[1].toUpperCase();
    document.title =
      g.phase === "steps"
        ? `Step ${g.step + 1} of ${g.of}, ${name} | Bygga`
        : g.phase === "done"
          ? `Built: ${name} | Bygga`
          : `${name} ${(spec?.variant ?? "").toLowerCase()}: assembly step by step | Bygga`;
  };

  // mounts the page under the route, as a reload would: the deep link is read once
  const mount = () => {
    const step = Number(route().search.get("step"));
    if (g.deepLinks && step > 0) {
      g.phase = "steps";
      g.step = Math.min(Math.floor(step), g.of) - 1;
    } else {
      g.phase = "cover";
      g.step = 0;
    }
    paint();
  };

  const onKey = (e: KeyboardEvent) => {
    if (g.swallow || g.dialog) return;
    if (g.phase !== "steps") return;
    if (e.key === "ArrowRight") {
      if (g.step + 1 < g.of) g.step++;
      else g.phase = "done";
    } else if (e.key === "ArrowLeft") {
      if (g.step > 0) g.step--;
      else g.phase = "cover";
    } else if (e.key.toLowerCase() === "r") {
      g.replays++;
      return;
    } else return;
    paint();
  };

  window.addEventListener("keydown", onKey);
  window.addEventListener("hashchange", mount);
  mount();

  return {
    g,
    /** Puts the guide on a step directly, as the person who pressed Start building did. */
    onStep(step: number) {
      g.phase = "steps";
      g.step = step - 1;
      paint();
    },
    paint,
    unmount() {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", mount);
      sheet?.remove();
    },
  };
}

/**
 * Sets the route, lets the hashchange that jsdom queues for it pass, then mounts the page:
 * otherwise that late event remounts the fake in the middle of a test.
 */
export async function openPage(hash: string, opts: Partial<FakeGuide> = {}) {
  location.hash = hash;
  await sleep(0);
  return mountFakeGuide(opts);
}

/**
 * Tells the door the host's language, the way the host does (MNEMO_CONFIG_UPDATE). A real
 * postMessage in jsdom carries no `source`, and the SDK only listens to its parent frame,
 * so the event is built by hand with the window as its source (= window.parent here).
 */
export function hostSpeaks(lang: string, assistantName?: string) {
  window.dispatchEvent(new MessageEvent("message", { data: { type: "MNEMO_CONFIG_UPDATE", lang, assistantName }, source: window }));
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
