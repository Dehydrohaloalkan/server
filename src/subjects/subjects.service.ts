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

    async createWithGroups(createSubjectInput: CreateSubjectInput, groupIds: number[]) {
        const newSubject = await this.create(createSubjectInput);
        groupIds.forEach((groupId) => this.addGroup(newSubject.id, groupId));
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

    findByTeacherId(id: string) {
        return this.prisma.subject.findMany({
            where: {
                teacherId: id,
            },
        });
    }

    addGroup(subjectId: number, groupId: number) {
        return this.prisma.subject_group
            .create({
                data: {
                    subjectId: subjectId,
                    groupId: groupId,
                },
                include: {
                    subject: true,
                },
            })
            .then((result) => result.subject);
    }

    async update(id: number, updateSubjectInput: UpdateSubjectInput) {
        await this.lessonService.removeBySubjectId(id);

        const updatedSubject = await this.prisma.subject.update({
            where: {
                id: id,
            },
            data: {
                courseId: updateSubjectInput.courseId,
                teacherId: updateSubjectInput.teacherId,
                recurrence: updateSubjectInput.recurrence,
                typeId: updateSubjectInput.typeId,
            },
        });

        await this.lessonService.createLessons(
            updatedSubject.recurrence,
            updatedSubject.courseId,
            updatedSubject.id,
            updatedSubject.teacherId
        );

        return updatedSubject;
    }

    async updateWithGroups(id: number, updateSubjectInput: UpdateSubjectInput, groupIds: number[]) {
        await this.prisma.subject_group.deleteMany({
            where: {
                subjectId: id,
            },
        });
        const updatedSubject = await this.update(id, updateSubjectInput);
        groupIds.forEach((groupId) => this.addGroup(updatedSubject.id, groupId));
        return updatedSubject;
    }

    async remove(id: number) {
        await this.lessonService.removeBySubjectId(id);

        return this.prisma.subject.delete({
            where: {
                id: id,
            },
        });
    }
}
