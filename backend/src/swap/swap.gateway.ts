import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SwapService } from './swap.service';

@WebSocketGateway()
export class SwapGateway {
    constructor(private readonly swapService: SwapService) {}
    @WebSocketServer() server: Server;
    private isFetching: boolean = false;

    @SubscribeMessage('fetchSwapEvents')
    handleFetchSwapEvents(client: Socket, data: any): void {
        console.log('Received request to fetch swap events');
        this.swapService.getSwap(this.server);
    }

    @SubscribeMessage('stopFetching')
    handleStopFetching(client: Socket, data: any): void {
        if (this.isFetching) {
            this.isFetching = false;
            console.log('Stopped fetching swap events');
            // Any cleanup or stop logic goes here
            this.swapService.stopFetching();
            //process.exit(0);
        }
    }
}