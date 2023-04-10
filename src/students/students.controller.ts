import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { studentCreateDto, studentDeleteDto, studentUpdateDto } from './dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(private studentsService: StudentsService) {}

    @Get()
    async getAll() {
        return await this.studentsService.getAllStudents();
    }

    @Post()
    async create(@Body() data: studentCreateDto) {
        return await this.studentsService.createStudent(data);
    }

    @Patch()
    async update(@Body() params: studentUpdateDto) {
        return await this.studentsService.updateStudent(params);
    }

    @Delete()
    async delete(@Body() where: studentDeleteDto) {
        return await this.studentsService.deleteStudent(where);
    }
}
