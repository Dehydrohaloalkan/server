import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
    constructor(private prisma: PrismaService) {}

    async getAllGroups() {
        return this.prisma.group.findMany({
            select: {
                id: true,
                number: true,
                form: true,
            },
        });
    }

    async getGroupInfo(id: number) {
        return await this.prisma.group.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                number: true,
                form: true,
                students: {
                    select: {
                        id: true,
                        is_group_leader: true,
                        is_marking: true,
                        subgroup: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                surname: true,
                                patronymic: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async getGroupInfoByUser(userId: string) {
        const group = await this.getUserGroup(userId);
        return this.getGroupInfo(group.id);
    }

    async getUserGroup(userId: string) {
        return await this.prisma.group.findFirst({
            where: {
                students: {
                    some: {
                        user: {
                            id: userId,
                        },
                    },
                },
            },
            select: {
                id: true,
            },
        });
    }

    async createGroup(data: Prisma.groupCreateInput) {
        return this.prisma.group.create({ data });
    }

    async updateGroup(params: {
        where: Prisma.groupWhereUniqueInput;
        data: Prisma.groupUpdateInput;
    }) {
        const { where, data } = params;
        return this.prisma.group.update({ where, data });
    }

    async deleteGroup(where: Prisma.groupWhereUniqueInput) {
        return this.prisma.group.delete({ where });
    }
}
