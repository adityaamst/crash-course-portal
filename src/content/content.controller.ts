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

import { ContentService } from './content.service';

import { CreateContentDto } from './dto/create-content.dto';

import { UpdateContentDto } from './dto/update-content.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { UserRole } from '../users/schemas/user.schema';

@Controller('sessions')
export class ContentController {
  constructor(
    private contentService: ContentService,
  ) {}

  // =========================
  // CREATE CONTENT
  // =========================

  @Post()

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(UserRole.ADMIN)

  createContent(
    @Body()
    createContentDto: CreateContentDto,
  ) {
    return this.contentService.createContent(
      createContentDto,
    );
  }

  // =========================
  // GET ALL CONTENT
  // =========================

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllContent() {
    return this.contentService.getAllContent();
  }

  // =========================
  // GET CONTENT BY COURSE
  // =========================

  @Get('course/:courseId')
  @UseGuards(JwtAuthGuard)
  getContentByCourse(
    @Param('courseId')
    courseId: string,
  ) {
    return this.contentService.getContentByCourse(
      courseId,
    );
  }


  // =========================
// GET CONTENT BY TOPIC
// =========================

@Get('topic/:topic')
@UseGuards(JwtAuthGuard)
getContentByTopic(
  @Param('topic')
  topic: string,
) {
  return this.contentService.getContentByTopic(
    topic,
  );
}

  // =========================
  // GET SINGLE subtopic
  // =========================

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getContentById(
    @Param('id') id: string,
  ) {
    return this.contentService.getContentById(
      id,
    );
  }

  // =========================
  // UPDATE CONTENT
  // =========================

  @Patch(':id')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(UserRole.ADMIN)

  updateContent(
    @Param('id') id: string,

    @Body()
    updateContentDto: UpdateContentDto,
  ) {
    return this.contentService.updateContent(
      id,
      updateContentDto,
    );
  }

  // =========================
  // DELETE CONTENT
  // =========================

  @Delete(':id')

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles(UserRole.ADMIN)

  deleteContent(
    @Param('id') id: string,
  ) {
    return this.contentService.deleteContent(
      id,
    );
  }
}