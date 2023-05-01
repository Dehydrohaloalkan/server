import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    create(createUserInput: CreateUserInput) {
        return this.prisma.user.create({
            data: {
                id: v4(),
                ...createUserInput,
            },
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }

    findOneWithRole(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                userRole: true,
            },
        });
    }

    update(id: string, updateUserInput: UpdateUserInput) {
        return this.prisma.user.update({
            where: {
                id: id,
            },
            data: updateUserInput,
        });
    }

    remove(id: string) {
        return this.prisma.user.delete({
            where: {
                id: id,
            },
        });
    }

    findByEmail(email: string) {
        return this.prisma.user.findFirst({
            where: {
                email: email,
            },
            include: {
                userRole: true,
            },
        });
    }

    updatePassword(id: string, passwordHash: string) {
        return this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: passwordHash,
            },
            include: {
                userRole: true,
            },
        });
    }

    updateRt(id: string, rtHash: string) {
        return this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                rt: rtHash,
            },
        });
    }
}
