import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { DatabaseModule } from 'src/db/database.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login.service';


@Module({
  imports: [
    DatabaseModule, 
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' }
      })

  })],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
