
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  // =========================
  // FULL NAME
  // =========================

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  // =========================
  // EMAIL
  // =========================

  @IsEmail()
  email!: string;

  // =========================
  // PASSWORD
  // =========================

  @IsString()

  @MinLength(6)

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    {
      message:
        'Password must contain uppercase, lowercase, number and special character',
    },
  )
  password!: string;

  // =========================
  // MOBILE NUMBER
  // =========================

  @IsString()

  @Matches(/^[0-9]{10}$/, {
    message:
      'Mobile number must be exactly 10 digits',
  })
  mobileNumber!: string;

  // =========================
  // COLLEGE NAME
  // =========================

  @IsString()
  @IsNotEmpty()
  collegeName!: string;
}