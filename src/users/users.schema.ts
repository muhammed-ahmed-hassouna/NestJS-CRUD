import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export interface User {
    username: string;
    email: string;
    password: string;
    country: string;
    isDeleted: boolean;
    role: string;
}

@Schema()
export class Users implements User {
    @Prop({ required: true, unique: true, type: String })
    username: string;

    @Prop({ required: true, unique: true, type: String })
    email: string;

    @Prop({ required: true, type: String })
    password: string;

    @Prop({ required: true, type: String })
    country: string;

    @Prop({ type: String, default: 'user' })
    role: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);