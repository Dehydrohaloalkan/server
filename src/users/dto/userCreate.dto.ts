export class UserCreateDto {
    name: string;
    surname: string;
    email: string;
    password?: string;
    patronymic?: string;
    rt?: string;
    role_id: number;
}
