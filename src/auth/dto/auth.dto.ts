import { user, user_role } from '@prisma/client';

export class AuthDto {
    email: string;
    password: string;
}

export class PayloadUserDto {
    constructor(
        data: user & {
            user_role: user_role;
        }
    ) {
        return {
            id: data.id,
            name: data.name,
            surname: data.surname,
            patronymic: data.patronymic,
            email: data.email,
            role: data.user_role.name,
        };
    }

    id: string;
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    role: string;
}
