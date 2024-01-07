import { CanActivate, ExecutionContext, Type, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from "@nestjs/config";

@Injectable()
  export class RoleGuard implements CanActivate {
    constructor(
      private readonly reflector: Reflector,
      private jwtService: JwtService,
      private readonly config: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
  
      const request = context.switchToHttp().getRequest();
      const authToken = request.headers.authorization?.split('Bearer ')[1]
  
      if (!authToken) return false;
  
      const matchRoles = await this.jwtService.verify(authToken, { secret: this.config.get<string>('JWT_SECRET') });
  
      if (roles.includes(matchRoles.role)) {
        return true;
      }
    }
  
  } 
