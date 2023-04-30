import { Module, forwardRef } from '@nestjs/common';
import { CoursesModule } from 'src/courses/courses.module';
import { GroupsModule } from 'src/groups/groups.module';
import { LessonsModule } from 'src/lessons/lessons.module';
import { TypesModule } from 'src/types/types.module';
import { UsersModule } from 'src/users/users.module';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectsService } from './subjects.service';

@Module({
    imports: [
        TypesModule,
        CoursesModule,
        forwardRef(() => UsersModule),
        forwardRef(() => LessonsModule),
        forwardRef(() => GroupsModule),
    ],
    providers: [SubjectsResolver, SubjectsService],
    exports: [SubjectsService],
})
export class SubjectsModule {}
