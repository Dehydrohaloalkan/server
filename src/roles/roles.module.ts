import { AuthModule } from 'src/auth/auth.module';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

import { Module } from '@nestjs/common';

@Module({
    imports: [AuthModule],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {}
