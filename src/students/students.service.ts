import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import { StudentCreateDto, StudentDeleteDto, StudentUpdateDto } from './dto';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) {}

    async getAllStudents() {
        const students = await this.prisma.student.findMany({
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
                        user_role: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                group: {
                    select: {
                        id: true,
                        number: true,
                        form: true,
                    },
                },
            },
        });

        return students;
    }
    async createStudent(data: StudentCreateDto) {
        return await this.prisma.student.create({
            data: {
                id: v4(),
                ...data,
            },
        });
    }
    async updateStudent(params: StudentUpdateDto) {
        return await this.prisma.student.update({
            where: params.where,
            data: params.data,
        });
    }
    async deleteStudent(where: StudentDeleteDto) {
        return await this.prisma.student.delete({ where });
    }
}
