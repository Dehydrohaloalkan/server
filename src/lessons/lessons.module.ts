import { Module, forwardRef } from '@nestjs/common';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { UsersModule } from 'src/users/users.module';
import { LessonsResolver } from './lessons.resolver';
import { LessonsService } from './lessons.service';

@Module({
    imports: [UsersModule, forwardRef(() => SubjectsModule)],
    providers: [LessonsResolver, LessonsService],
    exports: [LessonsService],
})
export class LessonsModule {}
