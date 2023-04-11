import { Injectable } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectCreateDto, SubjectDeleteDto, SubjectUpdateDto, subjectAddGroupDto } from './dto';

@Injectable()
export class SubjectsService {
    constructor(private prisma: PrismaService, private groupsService: GroupsService) {}

    async getAllSubjects() {
        return await this.prisma.subject.findMany({
            select: {
                id: true,
                recurrence_json: true,
                course: {
                    select: {
                        id: true,
                        name: true,
                        start_date: true,
                        end_date: true,
                        form: true,
                    },
                },
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        patronymic: true,
                    },
                },
                type: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async getSubjectsInfoByUser(userId: string) {
        const group = await this.groupsService.getUserGroup(userId);
        return await this.prisma.subject.findMany({
            where: {
                groups: {
                    some: {
                        group_id: group.id,
                    },
                },
            },
            select: {
                id: true,
                course: {
                    select: {
                        name: true,
                        start_date: true,
                        end_date: true,
                    },
                },
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        patronymic: true,
                    },
                },
                type: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async addGroupsToSubject(data: subjectAddGroupDto) {
        return await this.prisma.subject_group.create({ data });
    }

    async createSubject(data: SubjectCreateDto) {
        return await this.prisma.subject.create({ data });
    }

    async updateSubject(params: SubjectUpdateDto) {
        return await this.prisma.subject.update({
            where: params.where,
            data: params.data,
        });
    }

    async deleteSubject(where: SubjectDeleteDto) {
        return await this.prisma.subject.delete({ where });
    }
}
