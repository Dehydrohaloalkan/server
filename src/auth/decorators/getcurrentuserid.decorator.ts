import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { payloadUserDto } from '../dto/auth.dto';

export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): string => {
        const request = context.switchToHttp().getRequest();
        const user = request.user as payloadUserDto;
        return user.id;
    }
);
