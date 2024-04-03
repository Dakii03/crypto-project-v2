import { Injectable } from '@nestjs/common';
import { createProvider, createSigner, settings } from '../../script';
import { ethers } from 'ethers';

@Injectable()
export class SendService {
  async sendTransaction(to: string, amount: number): Promise<string> {
    try {
      console.log('Sending transaction to:', to, 'Amount:', amount);
      const senderProvider = await createProvider(settings.apiKey);
      const senderWallet = await createSigner(settings.privateKey, senderProvider);

      const tx = {
        to: to,
        value: ethers.parseEther(amount.toString()),
      };

      const txResponse = await senderWallet.sendTransaction(tx);
      console.log("Transaction hash:", txResponse.hash);

      return txResponse.hash;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
