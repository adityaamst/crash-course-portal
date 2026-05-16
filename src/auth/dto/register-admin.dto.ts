import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterAdminDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()

  @MinLength(6)

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
  )

  password!: string;

  @IsString()
  adminSecretKey!: string;
}