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
                startDate: this.notAddOneDay(createCourseInput.startDate),
                endDate: this.notAddOneDay(createCourseInput.endDate),
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
        // TODO Add subject updates
        return this.prisma.course.update({
            where: {
                id: id,
            },
            data: {
                name: updateCourseInput.name,
                startDate: this.notAddOneDay(updateCourseInput.startDate),
                endDate: this.notAddOneDay(updateCourseInput.endDate),
                form: updateCourseInput.form,
            },
        });
    }

    remove(id: number) {
        return this.prisma.course.delete({
            where: {
                id: id,
            },
        });
    }

    private notAddOneDay(date) {
        const tomorrow = new Date(date.getTime());
        tomorrow.setDate(date.getDate());
        return tomorrow;
    }
}
