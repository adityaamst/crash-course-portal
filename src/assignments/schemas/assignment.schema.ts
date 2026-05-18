import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import {
  HydratedDocument,
  Types,
} from 'mongoose';

export type AssignmentDocument =
  HydratedDocument<Assignment>;

// =========================
// MCQ QUESTION SCHEMA
// =========================

@Schema({
  _id: false,
})
export class McqQuestion {
  @Prop({
    required: true,
  })
  question!: string;

  @Prop({
    type: [String],

    required: true,
  })
  options!: string[];

  @Prop({
    required: true,
  })
  correctAnswer!: string;
}

export const McqQuestionSchema =
  SchemaFactory.createForClass(
    McqQuestion,
  );

// =========================
// ASSIGNMENT SCHEMA
// =========================

@Schema({
  timestamps: true,
})
export class Assignment {
  // =========================
  // LINK CONTENT/SUBTOPIC
  // =========================

  @Prop({
    type: Types.ObjectId,

    ref: 'Content',

    required: true,
  })
  contentId!: Types.ObjectId;

  // =========================
  // TITLE
  // =========================

  @Prop({
    required: true,
    trim: true,
  })
  title!: string;

  // =========================
  // DESCRIPTION
  // =========================

  @Prop({
    required: true,
  })
  description!: string;

  // =========================
  // TIMER
  // =========================

  @Prop({
    required: true,
    min: 1,
  })
  durationInMinutes!: number;

  // =========================
  // TOTAL MARKS
  // =========================

  @Prop({
    required: true,
    min: 0,
  })
  totalMarks!: number;

  // =========================
  // MCQ QUESTIONS
  // =========================

  @Prop({
    type: [McqQuestionSchema],

    required: true,
  })
  questions!: McqQuestion[];
}

export const AssignmentSchema =
  SchemaFactory.createForClass(
    Assignment,
  );