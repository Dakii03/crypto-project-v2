import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from '../balance/balance.module';
import { WalletModule } from '../wallet/wallet.module';
import { BlocksModule } from '../blocks/blocks.module';
import { SendModule } from '../send/send.module';
import { SwapModule } from '../swap/swap.module';
import { SwapGateway } from '../swap/swap.gateway';
import { SwapService } from '../swap/swap.service';

@Module({
  imports: [BalanceModule, WalletModule, BlocksModule, SendModule, SwapModule],
  controllers: [AppController],
  providers: [AppService, SwapGateway, SwapService],
})
export class AppModule {}
