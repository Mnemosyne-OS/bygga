// @vitest-environment jsdom
/*
 * PageErrorBoundary: a page that breaks while drawing shows the site's own error page, with
 * « Try again », instead of a blank window.
 */
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import PageErrorBoundary from "../PageErrorBoundary";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let broken = true;
function Page() {
  if (broken) throw new Error("a part did not fit");
  return <p>the guide</p>;
}

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("a page that throws while drawing", () => {
  it("shows the site's error page, and « Try again » draws the page again", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const host = document.body.appendChild(document.createElement("div"));
    const root = createRoot(host);
    broken = true;
    await act(async () => root.render(<PageErrorBoundary><Page /></PageErrorBoundary>));
    expect(host.textContent).toContain("A part didn't fit");

    broken = false;
    const retry = [...host.querySelectorAll("button")].find((b) => b.textContent === "Try again")!;
    await act(async () => retry.click());
    expect(host.textContent).toBe("the guide");
    await act(async () => root.unmount());
  });
});
