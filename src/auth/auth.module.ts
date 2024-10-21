import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
    imports: [JwtModule.registerAsync({
        useFactory: () => ({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60s' }
        })
  
    })],
    providers: [AuthGuard, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    }],
    exports: [JwtModule, AuthGuard]
})
export class AuthModule {}
