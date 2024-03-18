import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService

    ) { }
    static access_token: string;
    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersRepository.CheckValidUser(email);
        
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const passwordMatch = await bcrypt.compare(pass, user.password);
        if (!passwordMatch || !pass) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { userId: user['_id'] , role : user.role};

        AuthService.access_token = await this.jwtService.signAsync(payload);
        return {
            access_token: AuthService.access_token
        };
    }

}