import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isInstance } from 'class-validator';
import { DatabaseService } from 'src/db/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    async loginAuthenticate(username: string, password: string): 
    Promise<{access_token: string | null}> {
        var access_token = null;
        try {
            // Insert a unique user
            const user_id = await this.loginUser(username, password);
            // Authenticate JWT token
            const payload = { sub: user_id, user: username };
            access_token = await this.jwtService.signAsync(payload);
        } catch(error) {
            throw new UnauthorizedException(error);
        }
        return { access_token: access_token };
    }

    async loginUser(username: string, password: string): Promise<number> {
        try {
            const user = await this.databaseService.selectUser(username);
            if (!user) throw new NotFoundException('User could not be found');
            else if (!await bcrypt.compare(password, user.password)) throw new UnauthorizedException('Password does not match');
            return user.id;

        } catch(error) {
            if (isInstance(error, NotFoundException) || isInstance(error, UnauthorizedException)) {
                throw error;
            } else {
                throw new InternalServerErrorException('There was a problem with the database', {cause: error, description: error.message});
            }
        }
    }
}
