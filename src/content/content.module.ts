import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ContentController } from './content.controller';

import { ContentService } from './content.service';

import {
  Content,
  ContentSchema,
} from './schemas/content.schema';

import {
  Assignment,
  AssignmentSchema,
} from '../assignments/schemas/assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Content.name,

        schema: ContentSchema,
      },

      {
        name: Assignment.name,

        schema: AssignmentSchema,
      },
    ]),
  ],

  controllers: [ContentController],

  providers: [ContentService],

  exports: [ContentService],
})
export class ContentModule {}