import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateSubjectInput } from './create-subject.input';

@InputType()
export class UpdateSubjectInput extends PartialType(CreateSubjectInput) {
    @Field(() => Int)
    id: number;

    @Field(() => Int, { nullable: true })
    courseId?: number;

    @Field(() => Int, { nullable: true })
    typeId?: number;

    @Field({ nullable: true })
    teacherId?: string;

    @Field({ nullable: true })
    recurrence?: string;
}
