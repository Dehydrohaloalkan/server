import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { studentCreateDto, studentDeleteDto, studentUpdateDto } from './dto';

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
    async createStudent(data: studentCreateDto) {
        return await this.prisma.student.create({ data: data });
    }
    async updateStudent(params: studentUpdateDto) {
        return await this.prisma.student.update({
            where: params.where,
            data: params.data,
        });
    }
    async deleteStudent(where: studentDeleteDto) {
        return await this.prisma.student.delete({ where: where });
    }
}
