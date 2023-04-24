import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field()
    name: string;

    @Field()
    surname: string;

    @Field({ nullable: true })
    patronymic?: string;

    @Field()
    email: string;

    @Field(() => Int)
    role_id: number;
}
