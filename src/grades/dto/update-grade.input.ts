import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateGradeInput } from './create-grade.input';

@InputType()
export class UpdateGradeInput extends PartialType(CreateGradeInput) {
    @Field()
    studentId: string;

    @Field()
    lessonId: string;

    @Field(() => Int)
    value: number;
}
