import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase {
  async execute(email: string, password: string): Promise<{ token: string }> {
    return { token: 'placeholder-token' };
  }
}