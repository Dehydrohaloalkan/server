import { SubjectTypesService } from './subjectTypes.service';
import { SubjectTypesController } from './subjectTypes.controller';

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [SubjectTypesController],
    providers: [SubjectTypesService],
})
export class SubjectTypesModule {}
