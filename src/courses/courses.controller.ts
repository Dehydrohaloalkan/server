import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseCreateDto, CourseDeleteDto, CourseUpdateDto } from './dto';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) {}

    @Get()
    async getAll() {
        return await this.coursesService.getAllCourses();
    }

    @Post()
    async create(@Body() data: CourseCreateDto) {
        return await this.coursesService.createCourse(data);
    }

    @Patch()
    async update(@Body() params: CourseUpdateDto) {
        return await this.coursesService.updateCourse(params);
    }

    @Delete()
    async delete(@Body() where: CourseDeleteDto) {
        return await this.coursesService.deleteCourse(where);
    }
}
