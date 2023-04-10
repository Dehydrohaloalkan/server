export class CourseUpdateDto {
    where: {
        id: number;
    };
    data: {
        name?: string;
        start_date?: string | Date;
        end_date?: string | Date;
        form?: number;
    };
}
