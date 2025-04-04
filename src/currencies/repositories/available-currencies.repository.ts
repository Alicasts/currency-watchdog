import { PrismaService } from "../../../prisma/prisma.service";
import { AvailableCurrencyDto } from "../dto/available-currency.dto";
import { subDays, isAfter } from 'date-fns';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AvailableCurrenciesRepository {
    private readonly CACHE_KEY_ID = 1;
    
    constructor(private readonly prisma: PrismaService) {}

    async getAll(): Promise<AvailableCurrencyDto[]> {
        const availableCurrencies = await this.prisma.availableCurrency.findMany();
        return availableCurrencies.map(currency => new AvailableCurrencyDto(
            currency.code,
            currency.label));
    }

    async saveAll(availableCurrencies: AvailableCurrencyDto[]): Promise<void> {
        await this.prisma.availableCurrency.deleteMany();
        await this.prisma.availableCurrency.createMany({
            data: availableCurrencies.map(({ code, label }) => ({
                code,
                label,
            })),
        });

        await this.prisma.availableCurrencyMetadata.upsert({
            where: { id: this.CACHE_KEY_ID },
            update: { updatedAt: new Date() },
            create: { id: this.CACHE_KEY_ID, updatedAt: new Date() },
        });
    }

    async isCacheValid(): Promise<boolean> {
        const metadata = await this.prisma.availableCurrencyMetadata.findUnique({
            where: { id: this.CACHE_KEY_ID },
        });

        if (!metadata) {
            return false;
        }

        const twoDaysAgo = subDays(new Date(), 2);
        return isAfter(metadata.updatedAt, twoDaysAgo);
    }
    
}