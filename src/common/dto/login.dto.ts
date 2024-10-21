import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class loginDto {
    @IsString()
    @IsNotEmpty({message: 'Empty username'})
    @Max(255, {message: 'Username is too long'})
    username: string;

    @Min(6, { message: 'Password must be at least 6 characters long' })
    @Max(24, { message: 'Password must be less than 25 characters long' })
    password: string;
}