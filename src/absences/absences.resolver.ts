import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { LessonsService } from 'src/lessons/lessons.service';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';
import { AbsencesService } from './absences.service';
import { CreateAbsenceInput } from './dto/create-absence.input';
import { Absence } from './entities/absence.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Resolver(() => Absence)
export class AbsencesResolver {
    constructor(
        private readonly absencesService: AbsencesService,
        private studentsService: StudentsService,
        private lessonService: LessonsService
    ) {}

    @Mutation(() => Absence)
    createAbsence(@Args('createAbsenceInput') createAbsenceInput: CreateAbsenceInput) {
        return this.absencesService.create(createAbsenceInput);
    }

    @Query(() => [Absence], { name: 'absences' })
    findAll() {
        return this.absencesService.findAll();
    }

    @Query(() => Absence, { name: 'absence' })
    findOne(@Args('studentId') studentId: string, @Args('lessonId') lessonId: string) {
        return this.absencesService.findOne(studentId, lessonId);
    }

    @Mutation(() => Absence)
    removeAbsence(@Args('studentId') studentId: string, @Args('lessonId') lessonId: string) {
        return this.absencesService.remove(studentId, lessonId);
    }

    @ResolveField(() => Student)
    student(@Parent() absence: Absence) {
        return this.studentsService.findOne(absence.studentId);
    }

    @ResolveField(() => Lesson)
    lesson(@Parent() absence: Absence) {
        return this.lessonService.findOne(absence.lessonId);
    }
}
