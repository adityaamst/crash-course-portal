import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type CourseDocument =
  HydratedDocument<Course>;

@Schema({
  timestamps: true,
})
export class Course {
  @Prop({
    required: true,
    trim: true,
  })
  courseName!: string;

  @Prop({
    required: true,
  })
  description!: string;

  @Prop({
    required: true,
    min: 0,
  })
  price!: number;

  @Prop({
    required: true,
  })
  estimatedCompletionTime!: string;

  @Prop({
    required: true,
  })
  thumbnailUrl!: string;

  @Prop({
    default: false,
  })
  isPublished!: boolean;
}

export const CourseSchema =
  SchemaFactory.createForClass(
    Course,
  );