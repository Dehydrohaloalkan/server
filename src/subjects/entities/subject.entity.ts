import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Group } from 'src/groups/entities/group.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Type } from 'src/types/entities/type.entity';
import { User } from 'src/users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

@ObjectType()
export class Subject {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    courseId: number;

    @Field(() => Int)
    typeId: number;

    @Field()
    teacherId: string;

    @Field()
    recurrence: string;

    @Field(() => Course)
    course: Course;

    @Field(() => User)
    teacher: User;

    @Field(() => Type)
    type: Type;

    @Field(() => [Group])
    groups: Group[];

    @Field(() => [Lesson])
    lessons: Lesson[];
}
