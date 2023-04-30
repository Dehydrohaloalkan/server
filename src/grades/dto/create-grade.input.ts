import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGradeInput {
    @Field()
    studentId: string;

    @Field()
    lessonId: string;

    @Field(() => Int)
    value: number;
}
