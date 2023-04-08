import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
    imports: [],
    controllers: [GroupsController],
    providers: [GroupsService, PrismaService],
})
export class GroupsModule {}
