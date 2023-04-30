import { Module, forwardRef } from '@nestjs/common';
import { LessonsModule } from 'src/lessons/lessons.module';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { StudentsModule } from 'src/students/students.module';
import { AbsencesResolver } from './absences.resolver';
import { AbsencesService } from './absences.service';

@Module({
    imports: [forwardRef(() => StudentsModule), LessonsModule, ScheduleModule],
    providers: [AbsencesResolver, AbsencesService],
    exports: [AbsencesService],
})
export class AbsencesModule {}
