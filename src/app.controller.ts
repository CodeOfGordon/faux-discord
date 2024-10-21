import { Controller, Get, Redirect, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('app')
  root(@Req() req: Request, @Res() res: Response) {

    
    // TODO:
    // Figure out how to correctly store jwt token
    // Set up session thing to return error msg to login render when redirecting

  }
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  
  
}
