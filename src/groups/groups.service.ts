import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';

@Injectable()
export class GroupsService {
    constructor(private prisma: PrismaService) {}

    create(createGroupInput: CreateGroupInput) {
        return this.prisma.group.create({
            data: createGroupInput,
        });
    }

    findAll() {
        return this.prisma.group.findMany();
    }

    findOne(id: number) {
        return this.prisma.group.findUnique({
            where: {
                id: id,
            },
        });
    }

    update(id: number, updateGroupInput: UpdateGroupInput) {
        return this.prisma.group.update({
            where: {
                id: id,
            },
            data: updateGroupInput,
        });
    }

    remove(id: number) {
        return this.prisma.group.delete({
            where: {
                id: id,
            },
        });
    }
}
