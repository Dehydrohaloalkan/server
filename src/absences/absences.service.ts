import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { CreateAbsenceInput } from './dto/create-absence.input';

@Injectable()
export class AbsencesService {
    constructor(private prisma: PrismaService, private scheduleService: ScheduleService) {}

    async create(createAbsenceInput: CreateAbsenceInput) {
        const lesson = await this.prisma.lesson.findUnique({
            where: {
                id: createAbsenceInput.lessonId,
            },
            select: {
                startTime: true,
                endTime: true,
            },
        });

        return this.prisma.absence.create({
            data: {
                ...createAbsenceInput,
                hours: this.getHoursBetweenDates(lesson.startTime, lesson.endTime),
            },
        });
    }

    findAll() {
        return this.prisma.absence.findMany();
    }

    findOne(studentId: string, lessonId: string) {
        return this.prisma.absence.findUnique({
            where: {
                studentId_lessonId: {
                    studentId: studentId,
                    lessonId: lessonId,
                },
            },
        });
    }

    findByStudentId(studentId: string) {
        return this.prisma.absence.findMany({
            where: {
                studentId: studentId,
            },
        });
    }

    getGroupAbsences(id: number, week: number) {
        const { monday, sunday } = this.scheduleService.getMondayAndSundayForWeekOffset(week);

        return this.prisma.absence.findMany({
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
                            startTime: {
                                gte: monday,
                                lte: sunday,
                            },
                        },
                    },
                ],
            },
        });
    }

    getSubjectGroupAbsences(id: number, week: number, subjectId: number) {
        const { monday, sunday } = this.scheduleService.getMondayAndSundayForWeekOffset(week);

        return this.prisma.absence.findMany({
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

    remove(studentId: string, lessonId) {
        return this.prisma.absence.delete({
            where: {
                studentId_lessonId: {
                    studentId: studentId,
                    lessonId: lessonId,
                },
            },
        });
    }

    private getHoursBetweenDates(startDate: Date, endDate: Date): number {
        const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        return diffInHours;
    }
}
