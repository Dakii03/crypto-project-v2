import { Injectable } from '@nestjs/common';
import { SwapEvent, connect } from './mongodb';
import { createWebSocketProvider, settings } from '../../script';
import { ethers } from 'ethers';
import * as ABI from '../../abi/abi.json'
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SwapService {
  private isFetching: boolean = false;

  async getSwap(webSocketServer: any): Promise<void> {
    const usdcAddress = "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852"; // USDC Contract
    const provider = await createWebSocketProvider(settings.apiMainnetKey);
    const contract = await new ethers.Contract(usdcAddress, ABI, provider);

    connect();
    let firstObject = true;

    const filePath = process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, '../data/swapEventDB.json') // Production environment
      : path.resolve(__dirname, '../../../src/data/swapEventDB.json'); // Development environment

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      let newData = data.slice(0, -2) + (data.length === 0 ? "[\n" : ",\n");

      fs.writeFile(filePath, newData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }

        console.log('Last character removed from the swapEventDB.json file.');
      });
    });

    // Subscribe to the Swap event directly over WebSocket
    contract.on("Swap", async (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
      try {
        const objSwap = new SwapEvent({
          from: sender,
          amount0In: Number(amount0In),
          amount1In: Number(amount1In),
          amount0Out: Number(amount0Out),
          amount1Out: Number(amount1Out),
          to,
        });

        fs.appendFileSync(filePath, `${firstObject ? '' : ',\n'}${JSON.stringify(objSwap, null, 2)}`, 'utf8');
        firstObject = false;
        try{
          // Emit swap event over WebSocket to connected clients
          webSocketServer.emit('swapEvent', objSwap); // Socket.io
        } catch(error) {
          console.log('error emmiting swapEvent', error)
        }
        
        objSwap.save();
        console.log("Swap event saved to the database:\n", objSwap);
      } catch (error) {
        console.error("Error saving swap event:", error);
      }
    });

    process.on('SIGINT', () => {
      console.log('Received SIGINT signal. Closing the file.');
      fs.appendFileSync(filePath, '\n]', 'utf8');
      console.log("Finished writing to file.");
      process.exit(0);
    });

    console.log("Initialized event listener");
  }

  async stopFetching(): Promise<void> {
    // Logic to stop fetching swap events
    this.isFetching = false;
  } 

}