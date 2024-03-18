import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization.split(' ')[1];
            
            if (!token) {
                throw new UnauthorizedException();
            }

            const payload = this.jwtService.verify(token);

            request.user = payload;

        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
