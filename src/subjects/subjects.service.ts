import { Injectable } from '@nestjs/common';
import { LessonsService } from 'src/lessons/lessons.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';

@Injectable()
export class SubjectsService {
    constructor(private prisma: PrismaService, private lessonService: LessonsService) {}

    async create(createSubjectInput: CreateSubjectInput) {
        const newSubject = await this.prisma.subject.create({
            data: createSubjectInput,
        });

        await this.lessonService.createLessons(
            createSubjectInput.recurrence,
            createSubjectInput.courseId,
            newSubject.id,
            createSubjectInput.teacherId
        );

        return newSubject;
    }

    findAll() {
        return this.prisma.subject.findMany();
    }

    findOne(id: number) {
        return this.prisma.subject.findUnique({
            where: {
                id: id,
            },
        });
    }

    findByGroupId(id: number) {
        return this.prisma.subject_group
            .findMany({
                where: {
                    groupId: id,
                },
                include: {
                    subject: true,
                },
            })
            .then((result) =>
                result.map((subjectGroup) => ({
                    ...subjectGroup.subject,
                }))
            );
    }

    update(id: number, updateSubjectInput: UpdateSubjectInput) {
        // TODO
        return `This action updates a #${id} subject`;
    }

    async remove(id: number) {
        await this.prisma.lesson.deleteMany({
            where: {
                subjectId: id,
            },
        });

        return this.prisma.subject.delete({
            where: {
                id: id,
            },
        });
    }
}
