import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateStudentDto } from './dto/create-student.dto';

import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('register')
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('register-admin')
registerAdmin(
  @Body()
  registerAdminDto: RegisterAdminDto,
) {
  return this.authService.registerAdmin(
    registerAdminDto,
  );
}

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

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }
}

