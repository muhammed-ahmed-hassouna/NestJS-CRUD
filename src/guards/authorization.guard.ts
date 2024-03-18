import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/users/decorators/roles.decorator';
import { IUserService, UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private reflect: Reflector,
        private usersRepository: UsersRepository,
    ) { }

    async canActivate(context: ExecutionContext,): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requiredRoles = this.reflect.getAllAndOverride(ROLE_KEY, [context.getHandler(), context.getClass()]);

        const user = request.user;

        if (!user || !user.userId) {
            throw new UnauthorizedException();
        }

        const userRole = await this.usersRepository.getUserRole(user.userId);
        if (!userRole || !requiredRoles.includes(userRole)) {
            throw new ForbiddenException('User does not have the required role');
        }
        return true;
    }
}