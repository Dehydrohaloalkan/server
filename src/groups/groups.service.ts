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
