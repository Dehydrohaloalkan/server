import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
    imports: [AuthModule, GroupsModule],
    controllers: [LessonsController],
    providers: [LessonsService],
})
export class LessonsModule {}
