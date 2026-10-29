// @vitest-environment jsdom
/*
 * Doc 188 §3, rule 7: the cartridge's key dialog, mounted for real.
 */
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import KeyModal from "../KeyModal";
import { sdk } from "../host";
import { hostSpeaks } from "./fakeGuide";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
if (!window.matchMedia) {
  window.matchMedia = ((q: string) =>
    ({ matches: false, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false }) as unknown as MediaQueryList) as typeof window.matchMedia;
}

let root: Root | null = null;
let host: HTMLDivElement | null = null;

beforeEach(() => {
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
});

afterEach(async () => {
  await act(async () => root?.unmount());
  host?.remove();
  // an empty name is the host saying the person removed it: back to « the orb »
  hostSpeaks("en", "");
  vi.restoreAllMocks();
});

const render = async (el: React.ReactElement) => {
  await act(async () => root!.render(el));
};
const buttons = () => [...document.body.querySelectorAll("button")].map((b) => b.textContent?.trim());
const button = (re: RegExp) => [...document.body.querySelectorAll("button")].find((b) => re.test(b.textContent?.trim() ?? ""));
const text = () => document.body.textContent ?? "";

describe("rule 7: the key dialog says what works today", () => {
  it("for the voice: the phrase the orb routes to Bygga, read-aloud, and a button to the assistant", async () => {
    await render(<KeyModal why="voice" skip="Just read it aloud" onSkip={() => {}} onClose={() => {}} />);
    expect(text()).toContain("Hands-free with the orb");
    expect(text()).toContain("Say to the orb: « open Bygga and go to the next step »");
    expect(text()).toContain("The steps are read aloud in English.");
    expect(buttons()).toContain("Read it aloud");
    expect(buttons()).toContain("Talk to the orb");
    expect(text()).not.toContain("Together");
  });

  it("the read-aloud button is the site's own skip path, and is absent when the site offers no skip", async () => {
    const onSkip = vi.fn();
    const onClose = vi.fn();
    await render(<KeyModal why="voice" skip="Just read it aloud" onSkip={onSkip} onClose={onClose} />);
    await act(async () => button(/^Read it aloud$/)!.click());
    expect(onSkip).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    await render(<KeyModal why="voice" onClose={onClose} />);
    expect(buttons()).not.toContain("Read it aloud");
  });

  it("for a question, a photo or a draft: it says that part runs on Together AI, with one Close", async () => {
    for (const why of ["ask", "photo", "draft", "key"] as const) {
      await render(<KeyModal why={why} onClose={() => {}} />);
      expect(text()).toContain("Outside Mnemosyne");
      expect(text()).toContain("This part of Bygga runs on Together AI.");
      expect(buttons().filter((b) => b === "Close")).toHaveLength(1);
    }
  });

  it("in French with the assistant's name, once the host said them", async () => {
    hostSpeaks("fr-FR", "Irina");
    await render(<KeyModal why="voice" skip="Just read it aloud" onSkip={() => {}} onClose={() => {}} />);
    expect(text()).toContain("Les mains libres avec Irina");
    expect(text()).toContain("Dis à Irina : « ouvre Bygga et passe à l'étape suivante »");
    expect(buttons()).toContain("Lire à voix haute");
    expect(buttons()).toContain("Parler à Irina");
  });

  it("Talk to the orb calls orb.summon with a 5 s deadline; a refusal is said on the button", async () => {
    const invoke = vi.spyOn(sdk, "invoke").mockRejectedValue(new Error("NOT_FROM_A_GESTURE"));
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const onClose = vi.fn();
    await render(<KeyModal why="voice" onClose={onClose} />);
    await act(async () => button(/^Talk to /)!.click());
    expect(invoke).toHaveBeenCalledWith("orb.summon", {}, 5000);
    expect(button(/is not answering$/)).toBeDefined();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("when the orb comes, the dialog closes", async () => {
    vi.spyOn(sdk, "invoke").mockResolvedValue({ summoned: true });
    const onClose = vi.fn();
    await render(<KeyModal why="voice" onClose={onClose} />);
    await act(async () => button(/^Talk to /)!.click());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("a dialog closed while the orb is being called is not closed again by its answer", async () => {
    let answer: (v: unknown) => void = () => {};
    vi.spyOn(sdk, "invoke").mockImplementation(() => new Promise((r) => (answer = r)));
    const onClose = vi.fn();
    await render(<KeyModal why="voice" onClose={onClose} />);
    await act(async () => button(/^Talk to /)!.click());
    await act(async () => root!.render(<></>));
    await act(async () => answer({ summoned: true }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("Escape closes it", async () => {
    const onClose = vi.fn();
    await render(<KeyModal why="ask" onClose={onClose} />);
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
