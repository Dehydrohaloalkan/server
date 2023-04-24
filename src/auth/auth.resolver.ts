import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserData } from './dto/login-user-data';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    async login(
        @Args('loginUserInput') loginUserInput: LoginUserInput,
        @Context() context,
        @Context('res') res: Response
    ) {
        const { accessToken, refreshToken, data } = await this.authService.login(context.user);
        res.cookie('jwt', refreshToken, { httpOnly: true });
        return { accessToken, user: data };
    }

    @Mutation(() => LoginUserData)
    @UseGuards(JwtAuthGuard)
    async logout(@Context() context, @Context('res') res: Response) {
        const user = context.req.user;
        await this.authService.logout(user.id);
        res.cookie('jwt', '', { httpOnly: true });
        return user;
    }

    @Mutation(() => LoginResponse)
    async refresh(@Context('req') req: Request, @Context('res') res: Response) {
        const { accessToken, refreshToken, data } = await this.authService.refresh(
            req.cookies['jwt']
        );
        res.cookie('jwt', refreshToken, { httpOnly: true });
        return { accessToken, user: data };
    }
}
