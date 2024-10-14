import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('authguard');
    return true;
  //   // Check for isPublic
  //   const isPublic = this.reflector.get<boolean>(
  //     'isPublic',
  //     context.getHandler()
  //   );

  //   if (isPublic) {
  //     return true;
  //   }

  //   const request = context.switchToHttp().getRequest();
  //   const token = this.extractTokenFromHeader(request);
    
    
  //   try {
  //     if (!token) throw new UnauthorizedException('No token was found');
  //     const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
  //     request['user'] = payload;
  //   } catch(error) {
  //     throw new UnauthorizedException('A problem has occured with your access token. \
  //       Please check if you have cookies enabled', {cause: error, description: error.message});
  //   }

  //   return true;
  // }

  // extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  }
}
