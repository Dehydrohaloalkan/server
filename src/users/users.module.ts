import { Module, forwardRef } from '@nestjs/common';
import { RolesModule } from 'src/roles/roles.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
    imports: [RolesModule, forwardRef(() => SubjectsModule)],
    providers: [UsersResolver, UsersService],
    exports: [UsersService],
})
export class UsersModule {}
