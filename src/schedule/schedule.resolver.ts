import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Schedule } from './entities/schedule.entity';
import { ScheduleService } from './schedule.service';

@Resolver(() => Schedule)
export class ScheduleResolver {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Query(() => Schedule, { name: 'groupSchedule' })
    getGroupSchedule(
        @Args('week', { type: () => Int }) week: number,
        @Args('groupId', { type: () => Int }) groupId: number
    ) {
        return this.scheduleService.getGroupSchedule(week, groupId);
    }

    @Query(() => Schedule, { name: 'teacherSchedule' })
    getTeacherSchedule(
        @Args('week', { type: () => Int }) week: number,
        @Args('teacherId') teacherId: string
    ) {
        return this.scheduleService.getTeacherSchedule(week, teacherId);
    }

    @ResolveField(() => [Lesson])
    lessons(@Parent() schedule: Schedule) {
        return this.scheduleService.getLessons(schedule);
    }
}
