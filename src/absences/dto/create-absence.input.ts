import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAbsenceInput {
    @Field()
    studentId: string;

    @Field()
    lessonId: string;
}
