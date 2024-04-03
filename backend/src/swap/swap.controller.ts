import { Controller, Get, Post } from '@nestjs/common';
import { SwapService } from './swap.service';
import { WebSocketServer } from '@nestjs/websockets';
import WebSocket from 'ws';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}
  
  @WebSocketServer() webSocketServer: WebSocket.Server;

  @Get()
  async getSwap(): Promise<void> {
    await this.swapService.getSwap(this.webSocketServer);
  }
}
