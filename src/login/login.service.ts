import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/db/database.service';

@Injectable()
export class LoginService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    async login_authenticate(username: string, password: string): 
    Promise<{access_token: string | null}> {
        var access_token = null;
        try {
            // Insert a unique user
            const user_id = await this.databaseService.loginUser(username, password);
            // Authenticate JWT token
            const payload = { sub: user_id, user: username };
            access_token = await this.jwtService.signAsync(payload);
        } catch(error) {
            throw new UnauthorizedException(error.message);
        }
        return { access_token: access_token };
    }
}
