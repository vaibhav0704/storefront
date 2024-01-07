import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './types/user.type';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async listUser(): Promise<User[]> {
        return await this.prisma.user.findMany({
            select: {
                name: true,
                id: true,
                email: true
            }
        });
    }
}
