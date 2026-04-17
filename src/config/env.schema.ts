import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_CONNECTION_STRING: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
