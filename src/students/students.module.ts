import { Module, forwardRef } from '@nestjs/common';
import { AbsencesModule } from 'src/absences/absences.module';
import { GradesModule } from 'src/grades/grades.module';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        forwardRef(() => GroupsModule),
        forwardRef(() => AbsencesModule),
        forwardRef(() => GradesModule),
    ],
    providers: [StudentsResolver, StudentsService],
    exports: [StudentsService],
})
export class StudentsModule {}
