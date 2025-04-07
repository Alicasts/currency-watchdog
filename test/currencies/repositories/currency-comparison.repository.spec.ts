import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyComparisonRepository } from '../../../src/currencies/repositories/currency-comparison.repository';
import { PrismaService } from '../../../prisma/prisma.service';
import { CurrencyComparisonDetails } from '../../../src/currencies/dto/currency-comparison-details.dto';
import { subHours } from 'date-fns';

describe('CurrencyComparisonRepository', () => {
  let repository: CurrencyComparisonRepository;
  let prisma: PrismaService;

  const mockComparisonDetails: CurrencyComparisonDetails = {
    code: 'USD',
    codein: 'BRL',
    name: 'Dólar Americano/Real Brasileiro',
    high: '5.82',
    low: '5.61',
    varBid: '0.18',
    pctChange: '3.26',
    bid: '5.81',
    ask: '5.83',
    timestamp: '1234567890',
    createDate: '2025-04-04 13:30:22',
    historicalData: [
      {
        high: '5.70',
        low: '5.60',
        varBid: '0.1',
        pctChange: '2.0',
        bid: '5.65',
        ask: '5.68',
        timestamp: '1234560000',
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyComparisonRepository, PrismaService],
    }).compile();

    repository = module.get(CurrencyComparisonRepository);
    prisma = module.get(PrismaService);
  });

  afterEach(async () => {
    await prisma.currencyHistoricalData.deleteMany();
    await prisma.currencyComparison.deleteMany();
  });

  it('should save and retrieve a comparison', async () => {
    await repository.save(mockComparisonDetails, 'USD-BRL');

    const result = await repository.get('USD-BRL');

    expect(result).toBeDefined();
    expect(result?.code).toBe('USD');
    expect(result?.historicalData.length).toBe(1);
    expect(result?.historicalData[0].bid).toBe('5.65');
  });

  it('should validate cache as valid if updated within 2 hours', async () => {
    await repository.save(mockComparisonDetails, 'USD-BRL');

    const isValid = await repository.isCacheValid('USD-BRL');
    expect(isValid).toBe(true);
  });

  it('should validate cache as invalid if older than 2 hours', async () => {
    await prisma.currencyComparison.create({
      data: {
        id: 'OLD-PAIR',
        code: 'USD',
        codein: 'BRL',
        name: 'old',
        high: '0',
        low: '0',
        varBid: '0',
        pctChange: '0',
        bid: '0',
        ask: '0',
        timestamp: '0',
        createDate: 'old',
        updatedAt: subHours(new Date(), 3),
      },
    });

    const isValid = await repository.isCacheValid('OLD-PAIR');
    expect(isValid).toBe(false);
  });
});