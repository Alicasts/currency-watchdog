import { Test, TestingModule } from "@nestjs/testing";
import { subDays } from "date-fns";
import { PrismaService } from '../../../prisma/prisma.service';
import { AvailableCurrencyDto } from "../../../src/currencies/dto/available-currency.dto";
import { AvailableCurrenciesRepository } from "../../../src/currencies/repositories/available-currencies.repository";

describe('AvailableCurrenciesRepository', () => {
    let repository: AvailableCurrenciesRepository;
    let prismaService: PrismaService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AvailableCurrenciesRepository,
                PrismaService,
            ],
        }).compile();
        repository = module.get<AvailableCurrenciesRepository>(AvailableCurrenciesRepository);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    beforeEach(async () => {
        await prismaService.availableCurrency.deleteMany();
        await prismaService.availableCurrencyMetadata.deleteMany();
      });
    
      it('should save and retrieve currencies', async () => {
        const mockList = [
          new AvailableCurrencyDto('BTCBRL', 'Bitcoin/Real Brasileiro'),
          new AvailableCurrencyDto('ETHBRL', 'Ethereum/Real Brasileiro'),
        ];
    
        await repository.saveAll(mockList);
        const result = await repository.getAll();
    
        expect(result).toHaveLength(2);
        expect(result[0].code).toBe('BTCBRL');
      });
    
      it('should return false when cache is missing', async () => {
        const result = await repository.isCacheValid();
        expect(result).toBe(false);
      });
    
      it('should return true when cache is valid', async () => {
        await prismaService.availableCurrencyMetadata.create({
          data: { id: 1, updatedAt: new Date() },
        });
    
        const result = await repository.isCacheValid();
        expect(result).toBe(true);
      });
    
      it('should return false when cache is older than 2 days', async () => {
        const outdated = subDays(new Date(), 3);
    
        await prismaService.availableCurrencyMetadata.create({
          data: { id: 1, updatedAt: outdated },
        });
    
        const result = await repository.isCacheValid();
        expect(result).toBe(false);
      });
    });