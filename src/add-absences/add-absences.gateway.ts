import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AddAbsencesService } from './add-absences.service';
import { WebSocketAbsenceDto } from './dto/WebSocketAbsence.dto';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AddAbsencesGateway {
    @WebSocketServer() server: Server;

    constructor(private readonly addAbsencesService: AddAbsencesService) {}

    @SubscribeMessage('addAbsence')
    async create(@MessageBody() addAbsenceDto: WebSocketAbsenceDto) {
        const newAbsence = await this.addAbsencesService.create(addAbsenceDto);
        this.server.emit('addAbsence', {
            lessonId: newAbsence.lessonId,
            studentId: newAbsence.studentId,
        });
        return newAbsence;
    }

    @SubscribeMessage('removeAbsence')
    async remove(@MessageBody() removeAbsenceDto: WebSocketAbsenceDto) {
        const newAbsence = await this.addAbsencesService.remove(removeAbsenceDto);
        this.server.emit('removeAbsence', {
            lessonId: newAbsence.lessonId,
            studentId: newAbsence.studentId,
        });
        return newAbsence;
    }
}
