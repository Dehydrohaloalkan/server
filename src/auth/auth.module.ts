import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: process.env.SECRET || 'SECRET',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
