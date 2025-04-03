import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AvailableCurrenciesDto } from './dto/available-currencies.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  async fetchAvailableCurrencies(): Promise<AvailableCurrenciesDto> {
    const response = await firstValueFrom(
      this.httpService.get<AvailableCurrenciesDto>(
        'https://economia.awesomeapi.com.br/json/available/uniq'
      )
    );
    return response.data;
  }
}
