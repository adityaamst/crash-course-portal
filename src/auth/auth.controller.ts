import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Req,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';

import type { Request,Response } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';

import { RegisterAdminDto } from './dto/register-admin.dto';

import { CreateStudentDto } from './dto/create-student.dto';

import { LoginDto } from './dto/login.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { RolesGuard } from './guards/roles.guard';

import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  // =========================
  // REGISTER USER
  // =========================

  @Post('register')
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(
      registerDto,
    );
  }

  // =========================
  // REGISTER ADMIN
  // =========================

  @Post('register-admin')
  registerAdmin(
    @Body()
    registerAdminDto: RegisterAdminDto,
  ) {
    return this.authService.registerAdmin(
      registerAdminDto,
    );
  }

  // =========================
  // REGISTER STUDENT
  // =========================

  @Post('register-student')

  @UseInterceptors(
    FileInterceptor('idCardImage'),
  )

  registerStudent(
    @Body()
    createStudentDto: CreateStudentDto,

    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.authService.registerStudent(
      createStudentDto,
      file,
    );
  }

  // =========================
  // LOGIN
  // =========================

  @Post('login')
  login(
    @Body() loginDto: LoginDto,

    @Res({ passthrough: true })
    response: Response,
  ) {
    return this.authService.login(
      loginDto,
      response,
    );
  }


// =========================
// Logout
// =========================  
@Post('logout')
logout(
  @Req() request: Request,

  @Res({ passthrough: true })
  response: Response,
) {
  return this.authService.logout(
    request,
    response,
  );
}

// =========================
// VERIFY STUDENT (ADMIN ONLY)
// =========================

@Patch(
  'verify-student/:studentId',
)

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)

@Roles('ADMIN')

verifyStudent(
  @Param('studentId')
  studentId: string,
) {
  return this.authService
    .verifyStudent(studentId);
}

}