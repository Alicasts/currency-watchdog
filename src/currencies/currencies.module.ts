import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { FetchAvailableCurrenciesUseCase } from './use-cases/fetch-available-currencies/fetch-available-currencies.use-case';

@Module({
  imports: [HttpModule],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, FetchAvailableCurrenciesUseCase],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
