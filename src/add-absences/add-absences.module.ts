import { Module } from '@nestjs/common';
import { AbsencesModule } from 'src/absences/absences.module';
import { AddAbsencesGateway } from './add-absences.gateway';
import { AddAbsencesService } from './add-absences.service';

@Module({
    imports: [AbsencesModule],
    providers: [AddAbsencesGateway, AddAbsencesService],
})
export class AddAbsencesModule {}
