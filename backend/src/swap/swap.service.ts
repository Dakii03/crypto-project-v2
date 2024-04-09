import { Injectable } from '@nestjs/common';
import { SwapEvent, SyncEvent, connect } from './mongodb';
import { createWebSocketProvider, settings } from '../../script';
import { ethers } from 'ethers';
import * as ABI from '../../abi/abi.json';
import { SwapDTO } from './swap.controller';

connect();

@Injectable()
export class SwapService {
    private isFetching: boolean = false;

    async getSwap(webSocketServer: any): Promise<SwapDTO> {
        const usdcAddress = "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852"; // USDC Contract
        const provider = await createWebSocketProvider(settings.apiMainnetKey);
        const contract = await new ethers.Contract(usdcAddress, ABI, provider);
          
        let firstObject = true;
        let objSwapDTO: SwapDTO;

        // Subscribe to the Swap event directly over WebSocket
        contract.on("Swap", async (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
            try {
                console.log(sender, amount0In, amount0Out);
                const objSwap = new SwapEvent({
                    from: sender,
                    amount0In: Number(amount0In),
                    amount1In: Number(amount1In),
                    amount0Out: Number(amount0Out),
                    amount1Out: Number(amount1Out),
                    to,
                });

                
                objSwapDTO = {
                  from: "sender",
                  amount0In: Number(amount0In),
                  amount1In: Number(amount1In),
                  amount0Out: Number(amount0Out),
                  amount1Out: Number(amount1Out),
                  to,
                }
                
                firstObject = false;
                try {
                    // Emit swap event over WebSocket to connected clients
                    webSocketServer.emit('swapEvent', objSwap); // Socket.io
                } catch (error) {
                    console.log('error emitting swapEvent', error);
                }
                
                objSwap.save();
                console.log("Swap event saved to the database:\n", objSwap);
            } catch (error) {
                console.error("Error saving swap event:", error);
            } 
        });
        
        process.on('SIGINT', () => {
            console.log('Received SIGINT signal. Closing the file.');
            process.exit(0);
        });

        console.log("Initialized event listener");
        return objSwapDTO;
    }

    async getSync(webSocketServer: any): Promise<void> {
        const usdcAddress = "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852"; // USDC Contract
        const provider = await createWebSocketProvider(settings.apiMainnetKey);
        const contract = await new ethers.Contract(usdcAddress, ABI, provider);
          
        let firstObject = true;

        // Subscribe to the Swap event directly over WebSocket
        contract.on("Sync", async (reserve0, reserve1) => {
            try {
                const objSync = new SyncEvent({
                    reserve0: Number(reserve0),
                    reserve1: Number(reserve1),
                });
                
                firstObject = false;
                try {
                    // Emit swap event over WebSocket to connected clients
                    webSocketServer.emit('syncEvent', objSync); // Socket.io
                } catch (error) {
                    console.log('error emitting swapEvent', error);
                }

                objSync.save();
                console.log("Sync event saved to the database:\n", objSync);
        
                
            } catch (error) {
                console.error("Error saving swap event:", error);
            } 
        });
        
        process.on('SIGINT', () => {
            console.log('Received SIGINT signal. Closing the file.');
            process.exit(0);
        });

        console.log("Initialized event listener");
    }

    async stopFetching(): Promise<void> {
        // Logic to stop fetching swap events
        this.isFetching = false;
    }
}
