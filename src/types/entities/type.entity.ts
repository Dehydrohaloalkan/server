import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Type {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;
}
