import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
    Content,
    ContentDocument,
} from './schemas/content.schema';

import { CreateContentDto } from './dto/create-content.dto';

import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
    constructor(
        @InjectModel(Content.name)
        private contentModel: Model<ContentDocument>,
    ) { }

    // =========================
    // CREATE CONTENT
    // =========================

    async createContent(
        createContentDto: CreateContentDto,
    ) {
        const content =
            await this.contentModel.create(
                createContentDto,
            );

        return {
            message:
                'Content created successfully',

            content,
        };
    }

    // =========================
    // GET ALL CONTENT
    // =========================

    async getAllContent() {
        const contents =
            await this.contentModel
                .find()
                .populate('courseId')
                .sort({
                    createdAt: -1,
                });

        return contents;
    }

    // =========================
    // GET CONTENT BY COURSE
    // =========================

    async getContentByCourse(
        courseId: string,
    ) {
        const contents =
            await this.contentModel
                .find({ courseId })
                .sort({
                    createdAt: 1,
                });

        return contents;
    }

    // =========================
    // GET SINGLE CONTENT
    // =========================

    async getContentById(id: string) {
        const content =
            await this.contentModel
                .findById(id)
                .populate('courseId');

        if (!content) {
            throw new NotFoundException(
                'Content not found',
            );
        }

        return content;
    }

    // =========================
    // UPDATE CONTENT
    // =========================

    async updateContent(
        id: string,

        updateContentDto: UpdateContentDto,
    ) {
        const updatedContent =
            await this.contentModel.findByIdAndUpdate(
                id,

                updateContentDto,

                {
                    new: true,
                    runValidators: true,
                },
            );

        if (!updatedContent) {
            throw new NotFoundException(
                'Content not found',
            );
        }

        return {
            message:
                'Content updated successfully',

            content: updatedContent,
        };
    }

    // =========================
    // DELETE CONTENT
    // =========================

    async deleteContent(id: string) {
        const deletedContent =
            await this.contentModel.findByIdAndDelete(
                id,
            );

        if (!deletedContent) {
            throw new NotFoundException(
                'Content not found',
            );
        }

        return {
            message:
                'Content deleted successfully',
        };
    }



    // =========================
    // GET CONTENT BY TOPIC
    // =========================

    async getContentByTopic(
        topic: string,
    ) {
        const contents =
            await this.contentModel.find({
                topic,
            });

        return contents;
    }
}