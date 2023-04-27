import { Module } from '@nestjs/common';
import { LessonsModule } from 'src/lessons/lessons.module';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';

@Module({
    imports: [LessonsModule],
    providers: [ScheduleResolver, ScheduleService],
    exports: [ScheduleService],
})
export class ScheduleModule {}
