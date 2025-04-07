import { Injectable } from '@nestjs/common';
import { CurrencyComparisonRepository } from '../../repositories/currency-comparison.repository';
import { CurrencyComparisonDetails } from '../../dto/currency-comparison-details.dto';
import { FetchComparisonDetailsService } from '../../coin-awesome-api/fetch-comparison-details.service';

@Injectable()
export class FetchComparisonDetailsUseCase {
  constructor(
    private readonly repository: CurrencyComparisonRepository,
    private readonly fetchService: FetchComparisonDetailsService,
  ) {}

  async execute(pair: string, days: number): Promise<CurrencyComparisonDetails> {
    const isCached = await this.repository.isCacheValid(pair);

    if (isCached) {
      const cached = await this.repository.get(pair);
      if (cached) return cached;
    }

    const freshData = await this.fetchService.execute(pair, days);
    await this.repository.save(freshData, pair);
    return freshData;
  }
}