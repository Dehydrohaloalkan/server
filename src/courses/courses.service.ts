import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CourseCreateDto, CourseDeleteDto, CourseUpdateDto } from './dto';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    async getAllCourses() {
        return await this.prisma.course.findMany({
            select: {
                id: true,
                name: true,
                start_date: true,
                end_date: true,
                form: true,
            },
        });
    }

    async createCourse(data: CourseCreateDto) {
        return await this.prisma.course.create({
            data: {
                name: data.name,
                form: data.form,
                start_date: new Date(data.start_date),
                end_date: new Date(data.end_date),
            },
        });
    }
    async updateCourse(params: CourseUpdateDto) {
        return await this.prisma.course.update({
            where: params.where,
            data: params.data,
        });
    }
    async deleteCourse(where: CourseDeleteDto) {
        return await this.prisma.course.delete({ where });
    }
}
