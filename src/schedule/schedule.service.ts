import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
    constructor(private prisma: PrismaService) {}

    getTeacherSchedule(week: number, teacherId: string) {
        return {
            week: week,
            teacherId: teacherId,
        };
    }
    getGroupSchedule(week: number, groupId: number) {
        return {
            week: week,
            groupId: groupId,
        };
    }

    getSubjectGroupSchedule(week: number, groupId: number, subjectId: number) {
        return {
            week: week,
            groupId: groupId,
            subjectId: subjectId,
        };
    }

    async getLessons(schedule: Schedule) {
        const { monday, sunday } = this.getMondayAndSundayForWeekOffset(schedule.week);

        if (schedule.groupId) {
            const and: any = [
                {
                    subject: {
                        groups: {
                            some: {
                                group: {
                                    id: schedule.groupId,
                                },
                            },
                        },
                    },
                },
                {
                    startTime: {
                        gte: monday,
                        lte: sunday,
                    },
                },
            ];

            if (schedule.subjectId) {
                and.push({
                    subject: {
                        id: schedule.subjectId,
                    },
                });
            }

            return await this.prisma.lesson.findMany({
                where: {
                    AND: and,
                },
            });
        } else {
            return await this.prisma.lesson.findMany({
                where: {
                    AND: [
                        {
                            startTime: {
                                gte: monday,
                                lte: sunday,
                            },
                        },
                        {
                            teacherId: schedule.teacherId,
                        },
                    ],
                },
            });
        }

        return [];
    }

    getMondayAndSundayForWeekOffset(offset: number): { monday: Date; sunday: Date } {
        const today = new Date();
        const monday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - today.getDay() + 1 + 7 * offset
        );
        const sunday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - today.getDay() + 7 + 7 * offset
        );
        return { monday, sunday };
    }
}
