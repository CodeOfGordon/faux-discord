import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let mockJwtService: JwtService;
  let mockReflector: Reflector;

  it('should be defined', () => {
    expect(new AuthGuard(mockJwtService, mockReflector)).toBeDefined();
  });
});
