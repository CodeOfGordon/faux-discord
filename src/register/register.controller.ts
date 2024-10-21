import { Body, Controller, Get, Post, Res, Render } from '@nestjs/common';
import { Response } from 'express';
import { registerDto } from 'src/common/dto/register.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RegisterService } from './register.service';


@Public()
@Controller('register')
export class RegisterController {
    MINYEAR = 1872;
    constructor(
        private readonly registerService: RegisterService
    ) {}

    @Get()
    @Render('register')
    register() {
        const error = null;
        const currYear = new Date().getFullYear();
        const minYear = this.MINYEAR;
        return { currYear, minYear, error };
    }
    
    @Post('register_submitted')
    @Render('register')
    async registerAccount(@Body() registerDto: registerDto, @Res() res: Response): Promise<any> {
        const currYear = new Date().getFullYear();
        const minYear = this.MINYEAR;
        try {
           await this.registerService.submitAccount(registerDto, res);
        } catch(error) {
            return { currYear, minYear, error: error };
        }
    }
}
