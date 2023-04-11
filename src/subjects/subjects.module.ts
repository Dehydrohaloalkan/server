import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';

import { Module } from '@nestjs/common';
import { GroupsModule } from 'src/groups/groups.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [GroupsModule, AuthModule],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule {}
