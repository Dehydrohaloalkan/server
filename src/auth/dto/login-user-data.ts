import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserData {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    surname: string;

    @Field({ nullable: true })
    patronymic?: string;

    @Field()
    role: string;
}
