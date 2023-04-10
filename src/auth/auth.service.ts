import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user, user_role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { AuthDto, payloadUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(userDto: AuthDto) {
        const candidate = await this.usersService.getUserBy({
            email: userDto.email,
        });

        if (!candidate) {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        }

        let user = null;

        if (!candidate.password) {
            // write password to db (registration logic)
            const passwordHash = await this.generateHash(userDto.password);

            user = await this.usersService.updateUser({
                where: { id: candidate.id },
                data: { password: passwordHash },
            });
        } else {
            // login logic
            const passwordsEquals = await bcrypt.compare(
                userDto.password,
                candidate.password.trim()
            );

            if (passwordsEquals) {
                user = candidate;
            } else {
                throw new UnauthorizedException({
                    message: 'Not valid Password',
                });
            }
        }

        const data = await this.generateTokens(user);

        const rtHash = await this.generateHash(data.refreshToken);
        await this.usersService.updateUser({
            where: { id: user.id },
            data: { rt: rtHash },
        });

        return data;
    }

    async logout(userId: string) {
        await this.usersService.updateUser({
            where: { id: userId },
            data: { rt: null },
        });
    }

    async refreshTokens(token: string) {
        console.log('🚀 ~ file: auth.service.ts:66 ~ AuthService ~ refreshTokens ~ token:', token);

        if (!token) throw new UnauthorizedException();

        const userData: payloadUserDto = this.validateRefreshToken(token);
        if (!userData) throw new UnauthorizedException();

        const userFromDb = await this.usersService.getUserBy({ id: userData.id });

        if (await bcrypt.compare(userFromDb.rt.trim(), token)) throw new UnauthorizedException();

        const data = await this.generateTokens(userFromDb);
        const rtHash = await this.generateHash(data.refreshToken);
        await this.usersService.updateUser({
            where: { id: userFromDb.id },
            data: { rt: rtHash },
        });

        return data;
    }

    validateRefreshToken(token) {
        try {
            return this.jwtService.verify(token, { secret: process.env.RT_SECRET });
        } catch (error: any) {
            return null;
        }
    }

    private async generateHash(data: string) {
        return await bcrypt.hash(data, 5);
    }

    async generateTokens(
        userData: user & {
            user_role: user_role;
        }
    ) {
        const payload = new payloadUserDto(userData);

        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: 15 * 60,
                secret: process.env.AT_SECRET,
            }),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: 60 * 60 * 24 * 7,
                secret: process.env.RT_SECRET,
            }),
            data: payload,
        };
    }
}
