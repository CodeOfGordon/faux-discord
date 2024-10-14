import { Body, Controller, Get, Param, Post, Redirect, Req, Res, Render } from '@nestjs/common';
import { Response } from 'express';
import { registerDto } from 'dto/register.dto';
import { DatabaseService } from 'src/db/database.service';
import { Public } from 'src/common/decorators/public.decorator';


@Controller('register')
@Public()
export class RegisterController {
    MINYEAR = 1872;
    constructor(private readonly databaseService: DatabaseService) {}

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
    async submitAccount(@Body() registerDto: registerDto, @Res() res: Response): Promise<any> {
        const { display_name, username, password, email, month, day, year } = registerDto;
        const currYear = new Date().getFullYear();
        const minYear = this.MINYEAR;
        
        try {
            // Insert a unique user
            const check = await this.databaseService.checkDuplicate(username);
            if (check) throw new Error(check);
            await this.databaseService.createUser(email, display_name, username, password);

            res.redirect('/login/');
        } catch(error) {
            return { currYear, minYear, error: error };
        }
    }
}
