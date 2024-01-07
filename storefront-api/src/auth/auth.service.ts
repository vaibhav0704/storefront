import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as crypto from "node:crypto";
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload } from './types/jwt-payload.type';
import { User } from '@prisma/client';
import { Token } from './types/token.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly JwtTokenService: JwtService
    ) {}

    private async getToken(user: User) {
        const payload: JwtPayload = {
            id: user.id,
            role: user.role
        }

        const access_token = await this.JwtTokenService.signAsync(payload, {
            secret: this.config.get<string>('JWT_SECRET'),
        })

        return access_token;
    };

    async signup(data: SignUpDto) {
        let user = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        });

        if (!user) {
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(data.password, salt, 1000, 64, 'sha512').toString('hex');

            user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: hash,
                    salt,
                    role: 'USER'
                }
            });
        };

        return "Sign up successful";
    };

    async signin(data: SignInDto): Promise<Token> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        });

        if (user) {
            const hash = crypto.pbkdf2Sync(data.password, user.salt, 1000, 64, 'sha512').toString('hex');

            if (hash === user.password) {
                const token = await this.getToken(user);
                return { access_token: token };
            } else {
                throw new ConflictException("Incorrect password")
            }
        } else {
            throw new ConflictException("User does not exists")
        }
    };
}
