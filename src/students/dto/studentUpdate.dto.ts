export class studentUpdateDto {
    where: {
        id: string;
    };
    data: {
        is_group_leader?: boolean;
        is_marking?: boolean;
        subgroup?: boolean;
        group_id?: number;
    };
}
