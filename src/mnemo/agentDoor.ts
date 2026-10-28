import { catalogSpec } from "@/lib/catalog";
import { matchCatalog, searchCatalog } from "@/lib/search";
import { hostNow, sdk } from "./host";
import { currentRoute, navigate } from "./router";
import { fill, strings } from "./strings";

/*
 * The agent door (Mnemosyne OS doc 149): what an agent, or the orb, may do in Bygga. Each
 * action does what the person's own key or link does: next, back and again press the guide's
 * keyboard shortcuts, open follows the same route as a search. Then the screen is read back,
 * so an action that changed nothing is refused instead of counted as done.
 */

// GuideApp writes where you are into the title: « Step 3 of 9, KALLAX | Bygga » on the steps,
// « Built: KALLAX | Bygga » at the end, the product's own title before the steps.
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
  const slug = decodeURIComponent(guide[1]);
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

/** The guide on its steps, or the refusal that says why it is not. */
function guideOnSteps() {
  const now = readScreen();
  if (now.screen !== "guide") throw toPerson(say().noGuide);
  if (now.phase === "built") throw toPerson(say().finished);
  if (now.phase !== "steps") throw toPerson(say().notOnSteps);
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
  // a sheet or a dialog over the guide swallows the key: nothing moves, and that is said
  const moved = await until(() => (document.title !== title ? readScreen() : null), 800);
  if (!moved || (moved.screen === "guide" && moved.slug !== before.slug)) throw toPerson(say().notMoved);
  return spoken(moved);
}

const handlers = {
  status: () => readScreen(),

  open: async (args: Record<string, unknown>) => {
    const q = String(args.product ?? "").trim();
    const spec = matchCatalog(q);
    if (!spec?.slug) {
      const names = [...new Set(searchCatalog(q, 6).map((hit) => hit.entry.name))].slice(0, 3);
      throw toPerson(fill(say().noProduct, { q }) + (names.length ? fill(say().closeNames, { names: names.join(", ") }) : ""));
    }
    const slug = spec.slug;
    navigate(`/build/${slug}`);
    const shown = await until(() => {
      const now = readScreen();
      return now.screen === "guide" && now.slug === slug && document.title.includes(spec.name) ? now : null;
    }, 2000);
    return { ...(shown ?? readScreen()), say: fill(say().opened, { product: spec.name }) };
  },

  next: () => press("ArrowRight"),

  back: () => press("ArrowLeft"),

  again: () => {
    const now = guideOnSteps();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "r" }));
    return spoken(now);
  },
};

/** Registered once, before the app renders: the host keeps the first subscription a frame sends. */
export function startAgentDoor() {
  try {
    sdk.onAgentActions(handlers);
  } catch (err) {
    console.warn("[bygga] the agent door did not start, the guides still run:", err);
  }
}
