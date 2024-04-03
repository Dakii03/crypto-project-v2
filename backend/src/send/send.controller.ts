import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SendService } from './send.service';

@Controller('send')
export class SendController {
  constructor(private readonly sendService: SendService) {}

  @Post()
  async sendTransaction(@Body() body: { to: string; amount: number }): Promise<{ transactionHash: string }> {
    console.log('Controller method executed.');
    try {
      const { to, amount } = body;
      if (!to || !amount) {
        throw new BadRequestException("Missing 'to' or 'amount' in request body");
      }

      const transactionHash = await this.sendService.sendTransaction(to, amount);
      return { transactionHash };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
