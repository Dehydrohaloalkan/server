import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Subject } from 'rxjs';
import { SubjectsService } from 'src/subjects/subjects.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Lesson } from './entities/lesson.entity';
import { LessonsService } from './lessons.service';

@Resolver(() => Lesson)
export class LessonsResolver {
    constructor(
        private readonly lessonsService: LessonsService,
        private subjectsService: SubjectsService,
        private usersService: UsersService
    ) {}

    @Query(() => [Lesson], { name: 'lessons' })
    findAll() {
        return this.lessonsService.findAll();
    }

    @Query(() => Lesson, { name: 'lesson' })
    findOne(@Args('id') id: string) {
        return this.lessonsService.findOne(id);
    }

    @ResolveField(() => User)
    teacher(@Parent() lesson: Lesson) {
        return this.usersService.findOne(lesson.teacherId);
    }

    @ResolveField(() => Subject)
    subject(@Parent() lesson: Lesson) {
        return this.subjectsService.findOne(lesson.subjectId);
    }
}
