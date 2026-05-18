import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  courseName!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @Type(() => Number)

  @IsNumber()

  @Min(0)
  price!: number;

  @IsString()
  @IsNotEmpty()
  estimatedCompletionTime!: string;

  @IsOptional()

  @Type(() => Boolean)

  @IsBoolean()
  isPublished?: boolean;
}