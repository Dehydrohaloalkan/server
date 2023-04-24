import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;
}
