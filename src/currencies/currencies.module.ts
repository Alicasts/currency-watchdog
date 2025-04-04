import { Module } from '@nestjs/common';
import { HttpModule} from '@nestjs/axios';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { LoadAvailableCurrenciesUseCase } from './use-cases/fetch-available-currencies/fetch-available-currencies.use-case';
import { AvailableCurrenciesRepository } from './repositories/available-currencies.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [CurrenciesController],
  providers: [
    CurrenciesService,
    LoadAvailableCurrenciesUseCase,
    AvailableCurrenciesRepository,]
})
export class CurrenciesModule {}
