import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AvailableCurrenciesDto } from '../dto/available-currencies.dto';

@Injectable()
export class FetchAvailableCurrenciesService {
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
