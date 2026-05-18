import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import {
  HydratedDocument,
  Types,
} from 'mongoose';

export type ContentDocument =
  HydratedDocument<Content>;

@Schema({
  timestamps: true,
})
export class Content {
  // =========================
  // LINKED COURSE
  // =========================

  @Prop({
    type: Types.ObjectId,

    ref: 'Course',

    required: true,
  })
  courseId!: Types.ObjectId;

  // =========================
  // TOPIC
  // =========================

  @Prop({
    required: true,
    trim: true,
  })
  topic!: string;

  // =========================
  // SUBTOPIC
  // =========================

  @Prop({
    required: true,
    trim: true,
  })
  subtopic!: string;

  // =========================
  // MAIN CONTENT
  // =========================

  @Prop({
    required: true,
  })
  content!: string;
}

export const ContentSchema =
  SchemaFactory.createForClass(
    Content,
  );