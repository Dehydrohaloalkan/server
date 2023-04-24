import { Module } from '@nestjs/common';
import { RolesModule } from 'src/roles/roles.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
    imports: [RolesModule],
    providers: [UsersResolver, UsersService],
    exports: [UsersService],
})
export class UsersModule {}
