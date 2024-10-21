import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { DatabaseModule } from 'src/db/database.module';
import { LoginService } from './login.service';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
