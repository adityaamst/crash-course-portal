import {
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateContentDto {
  // =========================
  // COURSE ID
  // =========================

  @IsMongoId()
  @IsNotEmpty()
  courseId!: string;

  // =========================
  // TOPIC
  // =========================

  @IsString()
  @IsNotEmpty()
  topic!: string;

  // =========================
  // SUBTOPIC
  // =========================

  @IsString()
  @IsNotEmpty()
  subtopic!: string;

  // =========================
  // MAIN CONTENT
  // =========================

  @IsString()
  @IsNotEmpty()
  content!: string;
}