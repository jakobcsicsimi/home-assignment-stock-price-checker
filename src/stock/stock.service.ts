import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Stock } from 'prisma/generated/client';
import { PgPrismaClient } from 'prisma/prisma.service';
import { CONFIG } from 'src/config/config.const';
import type { Env } from 'src/config/env.schema';
import { CronService } from 'src/cron/cron.service';
import { calculateStockPriceAverage } from 'src/utils/stock.util';
import { stockQuoteResponseSchema } from 'src/validations/stock.validation';

@Injectable()
export class StockService {
  constructor(
    @Inject(CONFIG) private config: Env,
    private prisma: PgPrismaClient,
    private cronService: CronService,
  ) {}

  async getStockInfo({ symbol, count }: { symbol: string; count?: number }) {
    // create SQL SELECT statement
    let query = Prisma.sql`
        SELECT * from "Stock" 
        WHERE symbol = ${symbol} 
        ORDER BY date
        DESC
    `;

    if (count) {
      query = Prisma.sql`${query} LIMIT ${count}`;
    }

    // get records from "Stock" table
    const stockRecords = await this.prisma.$queryRaw<Stock[]>(query);

    if (!stockRecords.length) {
      throw new NotFoundException(
        `No records found for this symbol: ${symbol}`,
      );
    }

    // format and return data
    const lastStockRecord = stockRecords[0];

    return {
      symbol,
      currentPrice: lastStockRecord.price,
      averagePrice: calculateStockPriceAverage({ stockRecords }),
      lastUpdated: lastStockRecord.date,
    };
  }

  startSavingData(symbol: string) {
    // fetch data and insert it into "Stock" table
    const callback = async () => {
      const response = await fetch(
        `${this.config.FINNHUBIO_HOST}/quote?symbol=${symbol}`,
        {
          headers: { 'X-Finnhub-Token': this.config.FINNHUBIO_API_KEY },
        },
      );

      if (!response.ok) {
        throw new NotFoundException(
          'Failed to fetch stock information from Finnhub',
        );
      }

      const data = (await response.json()) as unknown;

      const stock = stockQuoteResponseSchema.parse(data);

      await this.prisma.$executeRaw`
        INSERT INTO "Stock" (symbol, price, date) 
        VALUES (${symbol}, ${stock.c}, ${new Date(stock.t * 1000)})
      `;
    };

    // start cron job, call callback every minute
    this.cronService.startJob({
      name: `Stock job - symbol: ${symbol}`,
      schedule: '* * * * *',
      callback,
    });
  }
}
