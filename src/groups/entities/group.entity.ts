import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Group {
    @Field(() => Int)
    id: number;

    @Field()
    number: string;

    @Field(() => Int)
    form: number;
}
