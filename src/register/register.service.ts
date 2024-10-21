import { BadRequestException, Body, Injectable, Res } from '@nestjs/common';
import { registerDto } from 'src/common/dto/register.dto';
import { DatabaseService } from 'src/db/database.service';
import { Response } from 'express';

@Injectable()
export class RegisterService {
    MINYEAR = 1872;
    constructor(private readonly databaseService: DatabaseService) {}

    async submitAccount(@Body() registerDto: registerDto, @Res() res: Response): Promise<any> {
        const { display_name, username, password, email, month, day, year } = registerDto;
        
        try {
            // Insert a unique user
            await this.databaseService.checkDuplicate(username);
            await this.databaseService.createUser(email, display_name, username, password);
            res.redirect('/login/');
        } catch(error) {
            throw new BadRequestException(error);
        }
    }
}