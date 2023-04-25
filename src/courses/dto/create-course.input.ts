import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
    @Field()
    name: string;

    @Field(() => Date)
    startDate: string;

    @Field(() => Date)
    endDate: string;

    @Field(() => Int)
    form: number;
}
