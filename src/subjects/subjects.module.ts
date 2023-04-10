import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule {}
