import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserId } from 'src/auth/decorators/getCurrentUserId.decorator';
import { SubjectCreateDto, SubjectDeleteDto, SubjectUpdateDto, subjectAddGroupDto } from './dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
    constructor(private subjectsService: SubjectsService) {}

    @Get()
    async getAll() {
        return await this.subjectsService.getAllSubjects();
    }

    @Post('add_groups')
    async addGroupsToSubject(@Body() data: subjectAddGroupDto) {
        return await this.subjectsService.addGroupsToSubject(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('info')
    async getSubjectsInfoByUser(@GetCurrentUserId() userId) {
        return await this.subjectsService.getSubjectsInfoByUser(userId);
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
