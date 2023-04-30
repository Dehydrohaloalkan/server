import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    surname: string;

    @Field({ nullable: true })
    patronymic?: string;

    @Field()
    email: string;

    @Field(() => Int)
    roleId: number;

    @Field(() => Role)
    role: Role;

    @Field(() => [Subject])
    subjects: Subject[];
}
