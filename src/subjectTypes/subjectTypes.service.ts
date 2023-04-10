import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectTypeCreateDto } from './dto';

@Injectable()
export class SubjectTypesService {
    constructor(private prisma: PrismaService) {}

    async getAllSubjectTypes() {
        return await this.prisma.subject_type.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }

    async createSubjectType(data: SubjectTypeCreateDto) {
        return await this.prisma.subject_type.create({
            data: data,
        });
    }
}
