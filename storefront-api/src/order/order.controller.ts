import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Order } from '@prisma/client';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @UseGuards(AtGuard)
    @Roles('USER', 'ADMIN')
    @UseGuards(RoleGuard)
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getOrdersByUser(
        @GetCurrentUserId() userId: string
    ): Promise<Order[]> {
        return this.orderService.getOrdersByUser(userId);
    }

    @UseGuards(AtGuard)
    @Roles('USER', 'ADMIN')
    @UseGuards(RoleGuard)
    @Post('/')
    @HttpCode(HttpStatus.OK)
    async placeOrder(
        @GetCurrentUserId() userId: string,
    ): Promise<Order> {
        return this.orderService.placeOrder(userId);
    };
}
