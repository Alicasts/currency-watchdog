import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from './use-cases/login/login.use-case';

@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) {}

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ): Promise<{ token: string }> {
        return this.loginUseCase.execute(email, password);
    }
} 
