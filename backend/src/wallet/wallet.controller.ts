import { Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(): Promise<string> {
    try {
      const privateKey = await this.walletService.createWallet();
      return `privateKey: ${privateKey}`;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
