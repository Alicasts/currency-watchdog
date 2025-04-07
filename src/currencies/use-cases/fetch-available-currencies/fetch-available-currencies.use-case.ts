import { Injectable } from '@nestjs/common';
import { FetchAvailableCurrenciesService } from '../../coin-awesome-api/fetch-available-currencies.service';
import { AvailableCurrencyDto } from '../../dto/available-currency.dto';
import { AvailableCurrenciesRepository } from '../../repositories/available-currencies.repository';

@Injectable()
export class LoadAvailableCurrenciesUseCase {
  constructor(
    private readonly repository: AvailableCurrenciesRepository,
    private readonly fetchService: FetchAvailableCurrenciesService) {}

    async execute(): Promise<AvailableCurrencyDto[]> {
      const isCacheValid = await this.repository.isCacheValid();
  
      if (isCacheValid) {
        return this.repository.getAll();
      }
  
      const result = await this.fetchService.fetchAvailableCurrencies();
  
      const currencies = Object.entries(result).map(
        ([code, label]) => new AvailableCurrencyDto(code, label),
      );
  
      await this.repository.saveAll(currencies);
  
      return currencies;
    }
}