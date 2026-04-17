import { Global, Module } from '@nestjs/common';
import { CONFIG } from './config.const';
import { envSchema } from './env.schema';
import * as dotenv from 'dotenv';

dotenv.config();

const env = envSchema.parse(process.env);

@Global()
@Module({
  providers: [
    {
      provide: CONFIG,
      useValue: env,
    },
  ],
  exports: [CONFIG],
})
export class ConfigModule {}
