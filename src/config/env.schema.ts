import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_CONNECTION_STRING: z.string().min(1),
  FINNHUBIO_API_KEY: z.string().min(1),
  FINNHUBIO_HOST: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
