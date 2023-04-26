import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

@ObjectType()
export class Group {
    @Field(() => Int)
    id: number;

    @Field()
    number: string;

    @Field(() => Int)
    form: number;

    @Field(() => [Student])
    students: Student[];

    @Field(() => [Subject])
    subjects: Subject[];
}
