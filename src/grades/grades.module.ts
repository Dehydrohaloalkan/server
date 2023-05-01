import { Module, forwardRef } from '@nestjs/common';
import { LessonsModule } from 'src/lessons/lessons.module';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { StudentsModule } from 'src/students/students.module';
import { GradesResolver } from './grades.resolver';
import { GradesService } from './grades.service';

@Module({
    imports: [forwardRef(() => StudentsModule), LessonsModule, ScheduleModule],
    providers: [GradesResolver, GradesService],
    exports: [GradesService],
})
export class GradesModule {}
