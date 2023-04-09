import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GetCurrentUserId } from './decorators/getcurrentuserid.decorator';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() userDto: AuthDto, @Res({ passthrough: true }) response: Response) {
        const { accessToken, refreshToken, data } = await this.authService.login(userDto);
        response.cookie('jwt', accessToken, { httpOnly: true });
        return { accessToken, user: data };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response, @GetCurrentUserId() userId) {
        await this.authService.logout(userId);
        response.cookie('jwt', '', { httpOnly: true });
    }

    @Post('refresh')
    async refresh() {}
}
