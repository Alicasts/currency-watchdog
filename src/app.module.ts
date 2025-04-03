import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrenciesModule } from './currencies/currencies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CurrenciesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
