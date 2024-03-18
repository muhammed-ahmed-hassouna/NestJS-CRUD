import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { errors } from 'src/config/errors.config';
import { AuthGuard } from 'src/guards/authentication.guard';
import { Role } from './decorators/roles.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Users } from './users.schema';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async registerUser(@Body() userData: CreateUserDto): Promise<Users> {
    return await this.usersService.registerUser(userData);
  }

  @Get()
  async findAll(): Promise<{ users: Users[] }> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Users | null> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(errors.NotFoundById(id));
    }
    return user;

  }

  @Role('user')
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users | null> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(errors.NotFoundById(id));
    }
    return updatedUser;
  }

  @Role('admin')
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    const deletedUser = await this.usersService.remove(id);
    if (!deletedUser) {
      throw new NotFoundException(errors.NotFoundById(id));
    }
    return deletedUser;
  }
}
