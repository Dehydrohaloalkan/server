import { UsersModule } from 'src/users/users.module';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { Module } from '@nestjs/common';

@Module({
    imports: [UsersModule],
    controllers: [StudentsController],
    providers: [StudentsService],
})
export class StudentsModule {}
