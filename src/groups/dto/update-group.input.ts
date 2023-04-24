import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateGroupInput } from './create-group.input';

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
    @Field(() => Int)
    id: number;

    @Field({ nullable: true })
    number?: string;

    @Field(() => Int, { nullable: true })
    form?: number;
}
