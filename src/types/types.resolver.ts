import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Type } from './entities/type.entity';
import { TypesService } from './types.service';

@Resolver(() => Type)
export class TypesResolver {
    constructor(private readonly typesService: TypesService) {}

    @Query(() => [Type], { name: 'types' })
    findAll() {
        return this.typesService.findAll();
    }

    @Query(() => Type, { name: 'type' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.typesService.findOne(id);
    }
}
