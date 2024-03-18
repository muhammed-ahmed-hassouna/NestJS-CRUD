import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersRepository } from './users.repository';
import { Users } from './users.schema';
import { Cache } from 'cache-manager';
import { MongoError } from 'mongodb';
import * as bcrypt from 'bcrypt';
import { errors } from 'src/config/errors.config';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject('CACHE_MANAGER') private cacheManager: Cache
  ) { }

  async registerUser(userData: CreateUserDto): Promise<Users> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = {
        ...userData, password: hashedPassword
      };
      const savedUser = await this.usersRepository.createUser(newUser);
      // Cache the saved user
      await this.cacheManager.set(`user_${savedUser}`, savedUser);
      return savedUser;
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        const match = error.message.match(/\"(.+?)\"/);
        // Extract the duplicate key from the error message
        const duplicateKey = match ? match[1] : 'Unknown';
        throw errors.DuplicateKeyError(duplicateKey)
      } else {
        throw error;
      }
    }
  }

  async findAll(): Promise<{ count: number; users: Users[] }> {
    return this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const updatedUser = await this.usersRepository.update(id, updateUserDto);

    // Cache the updated user
    await this.cacheManager.set(`user_${id}`, updatedUser);

    return updatedUser;
  }

  async remove(id: string): Promise<any> {
    await this.usersRepository.remove(id);
    await this.cacheManager.del(`user_${id}`);
  }
}
