import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) {}

    async getAllRoles() {
        return this.prisma.user_role.findMany();
    }

    async getRoleById(where: Prisma.user_roleWhereUniqueInput) {
        return this.prisma.user_role.findFirst({ where });
    }

    async createRole(data: Prisma.user_roleCreateInput) {
        return this.prisma.user_role.create({ data });
    }
}
