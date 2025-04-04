import { Controller, Get } from '@nestjs/common';
import { LoadAvailableCurrenciesUseCase } from './use-cases/fetch-available-currencies/fetch-available-currencies.use-case';
import { AvailableCurrencyDto } from './dto/available-currency.dto';

@Controller('currencies')
export class CurrenciesController {
    constructor(
        private readonly loadAvailableCurrenciesUseCase: LoadAvailableCurrenciesUseCase,
    ) {}

    @Get('available')
    async getAvailableCurrencies(): Promise<AvailableCurrencyDto[]> {
        return this.loadAvailableCurrenciesUseCase.execute();
    }
}
