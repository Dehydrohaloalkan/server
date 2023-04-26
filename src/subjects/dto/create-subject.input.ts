import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSubjectInput {
    @Field(() => Int)
    courseId: number;

    @Field(() => Int)
    typeId: number;

    @Field()
    teacherId: string;

    @Field()
    recurrence: string;
}
