import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(
        @Body() userDto: loginUserDto,
        @Res({ passthrough: true }) response: Response
    ) {
        const { token, data } = await this.authService.login(userDto);
        response.cookie('jwt', token, { httpOnly: true });
        return { token, data };
    }
}
