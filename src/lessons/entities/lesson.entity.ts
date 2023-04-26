import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Lesson {
    @Field()
    id: string;

    @Field(() => Date)
    startTime: Date;

    @Field(() => Date)
    endTime: Date;

    @Field(() => Int)
    subjectId: number;

    @Field()
    location: string;

    @Field()
    teacherId: string;

    @Field(() => Subject)
    subject: Subject;

    @Field(() => User)
    teacher: User;
}
