import { CurrencyComparisonDetails } from '../dto/currency-comparison-details.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { subHours, isAfter } from 'date-fns';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyComparisonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async isCacheValid(pair: string): Promise<boolean> {
    const comparison = await this.prisma.currencyComparison.findUnique({
      where: { id: pair },
      select: { updatedAt: true },
    });

    if (!comparison) return false;

    const twoHoursAgo = subHours(new Date(), 2);
    return isAfter(comparison.updatedAt, twoHoursAgo);
  }

  async save(details: CurrencyComparisonDetails, pair: string): Promise<void> {
    await this.prisma.currencyHistoricalData.deleteMany({
      where: { comparisonId: pair },
    });

    await this.prisma.currencyComparison.upsert({
      where: { id: pair },
      update: {
        code: details.code,
        codein: details.codein,
        name: details.name,
        high: details.high,
        low: details.low,
        varBid: details.varBid,
        pctChange: details.pctChange,
        bid: details.bid,
        ask: details.ask,
        timestamp: details.timestamp,
        createDate: details.createDate,
        updatedAt: new Date(),
      },
      create: {
        id: pair,
        code: details.code,
        codein: details.codein,
        name: details.name,
        high: details.high,
        low: details.low,
        varBid: details.varBid,
        pctChange: details.pctChange,
        bid: details.bid,
        ask: details.ask,
        timestamp: details.timestamp,
        createDate: details.createDate,
        updatedAt: new Date(),
      },
    });

    await this.prisma.currencyHistoricalData.createMany({
      data: details.historicalData.map((item) => ({
        comparisonId: pair,
        high: item.high,
        low: item.low,
        varBid: item.varBid,
        pctChange: item.pctChange,
        bid: item.bid,
        ask: item.ask,
        timestamp: item.timestamp,
      })),
    });
  }

  async get(pair: string): Promise<CurrencyComparisonDetails | null> {
    const entity = await this.prisma.currencyComparison.findUnique({
      where: { id: pair },
      include: { historicalData: true },
    });

    if (!entity) return null;

    return {
      code: entity.code,
      codein: entity.codein,
      name: entity.name,
      high: entity.high,
      low: entity.low,
      varBid: entity.varBid,
      pctChange: entity.pctChange,
      bid: entity.bid,
      ask: entity.ask,
      timestamp: entity.timestamp,
      createDate: entity.createDate,
      historicalData: entity.historicalData.map((item) => ({
        high: item.high,
        low: item.low,
        varBid: item.varBid,
        pctChange: item.pctChange,
        bid: item.bid,
        ask: item.ask,
        timestamp: item.timestamp,
      })),
    };
  }
}
