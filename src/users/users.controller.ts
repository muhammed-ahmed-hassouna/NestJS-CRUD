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
import { CreateUserDto , UpdateUserDto } from './dtos/user.dto';
import { errors } from 'src/config/errors.config';
import { AuthGuard } from 'src/guards/authentication.guard';
import { Role } from './decorators/roles.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Users } from './users.schema';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UserRoles } from 'src/enums/user.enum';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@ApiSecurity('JWT-auth')
@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.', type: Users })
  @ApiBadRequestResponse({ description: 'Invalid user data provided.' })
  async registerUser(@Body() userData: CreateUserDto): Promise<Users> {
    return await this.usersService.registerUser(userData);
  }
  
  @Get()
  @ApiResponse({ status: 200, description: 'List of all users.', type: [Users] })
  async findAll(): Promise<{ users: Users[] }> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User found.', type: Users })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<Users | null> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(errors.NotFoundById(id));
    }
    return user;
  }

  @Role([UserRoles.ADMIN, UserRoles.USER])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User updated.', type: Users })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users | null> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(errors.NotFoundById(id));
    }
    return updatedUser;
  }

  @Role([UserRoles.ADMIN])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: string): Promise<any> {
    const deletedUser = await this.usersService.remove(id);
    if (!deletedUser) {
      throw new NotFoundException(errors.NotFoundById(id));
    }
    return deletedUser;
  }
}