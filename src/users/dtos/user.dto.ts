import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    @ApiProperty({ description: 'The username of the user.' })
    @IsString()
    readonly username: string;

    @ApiProperty({ description: 'The email address of the user.' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: 'The country of the user.' })
    @IsString()
    readonly country: string;

    @ApiProperty({ description: 'The password of the user.' })
    @IsStrongPassword()
    readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ description: 'The username of the user.' })
    @IsString()
    readonly username: string;

    @ApiProperty({ description: 'The email address of the user.' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: 'The country of the user.' })
    @IsString()
    readonly country: string;

    @ApiProperty({ description: 'The password of the user.' })
    @IsStrongPassword()
    readonly password: string;
}

export class SignInDto {
    @ApiProperty({ description: 'The email address of the user.' })
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty({ description: 'The password of the user.' })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
