import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Absence } from 'src/absences/entities/absence.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
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

    @Field(() => Schedule)
    schedule: Schedule;

    @Field(() => [Absence])
    absences: Absence[];
}
