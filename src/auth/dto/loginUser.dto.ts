import { user, user_role } from '@prisma/client';

export class loginUserDto {
    login: string;
    password: string;
}

export class payloadUserDto {
    constructor(
        data: user & {
            user_role: user_role;
        }
    ) {
        return {
            id: data.id.trim(),
            name: data.name.trim(),
            surname: data.surname.trim(),
            patronymic: data.patronymic?.trim(),
            email: data.email.trim(),
            role: data.user_role.name.trim(),
        };
    }

    id: string;
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    role: string;
}
