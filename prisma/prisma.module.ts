import { Global, Module } from '@nestjs/common';
import { PgPrismaClient } from './prisma.service';

@Global()
@Module({
  providers: [PgPrismaClient],
  exports: [PgPrismaClient],
})
export class PrismaModule {}
