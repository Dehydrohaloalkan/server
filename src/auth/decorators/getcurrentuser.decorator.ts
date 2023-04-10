import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadUserDto } from '../dto/auth.dto';

export const GetCurrentUser = createParamDecorator(
    (data: keyof PayloadUserDto | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
);
