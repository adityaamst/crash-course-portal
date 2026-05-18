import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

// =========================
// MCQ QUESTION DTO
// =========================

export class McqQuestionDto {
  @IsString()
  @IsNotEmpty()
  question!: string;

  @IsArray()
  @ArrayMinSize(2)
  options!: string[];

  @IsString()
  @IsNotEmpty()
  correctAnswer!: string;
}

// =========================
// CREATE ASSIGNMENT DTO
// =========================

export class CreateAssignmentDto {
  // =========================
  // CONTENT ID
  // =========================

  @IsMongoId()
  @IsNotEmpty()
  contentId!: string;

  // =========================
  // TITLE
  // =========================

  @IsString()
  @IsNotEmpty()
  title!: string;

  // =========================
  // DESCRIPTION
  // =========================

  @IsString()
  @IsNotEmpty()
  description!: string;

  // =========================
  // DURATION
  // =========================

  @IsNumber()
  @Min(1)
  durationInMinutes!: number;

  // =========================
  // TOTAL MARKS
  // =========================

  @IsNumber()
  @Min(0)
  totalMarks!: number;

  // =========================
  // QUESTIONS
  // =========================

  @IsArray()
  @ArrayMinSize(1)

  @ValidateNested({
    each: true,
  })

  @Type(() => McqQuestionDto)

  questions!: McqQuestionDto[];
}