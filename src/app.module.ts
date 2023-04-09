import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [PrismaModule, RolesModule, AuthModule, GroupsModule, UsersModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
