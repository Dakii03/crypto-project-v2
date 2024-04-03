import { Controller, Get } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async getBalance(): Promise<{ balance: string }> {
    const balance = await this.balanceService.getBalance();
    return { balance };
  }
}
