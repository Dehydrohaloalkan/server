import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { StudentCreateDto, StudentDeleteDto, StudentUpdateDto } from './dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(private studentsService: StudentsService) {}

    @Get()
    async getAll() {
        return await this.studentsService.getAllStudents();
    }

    @Post()
    async create(@Body() data: StudentCreateDto) {
        return await this.studentsService.createStudent(data);
    }

    @Patch()
    async update(@Body() params: StudentUpdateDto) {
        return await this.studentsService.updateStudent(params);
    }

    @Delete()
    async delete(@Body() where: StudentDeleteDto) {
        return await this.studentsService.deleteStudent(where);
    }
}
