import { ConflictException, Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getOrdersByUser(userId: string): Promise<Order[]> {
        return await this.prisma.order.findMany({
            where: {
                userId
            }
        })
    }

    async placeOrder(userId: string): Promise<Order> {
        const cart = await this.prisma.cart.findFirst({
            where: {
                userId
            }
        });

        if (cart) {
            return await this.prisma.order.create({
                data: cart
            })
        } else {
            throw new ConflictException('Cart is empty')
        }
    }
}
