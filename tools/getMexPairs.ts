import { createMultiversXClient } from "../src/multiversx/createMultiversXClient";
import type { ToolConfig } from "./allTools.js";

import type { GetWalletAddressArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getMexPairsTool: ToolConfig<GetWalletAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_mex_pairs",
      description: "Get the pairs available in MEX",
      parameters: {
        type: "object",
        properties: {
        },
        required: [],
      },
    },
  },
  handler: async () => {
    return await getPairs();
  },
};

async function getPairs() {
  const walletClient = createMultiversXClient();
  const pairs = await walletClient.getMexPairs();
  return pairs.map(x => {x.price, x.address, x.basePrice, x.baseSymbol, x.quotePrice, x.quoteSymbol});
}
