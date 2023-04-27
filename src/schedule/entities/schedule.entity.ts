import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@ObjectType()
export class Schedule {
    @Field(() => Int)
    week: number;

    @Field(() => Int)
    groupId: number;

    @Field()
    teacherId: string;

    @Field(() => [Lesson])
    lessons: Lesson[];
}
