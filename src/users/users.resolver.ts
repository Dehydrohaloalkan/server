import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { SubjectsService } from 'src/subjects/subjects.service';
import { RolesService } from '../roles/roles.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
        private readonly subjectsService: SubjectsService
    ) {}

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.usersService.create(createUserInput);
    }

    @Query(() => [User], { name: 'users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Query(() => User, { name: 'user' })
    findOne(@Args('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Query(() => [User], { name: 'teachers' })
    findTeachers() {
        return this.usersService.findTeachers();
    }

    @Query(() => [User], { name: 'admins' })
    findAdmins() {
        return this.usersService.findAdmins();
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.usersService.update(updateUserInput.id, updateUserInput);
    }

    @Mutation(() => User)
    removeUser(@Args('id') id: string) {
        return this.usersService.remove(id);
    }

    @ResolveField(() => Role)
    role(@Parent() user: User) {
        return this.rolesService.findOne(user.roleId);
    }

    @ResolveField(() => [Subject])
    subjects(@Parent() user: User) {
        return this.subjectsService.findByTeacherId(user.id);
    }
}
