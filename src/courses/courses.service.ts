import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    create(createCourseInput: CreateCourseInput) {
        return this.prisma.course.create({
            data: createCourseInput,
        });
    }

    findAll() {
        return this.prisma.course.findMany();
    }

    findOne(id: number) {
        return this.prisma.course.findUnique({
            where: {
                id: id,
            },
        });
    }

    update(id: number, updateCourseInput: UpdateCourseInput) {
        return this.prisma.course.update({
            where: {
                id: id,
            },
            data: updateCourseInput,
        });
    }

    remove(id: number) {
        return this.prisma.course.delete({
            where: {
                id: id,
            },
        });
    }
}
