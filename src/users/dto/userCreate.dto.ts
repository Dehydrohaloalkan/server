import { Prisma } from '@prisma/client';

export class userCreateDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    password?: string;
    patronymic?: string;
    rt?: string;
    user_role: Prisma.user_roleCreateNestedOneWithoutUsersInput;
}
