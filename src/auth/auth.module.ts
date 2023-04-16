import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AtStrategy } from './strategies/at.strategy';

@Module({
    imports: [UsersModule, JwtModule.register({}), PassportModule],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy],
})
export class AuthModule {}
