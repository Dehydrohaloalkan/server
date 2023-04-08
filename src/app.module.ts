import { GroupsModule } from './groups/groups.module';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';

@Module({
    imports: [GroupsModule, UsersModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
