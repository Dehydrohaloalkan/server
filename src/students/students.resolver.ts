import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AbsencesService } from 'src/absences/absences.service';
import { Absence } from 'src/absences/entities/absence.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { GradesService } from 'src/grades/grades.service';
import { Group } from 'src/groups/entities/group.entity';
import { GroupsService } from '../groups/groups.service';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

@Resolver(() => Student)
export class StudentsResolver {
    constructor(
        private readonly studentsService: StudentsService,
        private groupsService: GroupsService,
        private absencesService: AbsencesService,
        private gradesService: GradesService
    ) {}

    @Mutation(() => Student)
    createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
        return this.studentsService.create(createStudentInput);
    }

    @Query(() => [Student], { name: 'students' })
    findAll() {
        return this.studentsService.findAll();
    }

    @Query(() => Student, { name: 'student' })
    findOne(@Args('id') id: string) {
        return this.studentsService.findOne(id);
    }

    @Query(() => Student, { name: 'studentByUser' })
    findByUserId(@Args('id') id: string) {
        return this.studentsService.findOneByUserId(id);
    }

    @Mutation(() => Student)
    updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
        return this.studentsService.update(updateStudentInput.studentId, updateStudentInput);
    }

    @Mutation(() => Student)
    removeStudent(@Args('id') id: string) {
        return this.studentsService.remove(id);
    }

    @ResolveField(() => Group)
    group(@Parent() student: Student) {
        return this.groupsService.findByStudentId(student.studentId);
    }

    @ResolveField(() => [Absence])
    absences(@Parent() student: Student) {
        return this.absencesService.findByStudentId(student.studentId);
    }

    @ResolveField(() => [Grade])
    grades(@Parent() student: Student) {
        return this.gradesService.findByStudentId(student.studentId);
    }
}
