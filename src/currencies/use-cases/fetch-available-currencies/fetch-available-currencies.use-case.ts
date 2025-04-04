import { Injectable } from '@nestjs/common';
import { CurrenciesService } from '../../../currencies/currencies.service';
import { AvailableCurrencyDto } from '../../dto/available-currency.dto';
import { AvailableCurrenciesRepository } from '../../repositories/available-currencies.repository';

@Injectable()
export class LoadAvailableCurrenciesUseCase {
  constructor(
    private readonly currenciesService: CurrenciesService,
    private readonly availableCurrenciesRepository: AvailableCurrenciesRepository,) {}

    async execute(): Promise<AvailableCurrencyDto[]> {
      const isCacheValid = await this.availableCurrenciesRepository.isCacheValid();
  
      if (isCacheValid) {
        return this.availableCurrenciesRepository.getAll();
      }
  
      const result = await this.currenciesService.fetchAvailableCurrencies();
  
      const currencies = Object.entries(result).map(
        ([code, label]) => new AvailableCurrencyDto(code, label),
      );
  
      await this.availableCurrenciesRepository.saveAll(currencies);
  
      return currencies;
    }
}