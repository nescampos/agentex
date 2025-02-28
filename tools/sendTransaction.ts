// Importing necessary functions and types for transaction handling
import { createMultiversXWalletClient } from "../src/multiversx/createMultiversXWalletClient";
import { createMultiversXClient } from "../src/multiversx/createMultiversXClient";
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { SendTransactionArgs } from "../interface/index.js"; // Type definition for send transaction arguments
import { Transaction, TransactionComputer, TransactionWatcher, TransactionsFactoryConfig, TransferTransactionsFactory, Address  } from "@multiversx/sdk-core";


// Configuration for the send transaction tool
export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
  definition: {
    type: "function",
    function: {
      name: "send_transaction",
      description: "Send a transaction with optional parameters",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            description: "The recipient address",
          },
          value: {
            type: "string",
            description: "The amount of EGLD to send",
          }
        },
        required: ["to", "value"],
      },
    },
  },
  // Handler function to execute the send transaction tool
  handler: async (args) => {
    const result = await sendTransaction(args);
    if (!result.success || !result.hash) throw new Error(result.message);
    return result.hash;
  },
};

// Function to send a transaction
async function sendTransaction({
  to,
  value,
}: SendTransactionArgs) {
  try {
    const walletClient = await createMultiversXWalletClient();
    const myAddress = walletClient.getAddress();
    const MultiversXprovider = await createMultiversXClient();
    const walletOnNetwork = await MultiversXprovider.getAccount(myAddress);
    const factoryConfig = new TransactionsFactoryConfig({ chainID: "T" });
    const factory = new TransferTransactionsFactory({ config: factoryConfig });
    const receiver = new Address(to);
    
    const adaptedValue = BigInt(value * 10**18);
    const tx = factory.createTransactionForNativeTokenTransfer({
        sender: myAddress,
        receiver: receiver,
        nativeAmount: adaptedValue
    });
    tx.nonce = BigInt(walletOnNetwork.nonce);

    const computer = new TransactionComputer();
    const serializedTx = computer.computeBytesForSigning(tx);
    console.log("Signing transaction");
    tx.signature = await walletClient.sign(serializedTx);
    console.log("Sending transaction");
    const txHash = await MultiversXprovider.sendTransaction(tx);

    const watcherUsingApi = new TransactionWatcher(MultiversXprovider);
    console.log("Verifying transaction on the network");
    const transactionOnNetworkUsingApi = await watcherUsingApi.awaitCompleted(txHash);
    if(transactionOnNetworkUsingApi.isCompleted) {
      // Returning the transaction hash and a success message
      return {
        success: true,
        hash: txHash,
        message: `Transaction sent successfully. Digest: ${txHash}`,
      };
    }
    else {
      return {
        success: false,
        hash: txHash,
        message: `Transaction failed, transaction hash: ${txHash}`,
      };
    }

    
  } catch (error) {
    // Handling errors and returning an error message
    return {
      success: false,
      hash: null,
      message: `Failed to send transaction: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
