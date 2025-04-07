import { CurrencyHistoricalData } from './currency-historical-data.dto';

export class CurrencyComparisonDetails {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  createDate: string;
  historicalData: CurrencyHistoricalData[] = [];
}