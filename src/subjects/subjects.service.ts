import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectCreateDto, SubjectDeleteDto, SubjectUpdateDto } from './dto';

@Injectable()
export class SubjectsService {
    constructor(private prisma: PrismaService) {}

    async getAllSubjects() {
        return await this.prisma.subject.findMany({
            select: {
                id: true,
                recurrence_json: true,
                course: {
                    select: {
                        id: true,
                        name: true,
                        start_date: true,
                        end_date: true,
                        form: true,
                    },
                },
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        patronymic: true,
                    },
                },
                type: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }
    async createSubject(data: SubjectCreateDto) {
        return await this.prisma.subject.create({ data });
    }
    async updateSubject(params: SubjectUpdateDto) {
        return await this.prisma.subject.update({
            where: params.where,
            data: params.data,
        });
    }
    async deleteSubject(where: SubjectDeleteDto) {
        return await this.prisma.subject.delete({ where });
    }
}
