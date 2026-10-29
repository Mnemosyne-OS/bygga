import { catalogSpec, PRODUCTS } from "@/lib/catalog";
import { fold } from "@/lib/fold";
import { matchCatalog, searchCatalog } from "@/lib/search";
import type { ProductSpec } from "@/lib/types";
import { frame, hostNow, sdk } from "./host";
import { currentRoute, decodeSegment, navigate, restartPage } from "./router";
import { fill, strings } from "./strings";

/*
 * The agent door (Mnemosyne OS doc 149): what an agent, or the orb, may do in Bygga. Each
 * action does what the person's own key or link does: next, back and again press the guide's
 * keyboard shortcuts, open follows the same route as a search. Every action checks the screen:
 * next, back and open read it back after the gesture, and again, whose replay changes nothing
 * a reader can see, reads it before. An action that cannot have happened is refused, never
 * counted as done.
 */

// GuideApp writes where you are into the title: « Step 3 of 9, KALLAX | Bygga » on the steps,
// « Built: KALLAX | Bygga » at the end, the product's own title before the steps. The build
// refuses to start if those templates move upstream (vite.mnemo.config.ts, guideTitleGuard).
const STEP_TITLE = /^Step (\d+) of (\d+), /;
const BUILT_TITLE = "Built: ";

type Screen =
  | { screen: "home" | "browse" | "workshop" | "other" }
  | {
      screen: "guide";
      slug: string;
      product: string;
      variant: string | null;
      phase: "before-steps" | "steps" | "built";
      step?: number;
      of?: number;
    };

function readScreen(): Screen {
  const { path } = currentRoute();
  const guide = /^\/build\/([^/]+)$/.exec(path);
  if (!guide) return { screen: path === "/" ? "home" : path === "/browse" ? "browse" : path === "/builds" ? "workshop" : "other" };
  const slug = decodeSegment(guide[1]);
  const spec = catalogSpec(slug);
  const base = { screen: "guide" as const, slug, product: spec?.name ?? slug.toUpperCase(), variant: spec?.variant ?? null };
  const step = STEP_TITLE.exec(document.title);
  if (step) return { ...base, phase: "steps", step: Number(step[1]), of: Number(step[2]) };
  if (document.title.startsWith(BUILT_TITLE)) return { ...base, phase: "built" };
  return { ...base, phase: "before-steps" };
}

/** A refusal the orb says to the person as written. */
const toPerson = (sentence: string) => new Error(`TO_PERSON: ${sentence}`);

const say = () => strings(hostNow().lang);

/** Waits for the screen to answer, reading it every 50 ms; null when it never does. */
async function until<T>(read: () => T | null, ms: number): Promise<T | null> {
  const end = Date.now() + ms;
  for (;;) {
    const value = read();
    if (value !== null || Date.now() >= end) return value;
    await new Promise((r) => setTimeout(r, 50));
  }
}

// The help sheet, the overview and the key dialog are all role="dialog", and while one is
// open GuideApp ignores every key: a gesture sent then would be swallowed.
const covered = () => document.querySelector('[role="dialog"]') !== null;

/** The guide on its steps, free to take a key, or the refusal that says why it is not. */
function guideOnSteps() {
  const now = readScreen();
  if (now.screen !== "guide") throw toPerson(say().noGuide);
  if (now.phase === "built") throw toPerson(say().finished);
  if (now.phase !== "steps") throw toPerson(say().notOnSteps);
  if (covered()) throw toPerson(say().covered);
  return now;
}

function spoken(now: Screen) {
  const t = say();
  if (now.screen !== "guide") return { ...now };
  if (now.phase === "steps") return { ...now, say: fill(t.step, { n: now.step ?? 0, of: now.of ?? 0 }) };
  if (now.phase === "built") return { ...now, say: fill(t.built, { product: now.product }) };
  return { ...now, say: t.parts };
}

async function press(key: "ArrowRight" | "ArrowLeft") {
  const before = guideOnSteps();
  const title = document.title;
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));
  // something can still swallow the key: nothing moves, and that is said
  const moved = await until(() => (document.title !== title ? readScreen() : null), 800);
  if (!moved || (moved.screen === "guide" && moved.slug !== before.slug)) throw toPerson(say().notMoved);
  return spoken(moved);
}

// Words a person says around a product name, in the host's three first languages. The site's
// search scores the FIRST word as the name, so « la Kallax » matched LACK by its first letters
// and « my billy » matched MYDAL. IKEA is the brand, not a product.
const AROUND = new Set(["le", "la", "les", "l", "un", "une", "des", "du", "de", "d", "the", "a", "an", "my", "mon", "ma", "mes", "el", "los", "las", "lo", "mi", "mis", "ikea"]);

let firstWords: Set<string> | null = null;

/** The first word of every product name in the catalog, the IKEA PS line's brand word aside. */
function productWords() {
  firstWords ??= new Set(PRODUCTS.map((e) => fold(e.name).split(" ")[0]).filter((w) => w && w !== "ikea"));
  return firstWords;
}

/**
 * The catalog product a person means, or null. The search box shows a list a person picks
 * from; an agent takes the first result blind, so the name the person said must be the name of
 * what opens: the query starts at that name, and a match under another name is refused.
 */
export function productFor(said: string): ProductSpec | null {
  const words = fold(said).split(" ").filter(Boolean);
  const at = words.findIndex((w) => productWords().has(w));
  if (at < 0) return matchCatalog(words.filter((w) => !AROUND.has(w)).join(" "));
  const named = words[at];
  const after = words.slice(at + 1).filter((w) => !AROUND.has(w));
  const before = words.slice(0, at).filter((w) => !AROUND.has(w));
  // the name with what followed it (a size), then with what came before (a kind), then alone
  for (const query of [[named, ...after], [named, ...after, ...before], [named]]) {
    const spec = matchCatalog(query.join(" "));
    if (spec && fold(spec.name).split(" ")[0] === named) return spec;
  }
  return null;
}

const handlers = {
  status: () => readScreen(),

  open: async (args: Record<string, unknown>) => {
    const q = String(args.product ?? "").trim();
    const spec = productFor(q);
    if (!spec?.slug) {
      const names = [...new Set(searchCatalog(q, 6).map((hit) => hit.entry.name))].slice(0, 3);
      throw toPerson(fill(say().noProduct, { q }) + (names.length ? fill(say().closeNames, { names: names.join(", ") }) : ""));
    }
    const slug = spec.slug;
    const step = typeof args.step === "number" && args.step >= 1 ? Math.floor(args.step) : null;
    if (step === null) {
      navigate(`/build/${slug}`);
      const shown = await until(() => {
        const now = readScreen();
        return now.screen === "guide" && now.slug === slug && document.title.includes(spec.name) ? now : null;
      }, 2000);
      // a guide that never painted its title was not seen by anyone: not « Here is … »
      if (!shown) throw toPerson(fill(say().notShown, { product: spec.name }));
      return { ...shown, say: fill(say().opened, { product: spec.name }) };
    }
    // the site's own ?step= link, read by a guide that starts over: straight to that step
    navigate(`/build/${slug}?step=${step}`);
    restartPage();
    const onStep = await until(() => {
      const now = readScreen();
      return now.screen === "guide" && now.slug === slug && now.phase === "steps" && now.step === Math.min(step, now.of ?? step) ? now : null;
    }, 3000);
    if (!onStep || onStep.screen !== "guide") throw toPerson(say().notMoved);
    return { ...onStep, say: fill(say().openedAt, { product: spec.name, n: onStep.step ?? step, of: onStep.of ?? 0 }) };
  },

  next: () => press("ArrowRight"),

  back: () => press("ArrowLeft"),

  again: () => {
    const now = guideOnSteps();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "r" }));
    return spoken(now);
  },
};

/** What the host answered, in the cartridge window's console. */
function tell(line: string, refused = false) {
  if (refused) console.warn(`[bygga] agent door: ${line}`);
  else console.info(`[bygga] agent door: ${line}`);
}

// After a refusal the SDK stops listening, so the window stays unreachable until it reloads.
// The host may refuse for a passing reason (its manifest read timed out): ask again.
const RETRY_MS = [2000, 5000, 10000];

/**
 * Subscribes to the host before the app renders: the host's relay keeps a subscription that
 * arrives before it listens. `attempt` counts the requests made after a refusal.
 *
 * No deadline on the answer (0): the relay answers once the window shows its page, and a
 * window folded to its title bar can stay so for hours. A deadline would withdraw the
 * subscription just before the person unfolds it. So the only rejection left is a refusal,
 * and the SDK has already removed its listener: asking again never stacks one.
 */
export function startAgentDoor(attempt = 0) {
  try {
    sdk.onAgentActions(handlers, 0).ready.then(
      ({ actions }) => tell(`served: ${actions.join(", ") || "nothing"}`),
      (err: unknown) => {
        const reason = err instanceof Error ? err.message : String(err);
        // a page opened outside Mnemosyne has no host to ask
        if (!frame.inHost()) {
          tell(`no host (${reason})`);
          return;
        }
        const wait = RETRY_MS[attempt];
        tell(`refused (${reason})${wait ? `, asking again in ${wait / 1000} s` : ""}`, true);
        if (wait) setTimeout(() => startAgentDoor(attempt + 1), wait);
      },
    );
  } catch (err) {
    console.warn("[bygga] the agent door did not start, the guides still run:", err);
  }
}
