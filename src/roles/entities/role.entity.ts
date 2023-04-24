import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Role {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;
}
