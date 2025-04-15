import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AvailableCurrenciesDto } from '../dto/available-currencies.dto';

import { AWESOME_API_ENDPOINTS } from '../common/constants/awesomeapi.constants';

@Injectable()
export class FetchAvailableCurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  async fetchAvailableCurrencies(): Promise<AvailableCurrenciesDto> {
    const response = await firstValueFrom(
      this.httpService.get<AvailableCurrenciesDto>(AWESOME_API_ENDPOINTS.AVAILABLE_PAIRS)
    );
    return response.data;
  }
}
