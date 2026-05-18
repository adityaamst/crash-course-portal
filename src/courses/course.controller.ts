import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { CourseService } from './course.service';

import { CreateCourseDto } from './dto/create-course.dto';

import { UpdateCourseDto } from './dto/update-course.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { UserRole } from '../users/schemas/user.schema';

@Controller('courses')
export class CourseController {
  constructor(
    private courseService: CourseService,
  ) {}

  // =========================
  // CREATE COURSE
  // =========================

  @Post()

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(UserRole.ADMIN)

  @UseInterceptors(
    FileInterceptor('thumbnail'),
  )

  createCourse(
    @Body()
    createCourseDto: CreateCourseDto,

    @UploadedFile()
    file: any,
  ) {
    return this.courseService.createCourse(
      createCourseDto,
      file,
    );
  }

  // =========================
  // GET ALL COURSES
  // =========================

  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  // =========================
  // GET SINGLE COURSE
  // =========================

  @Get(':id')
  getCourseById(
    @Param('id') courseId: string,
  ) {
    return this.courseService.getCourseById(
      courseId,
    );
  }

  // =========================
  // UPDATE COURSE
  // =========================

  @Patch(':id')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(UserRole.ADMIN)

  updateCourse(
    @Param('id') courseId: string,

    @Body()
    updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(
      courseId,
      updateCourseDto,
    );
  }

  // =========================
  // DELETE COURSE
  // =========================

  @Delete(':id')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(UserRole.ADMIN)

  deleteCourse(
    @Param('id') courseId: string,
  ) {
    return this.courseService.deleteCourse(
      courseId,
    );
  }
}