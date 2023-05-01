import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { LessonsService } from 'src/lessons/lessons.service';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';
import { Grade } from './entities/grade.entity';
import { GradesService } from './grades.service';

@Resolver(() => Grade)
export class GradesResolver {
    constructor(
        private readonly gradesService: GradesService,
        private studentsService: StudentsService,
        private lessonService: LessonsService
    ) {}

    @Mutation(() => Grade)
    createGrade(@Args('createGradeInput') createGradeInput: CreateGradeInput) {
        return this.gradesService.create(createGradeInput);
    }

    @Query(() => [Grade], { name: 'grades' })
    findAll() {
        return this.gradesService.findAll();
    }

    @Query(() => Grade, { name: 'grade' })
    findOne(@Args('studentId') studentId: string, @Args('lessonId') lessonId: string) {
        return this.gradesService.findOne(studentId, lessonId);
    }

    @Mutation(() => Grade)
    updateGrade(@Args('updateGradeInput') updateGradeInput: UpdateGradeInput) {
        return this.gradesService.update(updateGradeInput);
    }

    @Mutation(() => Grade)
    removeGrade(@Args('studentId') studentId: string, @Args('lessonId') lessonId: string) {
        return this.gradesService.remove(studentId, lessonId);
    }

    @Mutation(() => Grade)
    setGrade(
        @Args('studentId') studentId: string,
        @Args('lessonId') lessonId: string,
        @Args('value', { type: () => Int }) value: number
    ) {
        return this.gradesService.setGrade(studentId, lessonId, value);
    }

    @ResolveField(() => Student)
    student(@Parent() grade: Grade) {
        return this.studentsService.findOne(grade.studentId);
    }

    @ResolveField(() => Lesson)
    lesson(@Parent() grade: Grade) {
        return this.lessonService.findOne(grade.lessonId);
    }
}
