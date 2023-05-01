import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AbsencesService } from 'src/absences/absences.service';
import { Absence } from 'src/absences/entities/absence.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { ScheduleService } from 'src/schedule/schedule.service';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';
import { Subject } from 'src/subjects/entities/subject.entity';
import { SubjectsService } from 'src/subjects/subjects.service';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';
import { GroupsService } from './groups.service';
import { GradesService } from 'src/grades/grades.service';
import { Grade } from 'src/grades/entities/grade.entity';

@Resolver(() => Group)
export class GroupsResolver {
    constructor(
        private readonly groupsService: GroupsService,
        private studentsService: StudentsService,
        private subjectsService: SubjectsService,
        private scheduleService: ScheduleService,
        private absencesService: AbsencesService,
        private gradesService: GradesService
    ) {}

    @Mutation(() => Group)
    createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
        return this.groupsService.create(createGroupInput);
    }

    @Query(() => [Group], { name: 'groups' })
    findAll() {
        return this.groupsService.findAll();
    }

    @Query(() => Group, { name: 'group' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.groupsService.findOne(id);
    }

    @Mutation(() => Group)
    updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
        return this.groupsService.update(updateGroupInput.id, updateGroupInput);
    }

    @Mutation(() => Group)
    removeGroup(@Args('id', { type: () => Int }) id: number) {
        return this.groupsService.remove(id);
    }

    @ResolveField(() => [Student])
    students(@Parent() group: Group) {
        return this.studentsService.findByGroupId(group.id);
    }

    @ResolveField(() => [Subject])
    subjects(@Parent() group: Group) {
        return this.subjectsService.findByGroupId(group.id);
    }

    @ResolveField(() => Schedule)
    schedule(@Parent() group: Group, @Args('week', { type: () => Int }) week: number) {
        return this.scheduleService.getGroupSchedule(week, group.id);
    }

    @ResolveField(() => Schedule)
    subjectSchedule(
        @Parent() group: Group,
        @Args('week', { type: () => Int }) week: number,
        @Args('subjectId', { type: () => Int }) subjectId: number
    ) {
        return this.scheduleService.getSubjectGroupSchedule(week, group.id, subjectId);
    }

    @ResolveField(() => [Absence])
    absences(@Parent() group: Group, @Args('week', { type: () => Int }) week: number) {
        return this.absencesService.getGroupAbsences(group.id, week);
    }

    @ResolveField(() => [Absence])
    subjectAbsences(
        @Parent() group: Group,
        @Args('week', { type: () => Int }) week: number,
        @Args('subjectId', { type: () => Int }) subjectId: number
    ) {
        return this.absencesService.getSubjectGroupAbsences(group.id, week, subjectId);
    }

    @ResolveField(() => [Grade])
    grades(@Parent() group: Group) {
        return this.gradesService.getGroupGrades(group.id);
    }

    @ResolveField(() => [Grade])
    subjectGrades(
        @Parent() group: Group,
        @Args('week', { type: () => Int }) week: number,
        @Args('subjectId', { type: () => Int }) subjectId: number
    ) {
        return this.gradesService.getSubjectGroupGrades(group.id, week, subjectId);
    }
}
