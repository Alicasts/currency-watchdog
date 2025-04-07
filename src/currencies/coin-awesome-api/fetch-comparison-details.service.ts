import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CurrencyComparisonDetails } from '../dto/currency-comparison-details.dto';
import { CurrencyHistoricalData } from '../dto/currency-historical-data.dto';

@Injectable()
export class FetchComparisonDetailsService {
  constructor(private readonly httpService: HttpService) {}

  async execute(pair: string, days: number): Promise<CurrencyComparisonDetails> {
    const url = `https://economia.awesomeapi.com.br/json/daily/${pair}/${days}`;
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