import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwt-payload.type";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly config: ConfigService, 
        private readonly prismaService: PrismaService
    ) {
        const secret = config.get<string>('JWT_SECRET')
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret
        });
    }

    async validate(payload: JwtPayload) {
        const { password, salt, ...user } = await this.prismaService.user.findFirst({
            where: {
                id: payload.id
            }
        });
        
        return user;
    }
}