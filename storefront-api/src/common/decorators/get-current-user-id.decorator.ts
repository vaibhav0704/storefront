/**
 * @file Get Current User Id Decprator
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

/**
 * Gets current userId from JWT
 * @decorator
 */
export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.id;
  },
);