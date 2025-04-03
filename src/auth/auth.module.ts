import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUseCase } from './use-cases/login/login.use-case';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LoginUseCase],
  exports: [AuthService],
})
export class AuthModule {}
