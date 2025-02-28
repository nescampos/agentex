import { createMultiversXClient } from "../src/multiversx/createMultiversXClient";
import type { ToolConfig } from "./allTools.js";

import type { GetBalanceArgs } from "../interface/index.js";
import { Address } from "@multiversx/sdk-core/out";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_balance",
      description: "Get the balance of a wallet",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the balance from",
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
  const account = walletClient.getAccount(walletAddress);
  const balance = (await account).balance.div(10**18);
  return balance;
}
