// @vitest-environment jsdom
/*
 * The agent door (doc 188 §3, rules 3, 4 and 6) against a page that
 * behaves like the guide. The SDK is not the host here: the handlers the door hands to
 * `sdk.onAgentActions` are captured and called directly, as the host would call them.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fold } from "@/lib/fold";
import { matchCatalog } from "@/lib/search";
import { sdk } from "../host";
import { productFor, startAgentDoor } from "../agentDoor";
import { hostSpeaks, openPage } from "./fakeGuide";

type Handlers = Record<string, (args: Record<string, unknown>) => unknown>;

let handlers: Handlers;
let page: Awaited<ReturnType<typeof openPage>> | null = null;

beforeEach(() => {
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(sdk, "onAgentActions").mockImplementation((h) => {
    handlers = h as Handlers;
    return { ready: new Promise(() => {}), off() {} };
  });
  startAgentDoor();
  document.title = "Bygga";
});

afterEach(() => {
  page?.unmount();
  page = null;
  hostSpeaks("en");
  vi.restoreAllMocks();
});

const guide = async (hash: string, opts: Parameters<typeof openPage>[1] = {}) => {
  page = await openPage(hash, opts);
  return page;
};

describe("rule 3: next, back and again are the guide's own keys", () => {
  it("next presses the right arrow and reads step 2 of 9 back", async () => {
    (await guide("#/build/kallax-2x2")).onStep(1);
    const out = (await handlers.next({})) as Record<string, unknown>;
    expect(out).toMatchObject({ screen: "guide", slug: "kallax-2x2", product: "KALLAX", phase: "steps", step: 2, of: 9, say: "Step 2 of 9" });
  });

  it("back from step 1 leaves the steps and says so", async () => {
    (await guide("#/build/kallax-2x2")).onStep(1);
    const out = (await handlers.back({})) as Record<string, unknown>;
    expect(out).toMatchObject({ phase: "before-steps", say: "Back to the parts" });
  });

  it("next on the last step reads « built » back", async () => {
    (await guide("#/build/kallax-2x2")).onStep(9);
    const out = (await handlers.next({})) as Record<string, unknown>;
    expect(out).toMatchObject({ phase: "built", say: "That was the last step: KALLAX is built" });
  });

  it("again presses R on a step", async () => {
    const p = await guide("#/build/kallax-2x2");
    p.onStep(3);
    const out = (await handlers.again({})) as Record<string, unknown>;
    expect(p.g.replays).toBe(1);
    expect(out).toMatchObject({ phase: "steps", step: 3, say: "Step 3 of 9" });
  });
});

describe("rule 4: each action reads the screen back, nothing changed = refused to the person", () => {
  it("a key swallowed by a sheet over the guide is a refusal, never a result", async () => {
    (await guide("#/build/kallax-2x2", { swallow: true })).onStep(2);
    await expect(handlers.next({})).rejects.toThrow("TO_PERSON: The step did not change: something is open over the guide in Bygga.");
  });

  it("next before the steps is refused with the sentence that says what to do", async () => {
    await guide("#/build/kallax-2x2");
    await expect(handlers.next({})).rejects.toThrow("TO_PERSON: Bygga is not on the steps yet: press Start building, or ask for step 1.");
  });

  it("next after the build is refused as finished", async () => {
    const p = await guide("#/build/kallax-2x2");
    p.g.phase = "done";
    p.paint();
    await expect(handlers.next({})).rejects.toThrow("TO_PERSON: The build is finished.");
  });

  it("next with no guide open is refused", async () => {
    await guide("#/browse");
    await expect(handlers.next({})).rejects.toThrow("TO_PERSON: No guide is open in Bygga.");
    expect(handlers.status({})).toEqual({ screen: "browse" });
  });

  it("next under a dialog over the guide is refused before the key is sent", async () => {
    (await guide("#/build/kallax-2x2", { dialog: true })).onStep(2);
    await expect(handlers.next({})).rejects.toThrow("TO_PERSON: Something is open over the guide in Bygga: close it first.");
  });

  it("again under a dialog over the guide is refused, and R is not counted as a replay", async () => {
    const p = await guide("#/build/kallax-2x2", { dialog: true });
    p.onStep(3);
    await expect(Promise.resolve().then(() => handlers.again({}))).rejects.toThrow("TO_PERSON: Something is open over the guide in Bygga");
    expect(p.g.replays).toBe(0);
  });

  it("open without a step, on a guide that never paints, is refused instead of « Here is »", async () => {
    await guide("", { paints: false });
    document.title = "Bygga";
    await expect(handlers.open({ product: "KALLAX 2x2" })).rejects.toThrow("TO_PERSON: Bygga did not show the guide of KALLAX.");
  });

  it("again before the steps is refused, not pressed", async () => {
    const p = await guide("#/build/kallax-2x2");
    await expect(Promise.resolve().then(() => handlers.again({}))).rejects.toThrow("TO_PERSON: Bygga is not on the steps yet");
    expect(p.g.replays).toBe(0);
  });
});

describe("rule 6: the sentence is in the host's language", () => {
  it("French host: the refusal and the step are said in French", async () => {
    hostSpeaks("fr-FR", "Irina");
    const p = await guide("#/build/kallax-2x2");
    await expect(handlers.next({})).rejects.toThrow("TO_PERSON: Bygga n'est pas encore sur les étapes : appuie sur Start building, ou demande l'étape 1.");
    p.onStep(4);
    expect(await handlers.next({})).toMatchObject({ say: "Étape 5 sur 9" });
  });

  it("Spanish host, then a language the cartridge does not have falls back to English", async () => {
    hostSpeaks("es");
    (await guide("#/build/kallax-2x2")).onStep(1);
    expect(await handlers.next({})).toMatchObject({ say: "Paso 2 de 9" });
    hostSpeaks("de-DE");
    expect(await handlers.next({})).toMatchObject({ say: "Step 3 of 9" });
  });
});

describe("open: through the catalog, like the search box, and read back", () => {
  it("opens KALLAX on its cover and says « Here is KALLAX »", async () => {
    await guide("");
    const out = (await handlers.open({ product: "KALLAX" })) as Record<string, unknown>;
    expect(out).toMatchObject({ screen: "guide", slug: matchCatalog("KALLAX")!.slug, phase: "before-steps", say: "Here is KALLAX" });
  });

  it("open with a step lands on that step, and past the last one on the last", async () => {
    await guide("");
    expect(await handlers.open({ product: "KALLAX 2x2", step: 3 })).toMatchObject({ phase: "steps", step: 3, of: 9, say: "Here is KALLAX, step 3 of 9" });
    expect(await handlers.open({ product: "KALLAX 2x2", step: 50 })).toMatchObject({ phase: "steps", step: 9, of: 9, say: "Here is KALLAX, step 9 of 9" });
  });

  it("open with a step on a guide that never reaches it is refused, not counted done", async () => {
    await guide("", { deepLinks: false });
    await expect(handlers.open({ product: "KALLAX 2x2", step: 3 })).rejects.toThrow("TO_PERSON: The step did not change");
  });

  it("a product the catalog cannot match is refused", async () => {
    await guide("");
    await expect(handlers.open({ product: "zzzzqq" })).rejects.toThrow("TO_PERSON: Bygga has no guide for « zzzzqq ».");
    // BLANDA is a real IKEA name the site cannot draw: its search refuses it rather than guess
    await expect(handlers.open({ product: "BLANDA" })).rejects.toThrow(/^TO_PERSON: Bygga has no guide for « BLANDA »\./);
  });

  it("what opens carries the name the person said, in the three host languages", () => {
    // each of these opened another product before: la → LACK, my → MYDAL, IKEA → IKEA PS
    const said: [string, string][] = [
      ["la Kallax", "kallax"], ["la Billy", "billy"], ["le lit Malm", "malm"], ["my billy", "billy"], ["IKEA KALLAX", "kallax"],
      ["étagère Kallax", "kallax"], ["bibliothèque Billy", "billy"], ["commode Malm 3 tiroirs", "malm"], ["mesa Lack", "lack"],
      ["estantería Kallax", "kallax"], ["librería Billy", "billy"], ["the kallax", "kallax"],
      ["KALLAX", "kallax"], ["kallax 2x2", "kallax"], ["BILLY", "billy"], ["MALM 3 drawers", "malm"], ["LACK side table", "lack"], ["HEMNES", "hemnes"],
    ];
    for (const [q, name] of said) expect([q, fold(productFor(q)?.name ?? "").split(" ")[0]]).toEqual([q, name]);
  });

  it("the size said after the name is kept, and a typo with no product word still goes to the search", () => {
    expect(productFor("la Kallax 2x2")?.slug).toBe(matchCatalog("KALLAX 2x2")!.slug);
    expect(fold(productFor("kalax")?.name ?? "")).toBe("kallax");
  });

  it("nothing the catalog can draw: refused, never another product", () => {
    expect(productFor("zzzzqq")).toBeNull();
    expect(productFor("BLANDA")).toBeNull();
  });

  it("open « la Kallax » opens KALLAX and says so", async () => {
    await guide("");
    expect(await handlers.open({ product: "la Kallax" })).toMatchObject({ screen: "guide", product: "KALLAX", say: "Here is KALLAX" });
  });
});
