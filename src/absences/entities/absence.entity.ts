import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Student } from 'src/students/entities/student.entity';

@ObjectType()
export class Absence {
    @Field()
    studentId: string;

    @Field()
    lessonId: string;

    @Field(() => Int)
    hours: number;

    @Field(() => Student)
    student: Student;

    @Field(() => Lesson)
    lesson: Lesson;
}
