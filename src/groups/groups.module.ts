import { Module, forwardRef } from '@nestjs/common';
import { GroupsResolver } from './groups.resolver';
import { GroupsService } from './groups.service';
import { StudentsModule } from 'src/students/students.module';

@Module({
    imports: [forwardRef(() => StudentsModule)],
    providers: [GroupsResolver, GroupsService],
    exports: [GroupsService],
})
export class GroupsModule {}
