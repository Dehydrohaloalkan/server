import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
    @Field()
    number: string;

    @Field(() => Int)
    form: number;
}
