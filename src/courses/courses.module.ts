import { Module } from '@nestjs/common';
import { CoursesResolver } from './courses.resolver';
import { CoursesService } from './courses.service';

@Module({
    providers: [CoursesResolver, CoursesService],
    exports: [CoursesService],
})
export class CoursesModule {}
