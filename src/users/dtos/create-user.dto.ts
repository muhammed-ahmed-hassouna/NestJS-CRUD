import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly username: string;
    @IsEmail()
    readonly email: string;
    @IsString()
    readonly country: string;
    @IsStrongPassword()
    readonly password: string;
}

