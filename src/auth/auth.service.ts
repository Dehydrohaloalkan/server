import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { loginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(userService: UsersService, jwtService: JwtService) {}

    async login(userDto: loginUserDto) {}
}
