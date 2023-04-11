import { Injectable } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { LessonsCreateDto, LessonsUpdateDto } from './dto';

@Injectable()
export class LessonsService {
    constructor(private prisma: PrismaService, private groupsService: GroupsService) {}

    async getAllLessons() {
        return await this.prisma.lesson.findMany();
    }

    async createLesson(data: LessonsCreateDto) {
        return await this.prisma.lesson.create({
            data: {
                id: v4(),
                ...data,
            },
        });
    }

    async getAllAbsences() {
        return await this.prisma.absence.findMany({
            select: {
                lesson: {
                    select: {
                        id: true,
                    },
                },
                student: {
                    select: {
                        id: true,
                    },
                },
                hours: true,
            },
        });
    }

    async getStudentAbsences(userId: string) {
        const studentAbsencesInfo = await this.prisma.student.findFirst({
            where: {
                user: {
                    id: userId,
                },
            },
            select: {
                absences: {
                    select: {
                        lesson: {
                            select: {
                                subject: {
                                    select: {
                                        course: {
                                            select: {
                                                name: true,
                                            },
                                        },
                                        type: {
                                            select: {
                                                name: true,
                                            },
                                        },
                                    },
                                },
                                start_time: true,
                            },
                        },
                        hours: true,
                    },
                },
            },
        });

        return studentAbsencesInfo.absences.map((absence) => {
            return {
                lesson: `${absence.lesson.subject.type.name} ${absence.lesson.subject.course.name}`,
                date: absence.lesson.start_time,
                hours: absence.hours,
            };
        });
    }

    async getGroupAbsences(userId: string) {
        const group = await this.groupsService.getUserGroup(userId);
        return await this.prisma.absence.findMany({
            where: {
                student: {
                    group_id: group.id,
                },
            },
            select: {
                lesson_id: true,
                student_id: true,
                hours: true,
            },
        });
    }

    async getAllGrades() {
        return await this.prisma.grade.findMany({
            select: {
                lesson: {
                    select: {
                        id: true,
                    },
                },
                student: {
                    select: {
                        id: true,
                    },
                },
                value: true,
            },
        });
    }

    async getStudentGrades(userId: string) {
        const studentGradesInfo = await this.prisma.student.findFirst({
            where: {
                user: {
                    id: userId,
                },
            },
            select: {
                grades: {
                    select: {
                        lesson: {
                            select: {
                                subject: {
                                    select: {
                                        course: {
                                            select: {
                                                name: true,
                                            },
                                        },
                                        type: {
                                            select: {
                                                name: true,
                                            },
                                        },
                                    },
                                },
                                start_time: true,
                            },
                        },
                        value: true,
                    },
                },
            },
        });

        return studentGradesInfo.grades.map((grade) => {
            return {
                lesson: `${grade.lesson.subject.type.name} ${grade.lesson.subject.course.name}`,
                date: grade.lesson.start_time,
                value: grade.value,
            };
        });
    }

    async getGroupGrades(userId: string) {
        const group = await this.groupsService.getUserGroup(userId);
        return await this.prisma.grade.findMany({
            where: {
                student: {
                    group_id: group.id,
                },
            },
            select: {
                lesson_id: true,
                student_id: true,
                value: true,
            },
        });
    }

    async updateLesson(params: LessonsUpdateDto) {
        return await this.prisma.lesson.update({
            where: params.where,
            data: params.data,
        });
    }
}
