import { getBalanceTool } from "./getBalance";
import { getWalletAddressTool } from "./getWalletAddress";
import { sendTransactionTool } from "./sendTransaction";
import { getFungibleTokensOfAccountTool } from "./getFungibleTokensOfAccount";
import { getNonFungibleTokensOfAccountTool } from "./getNonFungibleTokensOfAccount";
import { getMexPairsTool } from "./getMexPairs";

export interface ToolConfig<T = any> {
  /**
   * The definition of the tool.
   */
  definition: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: "object";
        properties: Record<string, unknown>;
        required: string[];
      };
    };
  };

  /**
   * The handler function that will be called when the tool is executed.
   */
  handler: (args: T) => Promise<any>;
}

export const tools: Record<string, ToolConfig> = {
  // == READ == \\
  /**
   * Get the balance of a wallet.
   */
  get_balance: getBalanceTool,
  /**
   * Get the connected wallet address.
   */
  get_wallet_address: getWalletAddressTool,
  /**
   * Get the fungible token balances of a wallet.
   */
  get_fungible_balance_tokens: getFungibleTokensOfAccountTool,

  /**
   * Get the balance of non fungible tokens from a wallet.
   */
   get_nonfungible_balance_tokens: getNonFungibleTokensOfAccountTool,

  /**
   * Get the pairs available in Mex
   */
   get_mex_pairs: getMexPairsTool,

  // == WRITE == \\
  /**
   * Send a transaction with optional parameters.
   */
  send_transaction: sendTransactionTool,
};
