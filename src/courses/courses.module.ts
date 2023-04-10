import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule {}
