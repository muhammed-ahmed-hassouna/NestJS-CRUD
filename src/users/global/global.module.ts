import { Global, Module } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UsersModule } from '../users.module';
import { UsersRepository } from '../users.repository';
import { Users } from '../users.schema';
@Global()
@Module({
    imports: [UsersModule],
    providers: [UsersService, Users, UsersRepository],
    exports: [UsersModule, Users, UsersService, UsersRepository],

})
export class GlobalModule { }
