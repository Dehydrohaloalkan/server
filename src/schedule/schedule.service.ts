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
            groupId: 0,
        };
    }
    getGroupSchedule(week: number, groupId: number) {
        return {
            week: week,
            groupId: groupId,
            teacherId: '',
        };
    }

    async getLessons(schedule: Schedule) {
        const { monday, sunday } = this.getMondayAndSundayForWeekOffset(schedule.week);

        if (schedule.groupId) {
            return await this.prisma.lesson.findMany({
                where: {
                    AND: [
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
                    ],
                },
            });
        } else {
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
