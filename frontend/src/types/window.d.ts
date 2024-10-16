import { Window as KeplrWindow } from "@keplr-wallet/types";

// Using Keplr with TypeScript
declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Window extends KeplrWindow {}
}
