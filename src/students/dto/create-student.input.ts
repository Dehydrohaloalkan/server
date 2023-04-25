import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
    @Field()
    name: string;

    @Field()
    surname: string;

    @Field({ nullable: true })
    patronymic?: string;

    @Field()
    email: string;

    @Field(() => Int)
    groupId: number;

    @Field(() => Boolean)
    subgroup: boolean;

    @Field(() => Boolean)
    isLeader: boolean;

    @Field(() => Boolean)
    isMarking: boolean;
}
