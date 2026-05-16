import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'USER',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;

  @Prop({
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Prop({
    default: false,
  })
  isStudentVerified!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);