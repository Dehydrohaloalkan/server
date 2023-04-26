import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';

@Injectable()
export class SubjectsService {
    constructor(private prisma: PrismaService) {}

    create(createSubjectInput: CreateSubjectInput) {
        // TODO
        return 'This action adds a new subject';
    }

    findAll() {
        return this.prisma.subject.findMany();
    }

    findOne(id: number) {
        return this.prisma.subject.findUnique({
            where: {
                id: id,
            },
        });
    }

    findByGroupId(id: number) {
        return this.prisma.subject_group
            .findMany({
                where: {
                    groupId: id,
                },
                include: {
                    subject: true,
                },
            })
            .then((result) =>
                result.map((subjectGroup) => ({
                    ...subjectGroup.subject,
                }))
            );
    }

    update(id: number, updateSubjectInput: UpdateSubjectInput) {
        // TODO
        return `This action updates a #${id} subject`;
    }

    remove(id: number) {
        // TODO
        return `This action removes a #${id} subject`;
    }
}
