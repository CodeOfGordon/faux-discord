import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { DatabaseModule } from './db/database.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { InvalidAuthFilter } from './auth/invalid-auth.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LoginModule, RegisterModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
    provide: APP_FILTER,
    useClass: InvalidAuthFilter,
    },
  ],
})
export class AppModule {}
