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
        throw new Error('Method not implemented.');
    }
    async updateStudent(params: studentUpdateDto) {
        throw new Error('Method not implemented.');
    }
    async deleteStudent(where: studentDeleteDto) {
        throw new Error('Method not implemented.');
    }
}
