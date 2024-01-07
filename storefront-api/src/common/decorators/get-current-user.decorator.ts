/**
 * @file get current user 
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Gets current user from jwt
 * @decorator
 */
export const GetCurrentUser = createParamDecorator(
  (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);