import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const ALCHEMY_API_KEY: string = process.env.ALCHEMY_API_KEY || "";
const ALCHEMY_MAINNET_API_KEY: string = process.env.ALCHEMY_MAINNET_API_KEY || "";
const PRIVATE_KEY_1: string = process.env.PRIVATE_KEY_1 || "";

const settings = {
  apiKey: ALCHEMY_API_KEY,
  apiMainnetKey: ALCHEMY_MAINNET_API_KEY,
  network: Network.ETH_SEPOLIA,
  networkMainnet: Network.ETH_MAINNET,
  privateKey: PRIVATE_KEY_1,
};
const alchemy = new Alchemy(settings);

async function createProvider(apiKey: string): Promise<ethers.JsonRpcProvider> {
  const providerUrl: string = `https://${settings.network}.g.alchemy.com/v2/${apiKey}`;
  const provider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider(providerUrl);
  return provider;
}

async function createWebSocketProvider(apiKey: string): Promise<ethers.WebSocketProvider> {
  try {
    const provider: ethers.WebSocketProvider = new ethers.WebSocketProvider(
      `wss://${settings.networkMainnet}.g.alchemy.com/v2/${apiKey}`
    );
    return provider;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getBlockNumbers(): Promise<{ latestBlock: number; blockNumber: number }> {
  const provider: ethers.JsonRpcProvider = await createProvider(settings.apiKey);

  const latestBlock: number = await alchemy.core.getBlockNumber();
  const blockNumber: number = await provider.getBlockNumber();

  return { latestBlock, blockNumber };
}

async function createSigner(privateKey: string, provider: ethers.JsonRpcProvider): Promise<ethers.Wallet> {
  const wallet: ethers.Wallet = new ethers.Wallet(privateKey, provider);
  return wallet;
}

export { getBlockNumbers, createSigner, createProvider, createWebSocketProvider, settings, alchemy };
