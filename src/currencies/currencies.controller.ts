import { Controller, Get } from '@nestjs/common';
import { FetchAvailableCurrenciesUseCase } from './use-cases/fetch-available-currencies/fetch-available-currencies.use-case';

@Controller('currencies')
export class CurrenciesController {
    constructor(
        private readonly fetchAvailableCurrenciesUseCase: FetchAvailableCurrenciesUseCase,
    ) {}

    @Get('available')
    async getAvailableCurrencies(): Promise<string[]> {
        return this.fetchAvailableCurrenciesUseCase.execute();
    }
}
