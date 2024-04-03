import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { createProvider, createSigner, settings } from '../../script'; 

@Injectable()
export class BalanceService {
  async getBalance(): Promise<string> {
    try {
      const provider = await createProvider(settings.apiKey);
      const wallet = await createSigner(settings.privateKey, provider);
      const balance = await provider.getBalance(wallet.address);
      const newBalance = ethers.formatEther(balance);
      return `${newBalance} ${settings.network.toUpperCase()}`;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
