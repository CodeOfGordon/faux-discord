import { Controller, Get, Post, Render, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { loginDto } from 'src/common/dto/login.dto';
import { LoginService } from './login.service';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}


    @Get()
    @Render('login')
    login() {
        return {error: null }
    }

    @Post('login_submitted')
    async login_submitted(@Body() loginDto: loginDto, @Res() res: Response): Promise<any> {
        try {
            const { username, password } = loginDto;
            const { access_token } = await this.loginService.loginAuthenticate(username, password);
            
            console.log('redirected');
            res.cookie('access_token', `${access_token}`, {httpOnly: true, sameSite: 'strict'});
            res.redirect('/');
        } catch(error) {
            res.render('login', {error: error})
        }
        
    }
}
