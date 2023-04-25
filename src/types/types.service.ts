import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypesService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.subject_type.findMany();
    }

    findOne(id: number) {
        return this.prisma.subject_type.findUnique({
            where: {
                id: id,
            },
        });
    }
}
