import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/entities/course.entity';
import { Group } from 'src/groups/entities/group.entity';
import { GroupsService } from 'src/groups/groups.service';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { LessonsService } from 'src/lessons/lessons.service';
import { Type } from 'src/types/entities/type.entity';
import { TypesService } from 'src/types/types.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Resolver(() => Subject)
export class SubjectsResolver {
    constructor(
        private readonly subjectsService: SubjectsService,
        private usersService: UsersService,
        private typesService: TypesService,
        private coursesService: CoursesService,
        private groupsService: GroupsService,
        private lessonsService: LessonsService
    ) {}

    @Mutation(() => Subject)
    createSubject(@Args('createSubjectInput') createSubjectInput: CreateSubjectInput) {
        return this.subjectsService.create(createSubjectInput);
    }

    @Query(() => [Subject], { name: 'subjects' })
    findAll() {
        return this.subjectsService.findAll();
    }

    @Query(() => Subject, { name: 'subject' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.subjectsService.findOne(id);
    }

    @Mutation(() => Subject)
    updateSubject(@Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput) {
        return this.subjectsService.update(updateSubjectInput.id, updateSubjectInput);
    }

    @Mutation(() => Subject)
    addGroup(
        @Args('subjectId', { type: () => Int }) subjectId,
        @Args('groupId', { type: () => Int }) groupId
    ) {
        return this.subjectsService.addGroup(subjectId, groupId);
    }

    @Mutation(() => Subject)
    removeSubject(@Args('id', { type: () => Int }) id: number) {
        return this.subjectsService.remove(id);
    }

    @ResolveField(() => Course)
    course(@Parent() subject: Subject) {
        return this.coursesService.findOne(subject.courseId);
    }

    @ResolveField(() => Type)
    type(@Parent() subject: Subject) {
        return this.typesService.findOne(subject.typeId);
    }

    @ResolveField(() => User)
    teacher(@Parent() subject: Subject) {
        return this.usersService.findOne(subject.teacherId);
    }

    @ResolveField(() => [Group])
    groups(@Parent() subject: Subject) {
        return this.groupsService.findBySubjectId(subject.id);
    }

    @ResolveField(() => [Lesson])
    lessons(@Parent() subject: Subject) {
        return this.lessonsService.findBySubjectId(subject.id);
    }
}
