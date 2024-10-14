import { Controller, Get, Post, Render, Res, Body, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { loginDto } from 'dto/login.dto';
import { LoginService } from './login.service';
import { Public } from 'src/common/decorators/public.decorator';


@Controller('login')
@Public()
export class LoginController {
    constructor(private readonly loginService: LoginService) {} // Inject AuthService


    @Get()
    @Render('login')
    login() {
        return {error: null }
    }

    @Post('login_submitted')
    @Render('login')
    async login_submitted(@Body() loginDto: loginDto, @Res() res: Response): Promise<any> {
        try {
            const { username, password } = loginDto;
            const { access_token } = await this.loginService.login_authenticate(username, password);

            res.setHeader('bearer', access_token);
            res.redirect('/');
        } catch(error) {
            return { error: error }
        }
        
    }
}
