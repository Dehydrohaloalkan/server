import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user, user_role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { loginUserDto, payloadUserDto } from './dto/loginUser.dto';

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
            // write password to db (registration logic)
            const hashPassword = await bcrypt.hash(userDto.password, 5);

            user = await this.usersService.updateUser({
                where: { id: candidate.id },
                data: { password: hashPassword },
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

        return this.generateToken(user);
    }

    async generateToken(
        userData: user & {
            user_role: user_role;
        }
    ) {
        const payload = new payloadUserDto(userData);

        return {
            token: this.jwtService.sign(payload),
            data: payload,
        };
    }
}
