import { Field, ObjectType } from '@nestjs/graphql';
import { LoginUserData } from './login-user-data';

@ObjectType()
export class LoginResponse {
    @Field()
    accessToken: string;

    @Field()
    user: LoginUserData;
}
