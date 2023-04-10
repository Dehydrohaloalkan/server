import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadUserDto } from '../dto/auth.dto';

export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): string => {
        const request = context.switchToHttp().getRequest();
        const user = request.user as PayloadUserDto;
        return user.id;
    }
);
