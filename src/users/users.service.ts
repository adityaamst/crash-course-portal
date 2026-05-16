
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  User,
  UserDocument,
} from './schemas/user.schema';

import {
  Student,
  StudentDocument,
} from './schemas/student.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  // =========================
  // USER METHODS
  // =========================

  async findByEmail(email: string) {
    return this.userModel.findOne({
      email,
    });
  }

  async createUser(
    data: Partial<User>,
  ) {
    return this.userModel.create(data);
  }

  async findById(userId: string) {
    return this.userModel.findById(
      userId,
    );
  }

  // =========================
  // STUDENT METHODS
  // =========================

  async findStudentByEmail(
    email: string,
  ) {
    return this.studentModel.findOne({
      email,
    });
  }

  async createStudent(
    data: Partial<Student>,
  ) {
    return this.studentModel.create(data);
  }
}