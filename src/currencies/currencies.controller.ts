import { Controller, Get } from '@nestjs/common';
import { FetchAvailableCurrenciesUseCase } from './use-cases/fetch-available-currencies/fetch-available-currencies.use-case';
import { AvailableCurrencyDto } from './dto/available-currency.dto';

@Controller('currencies')
export class CurrenciesController {
    constructor(
        private readonly fetchAvailableCurrenciesUseCase: FetchAvailableCurrenciesUseCase,
    ) {}

    @Get('available')
    async getAvailableCurrencies(): Promise<AvailableCurrencyDto[]> {
        return this.fetchAvailableCurrenciesUseCase.execute();
    }
}
