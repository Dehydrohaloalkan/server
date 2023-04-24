import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Resolver(() => Role)
export class RolesResolver {
    constructor(private readonly rolesService: RolesService) {}

    @Query(() => [Role], { name: 'roles' })
    findAll() {
        return this.rolesService.findAll();
    }

    @Query(() => Role, { name: 'role' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.rolesService.findOne(id);
    }
}
