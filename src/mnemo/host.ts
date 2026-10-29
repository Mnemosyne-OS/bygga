import { useSyncExternalStore } from "react";
import { MnemoCartridgeSDK, onHostConfig } from "@mnemosyne_os/cartridge-sdk";

/** Must equal `name` in mnemo-plugin.json: the host drops every message from another id. */
export const sdk = new MnemoCartridgeSDK("@mnemosyne-plugins/mnemo-bygga");

/** What the host said about the person: their language, and the name they gave the assistant. */
export type Host = { lang: string; assistantName: string | null };

let host: Host = { lang: navigator.language || "en", assistantName: null };
const listeners = new Set<() => void>();

// apply: false keeps Bygga's own colours: the host's tokens would repaint its --accent
onHostConfig(
  (cfg) => {
    host = {
      lang: cfg.lang || host.lang,
      // absent = the host said nothing about it; an empty name = the person removed it
      assistantName: cfg.assistantName === undefined ? host.assistantName : cfg.assistantName || null,
    };
    listeners.forEach((l) => l());
  },
  { apply: false },
);

/** Whether this page runs inside a Mnemosyne window. An object, so a test can say yes. */
export const frame = { inHost: () => window.parent !== window };

/** The person's language and the assistant's name, as the host last said them. */
export const hostNow = () => host;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/** The host's last word on the person, re-rendering when it says something new. */
export function useHost(): Host {
  return useSyncExternalStore(subscribe, hostNow, hostNow);
}
