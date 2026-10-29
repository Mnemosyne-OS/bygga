// @vitest-environment jsdom
/*
 * Doc 188 §3, rule 5: after a refusal of the host, the window asks again at 2, 5 and 10 s,
 * three times at most; a served door never asks again, and a page with no host never retries.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { frame, sdk } from "../host";
import { startAgentDoor } from "../agentDoor";

describe("rule 5: the subscription is asked again after a refusal, three times at most", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("asks at 2 s, 5 s and 10 s after each refusal, then stops", async () => {
    vi.useFakeTimers();
    vi.spyOn(frame, "inHost").mockReturnValue(true);
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const spy = vi.spyOn(sdk, "onAgentActions").mockImplementation(() => ({
      ready: Promise.reject(new Error("the installed cartridges could not be read")),
      off() {},
    }));
    startAgentDoor();
    await vi.advanceTimersByTimeAsync(0);
    expect(spy).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1999);
    expect(spy).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(spy).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(4999);
    expect(spy).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1);
    expect(spy).toHaveBeenCalledTimes(3);
    await vi.advanceTimersByTimeAsync(9999);
    expect(spy).toHaveBeenCalledTimes(3);
    await vi.advanceTimersByTimeAsync(1);
    expect(spy).toHaveBeenCalledTimes(4);
    await vi.advanceTimersByTimeAsync(600000);
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it("asks with no deadline: the relay answers once the window shows its page", () => {
    const spy = vi.spyOn(sdk, "onAgentActions").mockImplementation(() => ({ ready: new Promise(() => {}), off() {} }));
    startAgentDoor();
    expect(spy.mock.calls[0][1]).toBe(0);
  });

  it("a page opened outside Mnemosyne asks once and never again, without a warning", async () => {
    vi.useFakeTimers();
    vi.spyOn(frame, "inHost").mockReturnValue(false);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    const spy = vi.spyOn(sdk, "onAgentActions").mockImplementation(() => ({
      ready: Promise.reject(new Error("No Mnemosyne host: agent actions were asked outside the shell.")),
      off() {},
    }));
    startAgentDoor();
    await vi.advanceTimersByTimeAsync(600000);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(warn).not.toHaveBeenCalled();
  });

  it("a served door is asked once", async () => {
    vi.useFakeTimers();
    vi.spyOn(console, "info").mockImplementation(() => {});
    const spy = vi.spyOn(sdk, "onAgentActions").mockImplementation(() => ({
      ready: Promise.resolve({ actions: ["status", "open", "next", "back", "again"] }),
      off() {},
    }));
    startAgentDoor();
    await vi.advanceTimersByTimeAsync(600000);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("the door offers exactly the five declared actions", () => {
    let offered: string[] = [];
    vi.spyOn(sdk, "onAgentActions").mockImplementation((h) => {
      offered = Object.keys(h);
      return { ready: new Promise(() => {}), off() {} };
    });
    startAgentDoor();
    expect(offered.sort()).toEqual(["again", "back", "next", "open", "status"]);
  });
});
