import { Injectable } from '@nestjs/common';
import { AbsencesService } from 'src/absences/absences.service';
import { WebSocketAbsenceDto } from './dto/WebSocketAbsence.dto';

@Injectable()
export class AddAbsencesService {
    constructor(private absencesService: AbsencesService) {}

    create(addAbsenceDto: WebSocketAbsenceDto) {
        return this.absencesService.create(addAbsenceDto);
    }

    remove(removeAddAbsenceDto: WebSocketAbsenceDto) {
        return this.absencesService.remove(
            removeAddAbsenceDto.studentId,
            removeAddAbsenceDto.lessonId
        );
    }
}
