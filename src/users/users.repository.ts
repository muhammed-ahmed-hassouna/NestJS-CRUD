import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { Users } from './users.schema';

export interface IUserService {
    getUserRole(userId: string): Promise<string>;
}
@Injectable()
export class UsersRepository implements IUserService {
    constructor(
        @InjectModel(Users.name) private readonly userModel: Model<Users>,
    ) { }

    async createUser(userData: CreateUserDto): Promise<Users> {
        const newUser = new this.userModel(userData);
        return await newUser.save();
    }

    async findAll(): Promise<{ count: number; users: Users[] }> {
        const users = await this.userModel.find({ isDeleted: false }).exec();
        const count = users.length;
        return { count, users };
    }

    async findOne(id: string): Promise<Users | null> {
        return await this.userModel.findById(id, { isDeleted: false }).exec();
    }
    
    // Function For Auth Service(SignIn)
    async CheckValidUser(email: string): Promise<Users | undefined> {
        return await this.userModel.findOne({ email, isDeleted: false }).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<Users | null> {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        return await this.userModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
    }

    async getUserRole(userId: string): Promise<string> {
        try {
            const user = await this.userModel.findById(userId);
            return user ? user.role : null;
        } catch (error) {
            console.error('Error fetching user from DB:', error);
            throw new UnauthorizedException('Failed to authenticate user');
        }
    }
}
