import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    create(createCourseInput: CreateCourseInput) {
        return this.prisma.course.create({
            data: {
                name: createCourseInput.name,
                form: createCourseInput.form,
                startDate: this.addOneDay(createCourseInput.startDate),
                endDate: this.addOneDay(createCourseInput.endDate),
            },
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
        // TODO fix date
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

    private addOneDay(date) {
        const tomorrow = new Date(date.getTime());
        tomorrow.setDate(date.getDate() + 1);
        return tomorrow;
    }
}
