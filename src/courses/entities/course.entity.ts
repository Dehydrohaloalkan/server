import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Course {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field(() => Date)
    startDate: string;

    @Field(() => Date)
    endDate: string;

    @Field(() => Int)
    form: number;
}
