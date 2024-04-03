import { Controller, Get } from '@nestjs/common';
import { BlocksService } from './blocks.service';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get()
  async getBlockNumbers(): Promise<{ latestBlock: number; blockNumber: number }> {
    const result = await this.blocksService.getBlockNumbers();
    console.log(result);
    return result;
  }
}

