import { Injectable } from '@nestjs/common';
import { createProvider, createSigner, settings } from '../../script'; 
import { ethers } from 'ethers';

@Injectable()
export class WalletService {
  async createWallet(): Promise<string> {
    try {
      const provider = await createProvider(settings.apiKey);
      const wallet = await createSigner(settings.privateKey, provider);
      
      console.log("Wallet Address: ", wallet.address);
      console.log("Provider: ", provider);

      return wallet.privateKey;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
