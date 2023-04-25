import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
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
    groupId?: number;

    @Field(() => Boolean, { nullable: true })
    subgroup?: boolean;

    @Field(() => Boolean, { nullable: true })
    isLeader?: boolean;

    @Field(() => Boolean, { nullable: true })
    isMarking?: boolean;
}
