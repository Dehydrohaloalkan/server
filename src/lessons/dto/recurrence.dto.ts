export interface IRecurrence {
    week?: IWeekDay[];
}

export interface IWeekDay {
    dayNumber: number;
    lessonsInfo: ILessonInfo[];
}

export interface ILessonInfo {
    startTime: string;
    endTime: string;
    location: string;
    teacherId?: string;
}
