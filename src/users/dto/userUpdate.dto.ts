export class userUpdateDto {
    where: {
        id: string;
    };
    data: {
        id?: string;
        name?: string;
        surname?: string;
        email?: string;
        password?: string;
        patronymic?: string;
    };
}
