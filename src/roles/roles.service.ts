import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.user_role.findMany();
    }

    findOne(id: number) {
        return this.prisma.user_role.findUnique({
            where: {
                id: id,
            },
        });
    }
}
