import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers() {
        return this.prisma.user.findMany();
    }

    async createUser(data: Prisma.userCreateInput) {
        return this.prisma.user.create({ data });
    }

    async updateUser(params: {
        where: Prisma.userWhereUniqueInput;
        data: Prisma.userUpdateInput;
    }) {
        const { where, data } = params;
        return this.prisma.user.update({ where, data });
    }

    async deleteUser(where: Prisma.userWhereUniqueInput) {
        return this.prisma.user.delete({ where });
    }

    async getUserByEmail(where: Prisma.userWhereInput) {
        return this.prisma.user.findFirst({ where });
    }
}
