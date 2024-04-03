import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { alchemy, settings } from '../../script';

@Injectable()
export class BlocksService {
  async getBlockNumbers(): Promise<{ latestBlock: number; blockNumber: number }> {
    try {
      const provider = new ethers.JsonRpcProvider(`https://${settings.network}.g.alchemy.com/v2/${settings.apiKey}`);
      const latestBlock = await alchemy.core.getBlockNumber();
      const blockNumber = await provider.getBlockNumber();
      return { latestBlock, blockNumber };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
