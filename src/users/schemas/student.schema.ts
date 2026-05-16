import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type StudentDocument =
  HydratedDocument<Student>;

@Schema({
  timestamps: true,
})
export class Student {
  @Prop({
    required: true,
  })
  fullName!: string;

  @Prop({
    required: true,
    unique: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  mobileNumber!: string;

  @Prop({
    required: true,
  })
  collegeName!: string;

  @Prop({
    required: true,
  })
  idCardImageUrl!: string;

  @Prop({
    default: false,
  })
  isStudentVerified!: boolean;
}

export const StudentSchema =
  SchemaFactory.createForClass(Student);