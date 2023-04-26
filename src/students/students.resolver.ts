import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
        private groupsService: GroupsService
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

    @ResolveField(() => Group)
    group(@Parent() student: Student) {
        return this.groupsService.findByStudentId(student.studentId);
    }

    @Mutation(() => Student)
    updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
        return this.studentsService.update(updateStudentInput.id, updateStudentInput);
    }

    @Mutation(() => Student)
    removeStudent(@Args('id') id: string) {
        return this.studentsService.remove(id);
    }
}
