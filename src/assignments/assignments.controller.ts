import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AssignmentsService } from './assignments.service';

import { CreateAssignmentDto } from './dto/create-assignment.dto';

import { UpdateAssignmentDto } from './dto/update-assignment.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { UserRole } from '../users/schemas/user.schema';

@Controller('assignments')
export class AssignmentsController {
  constructor(
    private assignmentsService: AssignmentsService,
  ) {}

  // =========================
  // CREATE ASSIGNMENT
  // =========================

  @Post()

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(UserRole.ADMIN)

  createAssignment(
    @Body()
    createAssignmentDto: CreateAssignmentDto,
  ) {
    return this.assignmentsService.createAssignment(
      createAssignmentDto,
    );
  }

  // =========================
  // GET ALL ASSIGNMENTS
  // =========================

  @Get()
  getAllAssignments() {
    return this.assignmentsService.getAllAssignments();
  }

  // =========================
  // GET ASSIGNMENTS BY CONTENT
  // =========================

  @Get('content/:contentId')
  getAssignmentsByContent(
    @Param('contentId')
    contentId: string,
  ) {
    return this.assignmentsService.getAssignmentsByContent(
      contentId,
    );
  }

  // =========================
  // GET ASSIGNMENT BY ID
  // =========================

  @Get(':id')
  getAssignmentById(
    @Param('id') id: string,
  ) {
    return this.assignmentsService.getAssignmentById(
      id,
    );
  }

  // =========================
  // UPDATE ASSIGNMENT
  // =========================

  @Patch(':id')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(UserRole.ADMIN)

  updateAssignment(
    @Param('id') id: string,

    @Body()
    updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.updateAssignment(
      id,
      updateAssignmentDto,
    );
  }

  // =========================
  // DELETE ASSIGNMENT
  // =========================

  @Delete(':id')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(UserRole.ADMIN)

  deleteAssignment(
    @Param('id') id: string,
  ) {
    return this.assignmentsService.deleteAssignment(
      id,
    );
  }
}