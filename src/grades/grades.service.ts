import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';

@Injectable()
export class GradesService {
    constructor(private prisma: PrismaService) {}

    create(createGradeInput: CreateGradeInput) {
        return this.prisma.grade.create({
            data: createGradeInput,
        });
    }

    findAll() {
        return this.prisma.grade.findMany();
    }

    findOne(studentId: string, lessonId: string) {
        return this.prisma.grade.findUnique({
            where: {
                studentId_lessonId: {
                    studentId: studentId,
                    lessonId: lessonId,
                },
            },
        });
    }

    findByStudentId(studentId: string) {
        return this.prisma.grade.findMany({
            where: {
                studentId: studentId,
            },
        });
    }

    update(updateGradeInput: UpdateGradeInput) {
        return this.prisma.grade.update({
            where: {
                studentId_lessonId: {
                    studentId: updateGradeInput.studentId,
                    lessonId: updateGradeInput.studentId,
                },
            },
            data: {
                value: updateGradeInput.value,
            },
        });
    }

    remove(studentId: string, lessonId: string) {
        return this.prisma.grade.delete({
            where: {
                studentId_lessonId: {
                    studentId: studentId,
                    lessonId: lessonId,
                },
            },
        });
    }
}
