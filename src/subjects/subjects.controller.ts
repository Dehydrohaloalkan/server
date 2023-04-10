import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectCreateDto, SubjectDeleteDto, SubjectUpdateDto } from './dto';

@Controller('subjects')
export class SubjectsController {
    constructor(private subjectsService: SubjectsService) {}

    @Get()
    async getAll() {
        return await this.subjectsService.getAllSubjects();
    }

    @Post()
    async create(@Body() data: SubjectCreateDto) {
        return await this.subjectsService.createSubject(data);
    }

    @Patch()
    async update(@Body() params: SubjectUpdateDto) {
        return await this.subjectsService.updateSubject(params);
    }

    @Delete()
    async delete(@Body() where: SubjectDeleteDto) {
        return await this.subjectsService.deleteSubject(where);
    }
}
