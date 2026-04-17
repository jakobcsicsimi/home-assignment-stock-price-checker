import { Module } from '@nestjs/common';
import { CronModule } from 'src/cron/cron.module';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
  imports: [CronModule],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
