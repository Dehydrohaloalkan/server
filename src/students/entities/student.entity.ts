import { Field, ObjectType } from '@nestjs/graphql';
import { Absence } from 'src/absences/entities/absence.entity';
import { Group } from 'src/groups/entities/group.entity';

@ObjectType()
export class Student {
    @Field()
    studentId: string;

    @Field()
    userId: string;

    @Field()
    name: string;

    @Field()
    surname: string;

    @Field({ nullable: true })
    patronymic?: string;

    @Field()
    email: string;

    @Field(() => Boolean)
    subgroup: boolean;

    @Field(() => Boolean)
    isLeader: boolean;

    @Field(() => Boolean)
    isMarking: boolean;

    @Field(() => Group)
    group: Group;

    @Field(() => [Absence])
    absences: Absence[];
}
