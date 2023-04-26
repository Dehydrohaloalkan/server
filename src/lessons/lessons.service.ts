import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { IRecurrence } from './dto/recurrence.dto';

@Injectable()
export class LessonsService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.lesson.findMany();
    }

    findOne(id: string) {
        return this.prisma.lesson.findUnique({
            where: {
                id: id,
            },
        });
    }

    findBySubjectId(id: number) {
        return this.prisma.lesson.findMany({
            where: {
                subjectId: id,
            },
        });
    }

    async createLessons(
        recurrence: string,
        courseId: number,
        subjectId: number,
        defaultTeacherId: string
    ) {
        const rec: IRecurrence = JSON.parse(recurrence);

        const courseInfo = await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                startDate: true,
                endDate: true,
            },
        });

        if (rec.week) {
            let lessons = [];
            rec.week.forEach((weekDay) => {
                const dates = this.getDatesInRangeByWeekday(
                    courseInfo.startDate,
                    courseInfo.endDate,
                    weekDay.dayNumber
                );

                dates.forEach((date) => {
                    weekDay.lessonsInfo.forEach(async (lessonInfo) => {
                        lessons.push({
                            id: v4(),
                            startTime: this.combineDateTime(date, lessonInfo.startTime),
                            endTime: this.combineDateTime(date, lessonInfo.endTime),
                            subjectId: subjectId,
                            location: lessonInfo.location,
                            teacherId: lessonInfo.teacherId ?? defaultTeacherId,
                        });
                    });
                });
            });
            await this.prisma.lesson.createMany({ data: lessons });
        }
    }

    private getDatesInRangeByWeekday(startDate: Date, endDate: Date, weekdayNumber: number) {
        const result = [];
        const weekdayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        // Find the first occurrence of the desired weekday
        const startDayOfWeek = startDate.getDay();
        const daysUntilWeekday = (weekdayNumber - startDayOfWeek + 7) % 7;
        const firstWeekday = new Date(startDate);
        firstWeekday.setDate(startDate.getDate() + daysUntilWeekday);

        // Loop through each occurrence of the desired weekday
        let currentWeekday = new Date(firstWeekday);
        while (currentWeekday <= endDate) {
            result.push(new Date(currentWeekday));
            currentWeekday.setDate(currentWeekday.getDate() + 7);
        }

        return result;
    }

    private combineDateTime(date: Date, time: string) {
        const [hours, minutes] = time.split(':');
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            Number.parseInt(hours) + 3,
            Number.parseInt(minutes)
        );
    }
}
