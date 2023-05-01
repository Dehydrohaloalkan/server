import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@ObjectType()
export class Schedule {
    @Field(() => Int)
    week: number;

    @Field(() => Int, { nullable: true })
    groupId?: number;

    @Field({ nullable: true })
    teacherId?: string;

    @Field(() => Int, { nullable: true })
    subjectId?: number;

    @Field(() => [Lesson])
    lessons: Lesson[];
}
