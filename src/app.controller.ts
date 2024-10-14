import { Controller, Get, Redirect, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { rootCertificates } from 'tls';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Req() req: Request, @Res() res: Response) {
    // URGENT: Decide whether to login with username or email. Change dto and jwt token based on this

    // check validity of JWT token, if invalid then res.redicrect('/login/)
    // res.redirect('/login/');
    // TODO:
    // Set AuthGuard globally by creating a @Public() decorator for /login and /register controllers
    // Learn exception filters and pipes
    // Set up exception filter pipe so if AuthGuard fails, auto-redirects to login

  }
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  
  
}
