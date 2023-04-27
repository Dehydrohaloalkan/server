import { Module, forwardRef } from '@nestjs/common';
import { LessonsModule } from 'src/lessons/lessons.module';
import { StudentsModule } from 'src/students/students.module';
import { AbsencesResolver } from './absences.resolver';
import { AbsencesService } from './absences.service';

@Module({
    imports: [forwardRef(() => StudentsModule), LessonsModule],
    providers: [AbsencesResolver, AbsencesService],
    exports: [AbsencesService],
})
export class AbsencesModule {}
