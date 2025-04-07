import { Module } from '@nestjs/common';
import { HttpModule} from '@nestjs/axios';
import { CurrenciesController } from './currencies.controller';
import { FetchAvailableCurrenciesService } from './coin-awesome-api/fetch-available-currencies.service';
import { LoadAvailableCurrenciesUseCase } from './use-cases/fetch-available-currencies/fetch-available-currencies.use-case';
import { AvailableCurrenciesRepository } from './repositories/available-currencies.repository';
import { PrismaModule } from 'prisma/prisma.module';
import { CurrencyComparisonRepository } from './repositories/currency-comparison.repository';
import { FetchComparisonDetailsUseCase } from './use-cases/fetch-currency-comparison/fetch-comparison-details.use-case';
import { FetchComparisonDetailsService } from './coin-awesome-api/fetch-comparison-details.service';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [CurrenciesController],
  providers: [
    FetchAvailableCurrenciesService,
    LoadAvailableCurrenciesUseCase,
    AvailableCurrenciesRepository,
    CurrencyComparisonRepository,
    FetchComparisonDetailsUseCase,
    FetchComparisonDetailsService,]
})
export class CurrenciesModule {}
