import { SecretNetworkClient } from "secretjs";
import { getMyNumTokens, mint } from "./messages";

const chainId = `${__CHAIN_ID__}`;
const url = `${__SECRET_URL__}`;

let secretjs = null;

export async function getKeplr() {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    while (
    !window.keplr ||
    !window.getEnigmaUtils ||
    !window.getOfflineSignerOnlyAmino
    ) {
        await sleep(50);
    }

    await window.keplr.enable(chainId);
    window.keplr.defaultOptions = {
        sign: {
            preferNoSetFee: false,
            disableBalanceCheck: true,
        },
    };

    const keplrOfflineSigner =
    window.getOfflineSignerOnlyAmino(chainId);
    const accounts = await keplrOfflineSigner.getAccounts();

    const secretAddress = accounts[0].address;

    secretjs = new SecretNetworkClient({
        url: url,
        chainId: chainId,
        wallet: keplrOfflineSigner,
        walletAddress: secretAddress,
        encryptionUtils: window.getEnigmaUtils(chainId),
    });

    const numTokens = await getMyNumTokens(secretjs);

    if (numTokens == 0) {
        mint(secretjs);
    }

    return secretjs;
}
