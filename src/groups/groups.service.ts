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

    findByStudentId(studentId: string) {
        return this.prisma.group.findFirst({
            where: {
                students: {
                    some: {
                        id: studentId,
                    },
                },
            },
        });
    }

    findBySubjectId(id: number) {
        return this.prisma.subject_group
            .findMany({
                where: {
                    subjectId: id,
                },
                include: {
                    group: true,
                },
            })
            .then((result) =>
                result.map((subjectGroup) => ({
                    ...subjectGroup.group,
                }))
            );
    }

    update(id: number, updateGroupInput: UpdateGroupInput) {
        return this.prisma.group.update({
            where: {
                id: id,
            },
            data: {
                number: updateGroupInput.number,
                form: updateGroupInput.form,
            },
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
