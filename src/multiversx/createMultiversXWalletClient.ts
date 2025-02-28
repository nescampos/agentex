import {createMultiversXClient} from "./createMultiversXClient";
import { Account, Mnemonic, UserWallet, Address, UserSigner } from "@multiversx/sdk-core";
import { promises } from "fs";

/**
 * Creates a new Viem wallet client connected to the MultiversX network.
 *
 * A wallet client is a client that is connected to a specific wallet and
 * can therefore perform write operations.
 *
 * @returns A new Viem wallet client.
 */
export async function createMultiversXWalletClient() {
  // Check if the private key environment variable is set
  if (!process.env.WALLET_KEY_FILE) {
    throw new Error(
      "⛔ WALLET_KEY_FILE environment variable is not set. You need to set it to create a wallet client."
    );
  }
  if (!process.env.WALLET_PASSWORD) {
    throw new Error(
      "⛔ WALLET_PASSWORD environment variable is not set. You need to set it to create a wallet client."
    );
  }
  const fileContent = await promises.readFile(process.env.WALLET_KEY_FILE, { encoding: "utf8" });
  const walletObject = JSON.parse(fileContent);
  const signer = UserSigner.fromWallet(walletObject, process.env.WALLET_PASSWORD);
  //const walletClient = new Account(signer.getAddress());
  // Create the wallet client
  return signer;
}
