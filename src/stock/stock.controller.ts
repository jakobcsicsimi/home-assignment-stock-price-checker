import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get(':symbol')
  async getStockInfo(
    @Param('symbol') symbol: string,
    @Query('count') count: number,
  ) {
    return this.stockService.getStockInfo({ symbol, count });
  }

  @Put(':symbol')
  startSavingData(@Param('symbol') symbol: string) {
    this.stockService.startSavingData(symbol);

    return `Started job for symbol: ${symbol}`;
  }
}
