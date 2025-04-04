import { Test, TestingModule } from '@nestjs/testing';
import { LoadAvailableCurrenciesUseCase } from '../../../../src/currencies/use-cases/fetch-available-currencies/fetch-available-currencies.use-case';
import { CurrenciesService } from '../../../../src/currencies/currencies.service';
import { AvailableCurrenciesRepository } from '../../../../src/currencies/repositories/available-currencies.repository';
import { AvailableCurrencyDto } from '../../../../src/currencies/dto/available-currency.dto';

describe('LoadAvailableCurrenciesUseCase', () => {
  let useCase: LoadAvailableCurrenciesUseCase;
  let currenciesService: CurrenciesService;
  let repository: AvailableCurrenciesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoadAvailableCurrenciesUseCase,
        {
          provide: CurrenciesService,
          useValue: {
            fetchAvailableCurrencies: jest.fn(),
          },
        },
        {
          provide: AvailableCurrenciesRepository,
          useValue: {
            isCacheValid: jest.fn(),
            getAll: jest.fn(),
            saveAll: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(LoadAvailableCurrenciesUseCase);
    currenciesService = module.get(CurrenciesService);
    repository = module.get(AvailableCurrenciesRepository);
  });

  it('should return cached currencies if cache is valid', async () => {
    const mockCurrencies = [
      new AvailableCurrencyDto('BTCBRL', 'Bitcoin/Real Brasileiro'),
    ];

    jest.spyOn(repository, 'isCacheValid').mockResolvedValue(true);
    jest.spyOn(repository, 'getAll').mockResolvedValue(mockCurrencies);

    const result = await useCase.execute();

    expect(repository.isCacheValid).toHaveBeenCalled();
    expect(repository.getAll).toHaveBeenCalled();
    expect(result).toEqual(mockCurrencies);
  });

  it('should fetch, save and return currencies if cache is invalid', async () => {
    const mockApiResponse = {
      BTCBRL: 'Bitcoin/Real Brasileiro',
      ETHBRL: 'Ethereum/Real Brasileiro',
    };

    jest.spyOn(repository, 'isCacheValid').mockResolvedValue(false);
    jest.spyOn(currenciesService, 'fetchAvailableCurrencies').mockResolvedValue(mockApiResponse);
    const saveAllSpy = jest.spyOn(repository, 'saveAll').mockResolvedValue(undefined);

    const result = await useCase.execute();

    expect(repository.isCacheValid).toHaveBeenCalled();
    expect(currenciesService.fetchAvailableCurrencies).toHaveBeenCalled();
    expect(saveAllSpy).toHaveBeenCalled();

    expect(result).toEqual([
      new AvailableCurrencyDto('BTCBRL', 'Bitcoin/Real Brasileiro'),
      new AvailableCurrencyDto('ETHBRL', 'Ethereum/Real Brasileiro'),
    ]);
  });
});