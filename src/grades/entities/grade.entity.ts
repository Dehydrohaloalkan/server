import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Student } from 'src/students/entities/student.entity';

@ObjectType()
export class Grade {
    @Field()
    studentId: string;

    @Field()
    lessonId: string;

    @Field(() => Int)
    value: number;

    @Field(() => Student)
    student: Student;

    @Field(() => Lesson)
    lesson: Lesson;
}
