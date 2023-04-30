import { Module, forwardRef } from '@nestjs/common';
import { AbsencesModule } from 'src/absences/absences.module';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { StudentsModule } from 'src/students/students.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';

@Module({
    imports: [
        ScheduleModule,
        AbsencesModule,
        forwardRef(() => StudentsModule),
        forwardRef(() => SubjectsModule),
    ],
    providers: [GroupsResolver, GroupsService],
    exports: [GroupsService],
})
export class GroupsModule {}
