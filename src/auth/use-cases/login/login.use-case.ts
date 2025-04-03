import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase {
  async execute(email: string, password: string): Promise<{ token: string }> {
    // Placeholder: This will be implemented in [S1-C5] or [S1-C6]
    return { token: 'placeholder-token' };
  }
}