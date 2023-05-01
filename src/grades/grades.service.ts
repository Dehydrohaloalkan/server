import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';

@Injectable()
export class GradesService {
    constructor(private prisma: PrismaService, private scheduleService: ScheduleService) {}

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

    getGroupGrades(id: number) {
        return this.prisma.grade.findMany({
            where: {
                student: {
                    group: {
                        id: id,
                    },
                },
            },
        });
    }

    getSubjectGroupGrades(id: number, week: number, subjectId: number) {
        const { monday, sunday } = this.scheduleService.getMondayAndSundayForWeekOffset(week);

        return this.prisma.grade.findMany({
            where: {
                AND: [
                    {
                        student: {
                            group: {
                                id: id,
                            },
                        },
                    },
                    {
                        lesson: {
                            AND: [
                                {
                                    startTime: {
                                        gte: monday,
                                        lte: sunday,
                                    },
                                },
                                {
                                    subject: {
                                        id: subjectId,
                                    },
                                },
                            ],
                        },
                    },
                ],
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
