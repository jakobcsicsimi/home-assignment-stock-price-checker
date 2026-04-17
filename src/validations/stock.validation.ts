import z from 'zod';

export const stockQuoteResponseSchema = z.object({
  // current price
  c: z.number(),

  // high price of the day
  //   h: z.number(),
  // low price of the day
  //   l: z.number(),
  // open price of the day
  //   o: z.number(),
  // previous close price
  //   pc: z.number(),

  // timestamp (epoch)
  t: z.number(),
});

export type StockQuoteResponse = typeof stockQuoteResponseSchema;
