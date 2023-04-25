import { Module, forwardRef } from '@nestjs/common';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';

@Module({
    imports: [forwardRef(() => GroupsModule), UsersModule],
    providers: [StudentsResolver, StudentsService],
    exports: [StudentsService],
})
export class StudentsModule {}
