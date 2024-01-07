import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Cart } from '@prisma/client';
import { CreateCartDto } from './dto/create-cart.dto';
import { RemoveCartItemDto } from './dto/remove-cart.dto';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) {

    }

    @UseGuards(AtGuard)
    @Roles('USER', 'ADMIN')
    @UseGuards(RoleGuard)
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getUserCart(
        @GetCurrentUserId() userId: string
    ): Promise<Cart> {
        return this.cartService.getUserCart(userId);
    };

    @UseGuards(AtGuard)
    @Roles('USER', 'ADMIN')
    @UseGuards(RoleGuard)
    @Post('/')
    @HttpCode(HttpStatus.OK)
    async addItemsToCart(
        @GetCurrentUserId() userId: string,
        @Body(new ValidationPipe()) data: CreateCartDto
    ): Promise<Cart> {
        return this.cartService.addItemsToCart(userId, data);
    };

    @UseGuards(AtGuard)
    @Roles('USER', 'ADMIN')
    @UseGuards(RoleGuard)
    @Delete('/')
    @HttpCode(HttpStatus.OK)
    async removeItemsFromCart(
        @GetCurrentUserId() userId: string,
        @Body(new ValidationPipe()) data: RemoveCartItemDto
    ): Promise<Cart | string> {
        return this.cartService.removeItemsFromCart(userId, data);
    };
}
