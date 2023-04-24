import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginUserData } from './dto/login-user-data';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        const candidate = await this.usersService.findByEmail(email);

        if (!candidate) {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        }

        let user = null;

        if (!candidate.password) {
            // write password to db (registration logic)
            const passwordHash = await this.generateHash(password);
            user = await this.usersService.updatePassword(candidate.id, passwordHash);
        } else {
            // login logic
            const passwordsEquals = await bcrypt.compare(password, candidate.password);

            if (passwordsEquals) {
                user = candidate;
            } else {
                throw new UnauthorizedException({
                    message: 'Not valid Password',
                });
            }
        }
        return user;
    }

    async login(user: any) {
        const data = await this.generateTokens({
            id: user.id,
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
            role: user.user_role.name,
        });

        const rtHash = await this.generateHash(data.refreshToken);
        await this.usersService.updateRt(data.data.id, rtHash);
        return data;
    }

    async logout(id: string) {
        return await this.usersService.updateRt(id, '');
    }

    async refresh(token: string) {
        if (!token) throw new UnauthorizedException();

        const userData: LoginUserData = this.validateRefreshToken(token);
        if (!userData) throw new UnauthorizedException();

        const userFromDb = await this.usersService.findOneWithRole(userData.id);
        if (!(await bcrypt.compare(token, userFromDb.rt))) throw new UnauthorizedException();

        const data = await this.generateTokens({
            id: userFromDb.id,
            name: userFromDb.name,
            surname: userFromDb.surname,
            patronymic: userFromDb.patronymic,
            role: userFromDb.user_role.name,
        });
        const rtHash = await this.generateHash(data.refreshToken);
        await this.usersService.updateRt(userFromDb.id, rtHash);

        return data;
    }

    validateRefreshToken(token) {
        try {
            return this.jwtService.verify(token, { secret: process.env.RT_SECRET });
        } catch (error: any) {
            return null;
        }
    }

    private async generateTokens(payload: LoginUserData) {
        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: 60 * 60 * 24 * 7,
                secret: process.env.AT_SECRET,
            }),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: 60 * 60 * 24 * 7,
                secret: process.env.RT_SECRET,
            }),
            data: payload,
        };
    }

    private async generateHash(data: string) {
        return await bcrypt.hash(data, 5);
    }
}
