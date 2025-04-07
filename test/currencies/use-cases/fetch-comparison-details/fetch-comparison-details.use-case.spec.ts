import { Test, TestingModule } from '@nestjs/testing';
import { FetchComparisonDetailsUseCase } from '../../../../src/currencies/use-cases/fetch-currency-comparison/fetch-comparison-details.use-case';
import { CurrencyComparisonRepository } from '../../../../src/currencies/repositories/currency-comparison.repository';
import { FetchComparisonDetailsService } from '../../../../src/currencies/coin-awesome-api/fetch-comparison-details.service';
import { CurrencyComparisonDetails } from '../../../../src/currencies/dto/currency-comparison-details.dto';

describe('FetchComparisonDetailsUseCase', () => {
  let useCase: FetchComparisonDetailsUseCase;
  let repository: CurrencyComparisonRepository;
  let apiService: FetchComparisonDetailsService;

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
    historicalData: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchComparisonDetailsUseCase,
        {
          provide: CurrencyComparisonRepository,
          useValue: {
            isCacheValid: jest.fn(),
            get: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: FetchComparisonDetailsService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(FetchComparisonDetailsUseCase);
    repository = module.get(CurrencyComparisonRepository);
    apiService = module.get(FetchComparisonDetailsService);
  });

  it('should return cached data if cache is valid', async () => {
    jest.spyOn(repository, 'isCacheValid').mockResolvedValue(true);
    jest.spyOn(repository, 'get').mockResolvedValue(mockComparisonDetails);

    const result = await useCase.execute('USD-BRL', 15);

    expect(repository.isCacheValid).toHaveBeenCalledWith('USD-BRL');
    expect(repository.get).toHaveBeenCalledWith('USD-BRL');
    expect(result).toEqual(mockComparisonDetails);
  });

  it('should fetch, save, and return fresh data if cache is invalid', async () => {
    jest.spyOn(repository, 'isCacheValid').mockResolvedValue(false);
    jest.spyOn(apiService, 'execute').mockResolvedValue(mockComparisonDetails);
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue();

    const result = await useCase.execute('USD-BRL', 15);

    expect(repository.isCacheValid).toHaveBeenCalled();
    expect(apiService.execute).toHaveBeenCalledWith('USD-BRL', 15);
    expect(saveSpy).toHaveBeenCalledWith(mockComparisonDetails, 'USD-BRL');
    expect(result).toEqual(mockComparisonDetails);
  });
});