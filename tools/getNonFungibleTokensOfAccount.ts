import { createMultiversXClient } from "../src/multiversx/createMultiversXClient";
import type { ToolConfig } from "./allTools.js";

import type { GetBalanceArgs } from "../interface/index.js";
import { Address } from "@multiversx/sdk-core/out";

// Configuration for the send transaction tool
export const getNonFungibleTokensOfAccountTool: ToolConfig<GetBalanceArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_nonfungible_balance_tokens",
      description: "Get the balance of fungible tokens from a wallet",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the balances from",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    return await getBalance(wallet);
  },
};

async function getBalance(address: string) {
  const walletClient = createMultiversXClient();
  const walletAddress = new Address(address);
  const balances = await walletClient.getNonFungibleTokensOfAccount(walletAddress);
  return balances;
}
