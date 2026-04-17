import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import {
  StockCountQueryParamDto,
  StockSymbolParamDto,
} from 'src/types/stock.type';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get(':symbol')
  async getStockInfo(
    @Param() params: StockSymbolParamDto,
    @Query() queryParams: StockCountQueryParamDto,
  ) {
    const { symbol } = params;
    const { count } = queryParams;

    return this.stockService.getStockInfo({ symbol, count });
  }

  @Put(':symbol')
  startSavingData(@Param() params: StockSymbolParamDto) {
    const { symbol } = params;

    this.stockService.startSavingData(symbol);

    return `Started job for symbol: ${symbol}`;
  }
}
