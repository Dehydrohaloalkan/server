export class LessonsCreateDto {
    start_time: string | Date;
    end_time: string | Date;
    subject_id: number;
    location: string;
    teacher_id: string;
}
