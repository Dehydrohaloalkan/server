import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';
import { Subject } from 'src/subjects/entities/subject.entity';
import { SubjectsService } from 'src/subjects/subjects.service';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Resolver(() => Group)
export class GroupsResolver {
    constructor(
        private readonly groupsService: GroupsService,
        private studentsService: StudentsService,
        private subjectsService: SubjectsService
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
}
