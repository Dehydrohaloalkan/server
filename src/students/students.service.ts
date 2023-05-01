import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService, private usersService: UsersService) {}

    async create(createStudentInput: CreateStudentInput) {
        const user = await this.usersService.create({
            name: createStudentInput.name,
            surname: createStudentInput.surname,
            patronymic: createStudentInput.patronymic,
            email: createStudentInput.email,
            roleId: 1,
        });

        const student = await this.prisma.student.create({
            data: {
                id: v4(),
                userId: user.id,
                isLeader: createStudentInput.isLeader,
                isMarking: createStudentInput.isMarking,
                groupId: createStudentInput.groupId,
                subgroup: createStudentInput.subgroup,
            },
        });

        return {
            studentId: student.id,
            userId: user.id,
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
            email: user.email,
            subgroup: student.subgroup,
            isLeader: student.isLeader,
            isMarking: student.isMarking,
            groupId: student.groupId,
        };
    }

    findAll() {
        return this.prisma.student
            .findMany({
                include: {
                    user: true,
                },
            })
            .then((result) =>
                result.map((student) => ({
                    studentId: student.id,
                    userId: student.user.id,
                    name: student.user.name,
                    surname: student.user.surname,
                    patronymic: student.user.patronymic,
                    email: student.user.email,
                    subgroup: student.subgroup,
                    isLeader: student.isLeader,
                    isMarking: student.isMarking,
                    groupId: student.groupId,
                }))
            );
    }

    findOne(id: string) {
        return this.prisma.student
            .findUnique({
                where: {
                    id: id,
                },
                include: {
                    user: true,
                },
            })
            .then((student) => ({
                studentId: student.id,
                userId: student.user.id,
                name: student.user.name,
                surname: student.user.surname,
                patronymic: student.user.patronymic,
                email: student.user.email,
                subgroup: student.subgroup,
                isLeader: student.isLeader,
                isMarking: student.isMarking,
                groupId: student.groupId,
            }));
    }

    findOneByUserId(userId: string) {
        return this.prisma.student
            .findFirst({
                where: {
                    user: {
                        id: userId,
                    },
                },
                select: {
                    id: true,
                },
            })
            .then((student) => this.findOne(student.id));
    }

    findByGroupId(groupId: number) {
        return this.prisma.group
            .findUnique({
                where: {
                    id: groupId,
                },
                include: {
                    students: {
                        include: {
                            user: true,
                        },
                    },
                },
            })
            .then((result) =>
                result.students.map((student) => ({
                    studentId: student.id,
                    userId: student.user.id,
                    name: student.user.name,
                    surname: student.user.surname,
                    patronymic: student.user.patronymic,
                    email: student.user.email,
                    subgroup: student.subgroup,
                    isLeader: student.isLeader,
                    isMarking: student.isMarking,
                    groupId: student.groupId,
                }))
            );
    }

    async update(id: string, updateStudentInput: UpdateStudentInput) {
        const prevStudent = await this.prisma.student.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true,
            },
        });

        const student = await this.prisma.student.update({
            where: {
                id: id,
            },
            data: {
                groupId: updateStudentInput.groupId ?? prevStudent.groupId,
                subgroup: updateStudentInput.subgroup ?? prevStudent.subgroup,
                isLeader: updateStudentInput.isLeader ?? prevStudent.isLeader,
                isMarking: updateStudentInput.isMarking ?? prevStudent.isMarking,
            },
        });

        const user = await this.prisma.user.update({
            where: {
                id: student.userId,
            },
            data: {
                name: updateStudentInput.name ?? prevStudent.user.name,
                surname: updateStudentInput.surname ?? prevStudent.user.surname,
                patronymic: updateStudentInput.patronymic ?? prevStudent.user.patronymic,
                email: updateStudentInput.email ?? prevStudent.user.email,
            },
        });

        return {
            studentId: student.id,
            userId: user.id,
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
            email: user.email,
            subgroup: student.subgroup,
            isLeader: student.isLeader,
            isMarking: student.isMarking,
            groupId: student.groupId,
        };
    }

    async remove(id: string) {
        const student = await this.prisma.student.delete({
            where: {
                id: id,
            },
            include: {
                user: true,
            },
        });
        const resultStudent = {
            studentId: student.id,
            userId: student.user.id,
            name: student.user.name,
            surname: student.user.surname,
            patronymic: student.user.patronymic,
            email: student.user.email,
            subgroup: student.subgroup,
            isLeader: student.isLeader,
            isMarking: student.isMarking,
            groupId: student.groupId,
        };
        await this.prisma.user.delete({
            where: {
                id: resultStudent.userId,
            },
        });
        return resultStudent;
    }
}
