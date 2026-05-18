import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  Assignment,
  AssignmentDocument,
} from './schemas/assignment.schema';

import { CreateAssignmentDto } from './dto/create-assignment.dto';

import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(
      Assignment.name,
    )
    private assignmentModel: Model<AssignmentDocument>,
  ) {}

  // =========================
  // CREATE ASSIGNMENT
  // =========================

  async createAssignment(
    createAssignmentDto: CreateAssignmentDto,
  ) {
    const assignment =
      await this.assignmentModel.create(
        createAssignmentDto,
      );

    return {
      message:
        'Assignment created successfully',

      assignment,
    };
  }

  // =========================
  // GET ALL ASSIGNMENTS
  // =========================

  async getAllAssignments() {
    const assignments =
      await this.assignmentModel
        .find()
        .populate('contentId');

    return assignments;
  }

  // =========================
  // GET ASSIGNMENT BY ID
  // =========================

  async getAssignmentById(
    id: string,
  ) {
    const assignment =
      await this.assignmentModel
        .findById(id)
        .populate('contentId');

    if (!assignment) {
      throw new NotFoundException(
        'Assignment not found',
      );
    }

    return assignment;
  }

  // =========================
  // GET ASSIGNMENTS BY CONTENT
  // =========================

  async getAssignmentsByContent(
    contentId: string,
  ) {
    const assignments =
      await this.assignmentModel.find({
        contentId,
      });

    return assignments;
  }

  // =========================
  // UPDATE ASSIGNMENT
  // =========================

  async updateAssignment(
    id: string,

    updateAssignmentDto: UpdateAssignmentDto,
  ) {
    const updatedAssignment =
      await this.assignmentModel.findByIdAndUpdate(
        id,

        updateAssignmentDto,

        {
          new: true,
        },
      );

    if (!updatedAssignment) {
      throw new NotFoundException(
        'Assignment not found',
      );
    }

    return {
      message:
        'Assignment updated successfully',

      assignment:
        updatedAssignment,
    };
  }

  // =========================
  // DELETE ASSIGNMENT
  // =========================

  async deleteAssignment(
    id: string,
  ) {
    const deletedAssignment =
      await this.assignmentModel.findByIdAndDelete(
        id,
      );

    if (!deletedAssignment) {
      throw new NotFoundException(
        'Assignment not found',
      );
    }

    return {
      message:
        'Assignment deleted successfully',
    };
  }
}