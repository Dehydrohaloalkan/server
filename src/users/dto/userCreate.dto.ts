export class UserCreateDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    password?: string;
    patronymic?: string;
    rt?: string;
    role_id: number;
}
