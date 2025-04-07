import { Module } from '@nestjs/common';
import { CurrenciesModule } from './currencies/currencies.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [CurrenciesModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
