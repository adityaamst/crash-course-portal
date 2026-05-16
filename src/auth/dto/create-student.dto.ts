import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  mobileNumber!: string;

  @IsString()
  @IsNotEmpty()
  collegeName!: string;
}