
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { v2 as cloudinary } from 'cloudinary';

import { UsersService } from '../users/users.service';

import { UserRole } from '../users/schemas/user.schema';

import { RegisterDto } from './dto/register.dto';

import { LoginDto } from './dto/login.dto';

import { RegisterAdminDto } from './dto/register-admin.dto';

import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // =========================
  // REGISTER NORMAL USER
  // =========================

  async register(registerDto: RegisterDto) {
    const { name, email, password } =
      registerDto;

    const normalizedEmail =
      email.toLowerCase();

    const existingUser =
      await this.usersService.findByEmail(
        normalizedEmail,
      );

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await this.usersService.createUser({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: UserRole.USER,
      });

    return {
      message:
        'User registered successfully',

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // =========================
  // REGISTER ADMIN
  // =========================

  async registerAdmin(
    registerAdminDto: RegisterAdminDto,
  ) {
    const {
      name,
      email,
      password,
      adminSecretKey,
    } = registerAdminDto;

    // Verify secret key
    if (
      adminSecretKey !==
      process.env.ADMIN_SECRET_KEY
    ) {
      throw new UnauthorizedException(
        'Invalid admin secret key',
      );
    }

    const normalizedEmail =
      email.toLowerCase();

    const existingUser =
      await this.usersService.findByEmail(
        normalizedEmail,
      );

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin =
      await this.usersService.createUser({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
      });

    return {
      message:
        'Admin registered successfully',

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  // =========================
  // STUDENT REGISTRATION
  // =========================

  async registerStudent(
    createStudentDto: CreateStudentDto,

    file: any,
  ) {
    const {
      fullName,
      email,
      password,
      mobileNumber,
      collegeName,
    } = createStudentDto;

    const normalizedEmail =
      email.toLowerCase();

    const existingUser =
  await this.usersService.findByEmail(
    normalizedEmail,
  );

    if (existingUser) {
      throw new BadRequestException(
        'Student already registered',
      );
    }

    if (!file) {
      throw new BadRequestException(
        'ID card image is required',
      );
    }



    const hashedPassword =
  await bcrypt.hash(password, 10);




    // =========================
    // CLOUDINARY CONFIG
    // =========================

    cloudinary.config({
      cloud_name:
        process.env
          .CLOUDINARY_CLOUD_NAME,

      api_key:
        process.env
          .CLOUDINARY_API_KEY,

      api_secret:
        process.env
          .CLOUDINARY_API_SECRET,
    });

    // =========================
    // UPLOAD IMAGE
    // =========================

    // const uploadResult =
    //   await cloudinary.uploader.upload(
    //     file.path,
    //     {
    //       folder:
    //         'student-id-cards',
    //     },
    //   );

    const uploadResult =
  await new Promise<any>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder:
              'student-id-cards',
          },

          (
            error,
            result,
          ) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(file.buffer);
    },
  );

    // =========================
    // SAVE STUDENT
    // =========================

    // const student =
    //   await this.usersService.createStudent({
    //     fullName,

    //     email: normalizedEmail,

    //     mobileNumber,

    //     collegeName,

    //     idCardImageUrl:
    //       uploadResult.secure_url,

    //     isStudentVerified: false,
    //   });


    const student =
  await this.usersService.createUser({
    name: fullName,

    email: normalizedEmail,

    password: hashedPassword,

    role: UserRole.STUDENT,

    mobileNumber,

    collegeName,

    idCardImageUrl:
      uploadResult.secure_url,

    isStudentVerified: false,
  });

    return {
      message:
        'Student registered successfully',

      student,
    };
  }

  // =========================
  // LOGIN
  // =========================

  async login(loginDto: LoginDto) {
    const { email, password } =
      loginDto;

    const normalizedEmail =
      email.toLowerCase();

    const user =
      await this.usersService.findByEmail(
        normalizedEmail,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken =
      this.jwtService.sign(payload);

    return {
      message: 'Login successful',

      accessToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}