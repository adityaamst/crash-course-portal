import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { v2 as cloudinary } from 'cloudinary';

import {
  Course,
  CourseDocument,
} from './schemas/course.schema';

import { CreateCourseDto } from './dto/create-course.dto';

import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
  ) {}

  // =========================
  // CREATE COURSE
  // =========================

  async createCourse(
    createCourseDto: CreateCourseDto,

    file: any,
  ) {
    const {
      courseName,
      description,
      price,
      estimatedCompletionTime,
      isPublished,
    } = createCourseDto;

    // =========================
    // CHECK THUMBNAIL
    // =========================

    if (!file) {
      throw new BadRequestException(
        'Course thumbnail is required',
      );
    }

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

    const uploadResult =
      await new Promise<any>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder:
                  'course-thumbnails',
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
    // CREATE COURSE
    // =========================

    const course =
      await this.courseModel.create({
        courseName,

        description,

        price,

        estimatedCompletionTime,

        thumbnailUrl:
          uploadResult.secure_url,

        isPublished:
          isPublished ?? false,
      });

    return {
      message:
        'Course created successfully',

      course,
    };
  }

  // =========================
  // GET ALL COURSES
  // =========================

  async getAllCourses() {
    const courses =
      await this.courseModel.find();

    return {
      message:
        'Courses fetched successfully',

      courses,
    };
  }

  // =========================
  // GET SINGLE COURSE
  // =========================

  async getCourseById(
    courseId: string,
  ) {
    const course =
      await this.courseModel.findById(
        courseId,
      );

    if (!course) {
      throw new NotFoundException(
        'Course not found',
      );
    }

    return {
      message:
        'Course fetched successfully',

      course,
    };
  }

  // =========================
  // UPDATE COURSE
  // =========================

  async updateCourse(
    courseId: string,

    updateCourseDto: UpdateCourseDto,
  ) {
    const updatedCourse =
      await this.courseModel.findByIdAndUpdate(
        courseId,

        updateCourseDto,

        {
          new: true,
        },
      );

    if (!updatedCourse) {
      throw new NotFoundException(
        'Course not found',
      );
    }

    return {
      message:
        'Course updated successfully',

      updatedCourse,
    };
  }

  // =========================
  // DELETE COURSE
  // =========================

  async deleteCourse(
    courseId: string,
  ) {
    const deletedCourse =
      await this.courseModel.findByIdAndDelete(
        courseId,
      );

    if (!deletedCourse) {
      throw new NotFoundException(
        'Course not found',
      );
    }

    return {
      message:
        'Course deleted successfully',
    };
  }
}