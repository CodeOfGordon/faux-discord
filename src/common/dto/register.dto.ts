import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min, minLength } from "class-validator";

export class registerDto {
    @IsEmail({}, {message: 'Username must be an email!'})
    email: string;
    
    @IsString()
    @IsNotEmpty({message: 'Empty username'})
    @Max(255, {message: 'Username is too long'})
    username: string;
    
    @IsString()
    @Max(255, {message: 'Username is too long'})
    display_name: string;

    @Min(6, { message: 'Password must be at least 6 characters long' })
    @Max(24, { message: 'Password must be less than 25 characters long' })
    password: string;

    @IsNumber()
    month: number;
    
    @IsNumber()
    day: number;

    @IsNumber()
    year: number;
}