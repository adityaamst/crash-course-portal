import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type UserDocument =
  HydratedDocument<User>;

export enum UserRole {
  USER = 'USER',

  STUDENT = 'STUDENT',

  ADMIN = 'ADMIN',
}
// =========================
// USER SCHEMA
// =========================  

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

  // =========================
  // STUDENT FIELDS
  // =========================

  @Prop({
    default: false,
  })
  isStudentVerified!: boolean;

  @Prop()
  mobileNumber?: string;

  @Prop()
  collegeName?: string;

  @Prop()
  idCardImageUrl?: string;
}

export const UserSchema =
  SchemaFactory.createForClass(User);