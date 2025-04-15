import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CurrencyComparisonDetails } from '../dto/currency-comparison-details.dto';
import { CurrencyHistoricalData } from '../dto/currency-historical-data.dto';
import { AWESOME_API_ENDPOINTS } from '../common/constants/awesomeapi.constants';

@Injectable()
export class FetchComparisonDetailsService {
  constructor(private readonly httpService: HttpService) {}

  async execute(pair: string, days: number): Promise<CurrencyComparisonDetails> {
    const url = AWESOME_API_ENDPOINTS.DAILY_COMPARISON(pair, days);
    const response = await firstValueFrom(this.httpService.get(url));
    const rawData = response.data;

    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error('Empty response from comparison API');
    }

    const [header, ...history] = rawData;

    return {
      code: header.code,
      codein: header.codein,
      name: header.name,
      high: header.high,
      low: header.low,
      varBid: header.varBid,
      pctChange: header.pctChange,
      bid: header.bid,
      ask: header.ask,
      timestamp: header.timestamp,
      createDate: header.create_date,
      historicalData: history.map(
        (item) =>
          ({
            high: item.high,
            low: item.low,
            varBid: item.varBid,
            pctChange: item.pctChange,
            bid: item.bid,
            ask: item.ask,
            timestamp: item.timestamp,
          } as CurrencyHistoricalData),
      ),
    };
  }
}