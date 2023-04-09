import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            //console.log(authHeader);

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException();
            }

            //console.log(authHeader);
            console.log(
                '🚀 ~ file: auth.guard.ts:25 ~ AuthGuard ~ canActivate ~ user:',
                this.jwtService.verify(token)
            );

            const user = this.jwtService.verify(token);

            req.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
