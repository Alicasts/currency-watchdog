import { Injectable } from '@nestjs/common';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { AvailableCurrencyDto } from 'src/currencies/dto/available-currency.dto';

@Injectable()
export class FetchAvailableCurrenciesUseCase {
  constructor(private readonly currenciesService: CurrenciesService) {}

  async execute(): Promise<AvailableCurrencyDto[]> {
    const result = await this.currenciesService.fetchAvailableCurrencies();

    return Object.entries(result).map(
      ([code, label]) => new AvailableCurrencyDto(code, label)
    );
  }
}