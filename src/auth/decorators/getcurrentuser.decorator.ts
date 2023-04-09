import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { payloadUserDto } from '../dto/auth.dto';

export const GetCurrentUser = createParamDecorator(
    (data: keyof payloadUserDto | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
);
