import { Controller, Get, Post } from '@nestjs/common';
import { SwapService } from './swap.service';
import { WebSocketServer } from '@nestjs/websockets';
import WebSocket from 'ws';

export interface SwapDTO {
  from: string;
  amount0In: number;
  amount1In: number;
  amount0Out: number;
  amount1Out: number;
  to: string;
}

@Controller('swap')
export class SwapController {
    constructor(private readonly swapService: SwapService) {}

    @WebSocketServer() webSocketServer: WebSocket.Server;

    @Get()
    async getSwap(): Promise<void> {
        await this.swapService.getSwap(this.webSocketServer);
    }
    @Get()
    async getSync(): Promise<void> {
        await this.swapService.getSync(this.webSocketServer);
    }

    @Get('/data')
    async getSwaps(): Promise<SwapDTO> {
      return await this.swapService.getSwap(this.webSocketServer);
    }
}
