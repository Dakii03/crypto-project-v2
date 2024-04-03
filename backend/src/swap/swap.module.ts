import { Module } from '@nestjs/common';
import { SwapController } from './swap.controller';
import { SwapService } from './swap.service';

@Module({
  controllers: [SwapController],
  providers: [SwapService],
})
export class SwapModule {}
