import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { newPool } from './database.main';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import { isInstance } from 'class-validator';


/*
users table:
    id |       email       | display_name | username  |         created_at         
*/


@Injectable()
export class DatabaseService {
    private pool: Pool = newPool;

    async checkDuplicate(username: string): Promise<string> {
        const sql = 'SELECT COUNT(username) FROM users WHERE username = $1;';
        const user = [username];
        const result = await this.pool.query(sql, user);
        const duplicates = parseInt(result.rows[0].count);
        if (duplicates > 0) {
            return 'Username already exists';
        }
        return '';
    }

    async createUser(email: string, display_name: string, username: string, password: string) { // birthDate; Date
        if (!this.checkDuplicate(username)) throw new BadRequestException('User already exists');

        const sql = 'INSERT INTO users (email, display_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [email, display_name, username];
        const salt = await bcrypt.genSalt(5);
        const hashed_password = await bcrypt.hash(password, salt);
        values.push(hashed_password);

        try {
            await this.pool.query(sql, values);
        } catch(error) {
            throw error; // name spec error
        }
    }

    async loginUser(username: string, password: string): Promise<number> {
        const sql = 'SELECT * FROM users WHERE username = $1;';
        const values = [username];
        try {
            const result = await this.pool.query(sql, values);
            const user = result.rows[0];
            console.log(username);
            
            if (!user) throw new NotFoundException('User could not be found');
            else if (await bcrypt.compare(password, user.password)) throw new UnauthorizedException('Password does not match');
            
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
