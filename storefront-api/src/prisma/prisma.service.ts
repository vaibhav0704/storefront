import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(
        config: ConfigService
    ) {
        const url = config.get<string>('DATABASE_URL');

        super({
            datasources: {
                db: {
                    url
                }
            }
        })
    }

    async onModuleInit() {
        try {
            await this.$connect()
        } catch (err) {
            console.error(err)
        }
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}
