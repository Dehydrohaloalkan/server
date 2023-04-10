import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubjectTypesService } from './subjectTypes.service';
import { SubjectTypeCreateDto } from './dto';

@Controller('subject_types')
export class SubjectTypesController {
    constructor(private subjectTypesService: SubjectTypesService) {}

    @Get()
    async getAll() {
        return await this.subjectTypesService.getAllSubjectTypes();
    }

    @Post()
    async create(@Body() data: SubjectTypeCreateDto) {
        return await this.subjectTypesService.createSubjectType(data);
    }
}
