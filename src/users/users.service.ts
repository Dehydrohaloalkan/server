import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { v4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto } from './dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                surname: true,
                patronymic: true,
                email: true,
                user_role: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    async createUser(data: UserCreateDto) {
        return this.prisma.user.create({
            data: {
                id: v4(),
                ...data,
            },
        });
    }

    async updateUser(params: { where: Prisma.userWhereUniqueInput; data: Prisma.userUpdateInput }) {
        const { where, data } = params;
        return this.prisma.user.update({
            where,
            data,
            include: { user_role: true },
        });
    }

    async deleteUser(where: Prisma.userWhereUniqueInput) {
        return this.prisma.user.delete({ where });
    }

    async getUserBy(where: Prisma.userWhereInput) {
        return this.prisma.user.findFirst({
            where,
            include: { user_role: true },
        });
    }
}
