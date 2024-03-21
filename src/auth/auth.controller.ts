import { Body, Controller, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/users/dtos/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@ApiBearerAuth('JWT')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res() response: Response) {
        const signInResponse = await this.authService.signIn(signInDto.email, signInDto.password);
        const access_token = signInResponse.access_token;
        
        response.cookie('access_token', access_token, { httpOnly: true });

        return response.send(signInResponse);
    }
}
