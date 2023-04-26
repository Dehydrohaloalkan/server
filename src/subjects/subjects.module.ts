import { Module, forwardRef } from '@nestjs/common';
import { CoursesModule } from 'src/courses/courses.module';
import { GroupsModule } from 'src/groups/groups.module';
import { TypesModule } from 'src/types/types.module';
import { UsersModule } from 'src/users/users.module';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectsService } from './subjects.service';

@Module({
    imports: [UsersModule, TypesModule, CoursesModule, forwardRef(() => GroupsModule)],
    providers: [SubjectsResolver, SubjectsService],
    exports: [SubjectsService],
})
export class SubjectsModule {}
