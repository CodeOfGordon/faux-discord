import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Public } from 'src/common/decorators/public.decorator';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if route has decorator role signifying it's unprotected (i.e. login, register), 
    // if so then immediately allow passage
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getClass() // handler = route handler e.g. @Get() login() {...}, login() is the route handler
    );
    
    if (isPublic) {
      console.log('public route');
      return true;
    }
    // if route is protected (actual msging app for user),
    // then check for JWT token and verify
    console.log('checkpt1');
    const request = context.switchToHttp().getRequest();
    console.log('checkpt2');
    const token = this.extractTokenFromHeader(request);
    console.log('token: ' + token);
    console.log('request headers: ' + JSON.stringify(request.headers, null, 2))
    console.log('header cookies: ' + request.headers.cookie)
    try {
      console.log('checkpt3');
      if (!token) throw new UnauthorizedException('No token was found');
      console.log('checkpt4');
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
      request['user'] = payload;

    } catch(error) {
      throw new UnauthorizedException('A problem has occured, please log in. \
        Please check if you have cookies enabled', {cause: error, description: error.message});
    }
    return true;
  }

  extractTokenFromHeader(@Req() request: Request): string | undefined {
    // const [type, token] = request.signedCookies.authorization?.split(' ') ?? [];
    // return type === 'Bearer' ? token : undefined;
    return request.cookies.access_token;
  }
}
