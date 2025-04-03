import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { FetchAvailableCurrenciesUseCase } from './use-cases/fetch-available-currencies/fetch-available-currencies.use-case';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, FetchAvailableCurrenciesUseCase],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
