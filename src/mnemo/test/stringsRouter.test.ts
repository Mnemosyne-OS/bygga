// @vitest-environment jsdom
/*
 * Doc 188 §3: rule 6 fallback, rule 7 phrase, the hash router and what the host says.
 */
import { describe, expect, it } from "vitest";
import { fill, strings } from "../strings";
import { currentRoute, decodeSegment, isInternal, navigate, pageGeneration, restartPage, toHash } from "../router";
import { hostNow } from "../host";
import { hostSpeaks } from "./fakeGuide";

describe("strings: the host's language, English for any other", () => {
  it("fr-FR reads as French, ES as Spanish, de and an empty tag as English", () => {
    expect(strings("fr-FR").opened).toBe("Voici {product}");
    expect(strings("ES").opened).toBe("Aquí está {product}");
    expect(strings("de").opened).toBe("Here is {product}");
    expect(strings("").opened).toBe("Here is {product}");
  });

  it("rule 7: the phrase offered is the one the orb routes to Bygga, in the three languages", () => {
    expect(strings("en").voiceAsk).toContain("« open Bygga and go to the next step »");
    expect(strings("fr").voiceAsk).toContain("« ouvre Bygga et passe à l'étape suivante »");
    expect(strings("es").voiceAsk).toContain("« abre Bygga y pasa al paso siguiente »");
  });

  it("the three tables carry the same keys", () => {
    const keys = (l: string) => Object.keys(strings(l)).sort().join(",");
    expect(keys("fr")).toBe(keys("en"));
    expect(keys("es")).toBe(keys("en"));
  });

  it("fill leaves a hole with no value as written, never an empty gap", () => {
    expect(fill("Step {n} of {of}", { n: 2 })).toBe("Step 2 of {of}");
    expect(fill("Here is {product}", { product: "KALLAX" })).toBe("Here is KALLAX");
  });
});

describe("router: the route lives in the hash", () => {
  it("reads path and query from the hash", () => {
    location.hash = "#/build/kallax-2x2?step=3&q=kallax";
    const r = currentRoute();
    expect(r.path).toBe("/build/kallax-2x2");
    expect(r.search.get("step")).toBe("3");
    expect(r.search.get("q")).toBe("kallax");
    location.hash = "";
    expect(currentRoute().path).toBe("/");
  });

  it("a site path is internal, another site or a protocol-relative URL is not", () => {
    expect(isInternal("/builds")).toBe(true);
    expect(isInternal("/build/kallax-2x2?step=2")).toBe(true);
    expect(isInternal("//evil.example/x")).toBe(false);
    expect(isInternal("https://github.com/Nutlope/bygga")).toBe(false);
    expect(isInternal("mailto:x@y.z")).toBe(false);
    expect(toHash("/browse")).toBe("#/browse");
  });

  it("navigate with replace changes the hash and still tells the app", () => {
    let fired = 0;
    const on = () => fired++;
    window.addEventListener("hashchange", on);
    navigate("/browse", true);
    expect(location.hash).toBe("#/browse");
    expect(fired).toBe(1);
    window.removeEventListener("hashchange", on);
  });

  it("restartPage bumps the generation and tells the app", () => {
    let fired = 0;
    const on = () => fired++;
    window.addEventListener("hashchange", on);
    const before = pageGeneration();
    restartPage();
    expect(pageGeneration()).toBe(before + 1);
    expect(fired).toBe(1);
    window.removeEventListener("hashchange", on);
  });
});

describe("a broken escape in the route is read as typed, never a blank page", () => {
  it("decodes a good escape and keeps a malformed one", () => {
    expect(decodeSegment("kallax-2x2")).toBe("kallax-2x2");
    expect(decodeSegment("l%C3%A9g%C3%A8re")).toBe("légère");
    expect(decodeSegment("100%")).toBe("100%");
  });
});

describe("host: the assistant's name follows what the host says", () => {
  it("a name is kept while the host says nothing about it, and an empty one clears it", () => {
    hostSpeaks("fr", "Irina");
    expect(hostNow().assistantName).toBe("Irina");
    hostSpeaks("es");
    expect(hostNow()).toEqual({ lang: "es", assistantName: "Irina" });
    hostSpeaks("en", "");
    expect(hostNow().assistantName).toBeNull();
  });
});
