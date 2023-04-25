import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCourseInput } from './create-course.input';

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
    @Field(() => Int)
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field(() => Date, { nullable: true })
    startDate?: string;

    @Field(() => Date, { nullable: true })
    endDate?: string;

    @Field(() => Int, { nullable: true })
    form?: number;
}
