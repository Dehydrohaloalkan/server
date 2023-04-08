import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { loginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: loginUserDto) {
        const candidate = await this.usersService.getUserByEmail({
            email: userDto.login,
        });

        if (!candidate) {
            throw new HttpException(
                'User does not exist',
                HttpStatus.BAD_REQUEST
            );
        }

        let user = null;

        if (!candidate.password) {
            const hashPassword = await bcrypt.hash(userDto.password, 5);
            user = await this.usersService.updateUser({
                where: { id: candidate.id },
                data: { password: hashPassword },
            });
        } else {
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

        return this.generateToken(user);
    }

    async generateToken(userData: any) {
        const payload = {
            id: userData.id,
            name: userData.name,
            surname: userData.surname,
            patronymic: userData.patronymic,
            email: userData.email,
            role: userData.user_role.name,
        };

        return this.jwtService.sign(payload);
    }
}
