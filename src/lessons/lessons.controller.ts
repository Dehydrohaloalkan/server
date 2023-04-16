import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserId } from 'src/auth/decorators/getCurrentUserId.decorator';
import { LessonsUpdateDto } from './dto/lessonsUpdate.dto';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
    constructor(private lessonsService: LessonsService) {}

    @Get()
    async getAll() {
        return await this.lessonsService.getAllLessons();
    }

    @Get('absences')
    async getAllAbsences() {
        return await this.lessonsService.getAllAbsences();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('absences/student')
    async getStudentAbsences(@GetCurrentUserId() userId: string) {
        return await this.lessonsService.getStudentAbsences(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('absences/group')
    async getGroupAbsences(@GetCurrentUserId() userId: string) {
        return await this.lessonsService.getGroupAbsences(userId);
    }

    @Get('grades')
    async getAllGrades() {
        return await this.lessonsService.getAllGrades();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('grades/student')
    async getStudentGrades(@GetCurrentUserId() userId: string) {
        return await this.lessonsService.getStudentGrades(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('grades/group')
    async getGroupGrades(@GetCurrentUserId() userId: string) {
        return await this.lessonsService.getGroupGrades(userId);
    }

    @Patch()
    async create(@Body() params: LessonsUpdateDto) {
        return await this.lessonsService.updateLesson(params);
    }
}
