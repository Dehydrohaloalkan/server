export class SubjectUpdateDto {
    where: {
        id: number;
    };
    data: {
        course_id?: number;
        recurrence_json?: string;
        teacher_id?: string;
        type_id?: number;
    };
}
