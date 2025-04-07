import { Controller, Get, Param, Query } from '@nestjs/common';
import { LoadAvailableCurrenciesUseCase } from './use-cases/fetch-available-currencies/fetch-available-currencies.use-case';
import { AvailableCurrencyDto } from './dto/available-currency.dto';
import { CurrencyComparisonDetails } from './dto/currency-comparison-details.dto';
import { FetchComparisonDetailsUseCase } from './use-cases/fetch-currency-comparison/fetch-comparison-details.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('currencies')
@Controller('currencies')
export class CurrenciesController {
    constructor(
        private readonly loadAvailableCurrenciesUseCase: LoadAvailableCurrenciesUseCase,
        private readonly fetchComparisonDetailsUseCase: FetchComparisonDetailsUseCase,
    ) {}

    @Get('available')
    async getAvailableCurrencies(): Promise<AvailableCurrencyDto[]> {
        return this.loadAvailableCurrenciesUseCase.execute();
    }

    @Get('comparison/:pair')
    async getCurrencyComparison(
        @Param('pair') pair: string,
        @Query('days') days = 15,
    ): Promise<CurrencyComparisonDetails> {
        return this.fetchComparisonDetailsUseCase.execute(pair, Number(days));
    }
}
