import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field()
    id: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    surname?: string;

    @Field({ nullable: true })
    patronymic?: string;

    @Field({ nullable: true })
    email?: string;

    @Field(() => Int, { nullable: true })
    role_id?: number;
}
