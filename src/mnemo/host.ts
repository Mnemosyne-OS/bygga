import { useSyncExternalStore } from "react";
import { MnemoCartridgeSDK, onHostConfig } from "@mnemosyne_os/cartridge-sdk";

/** Must equal `name` in mnemo-plugin.json: the host drops every message from another id. */
export const sdk = new MnemoCartridgeSDK("@mnemosyne-plugins/mnemo-bygga");

export type Host = { lang: string; assistantName: string | null };

let host: Host = { lang: navigator.language || "en", assistantName: null };
const listeners = new Set<() => void>();

// apply: false keeps Bygga's own colours: the host's tokens would repaint its --accent
onHostConfig(
  (cfg) => {
    host = { lang: cfg.lang || host.lang, assistantName: cfg.assistantName || host.assistantName };
    listeners.forEach((l) => l());
  },
  { apply: false },
);

/** The person's language and the assistant's name, as the host last said them. */
export const hostNow = () => host;

export function useHost(): Host {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => {
        listeners.delete(onChange);
      };
    },
    () => host,
    () => host,
  );
}
