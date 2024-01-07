import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @UseGuards(AtGuard)
    @Roles('USER', 'ADMIN')
    @UseGuards(RoleGuard)
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getAllProducts(): Promise<Product[]> {
        return this.productService.getAllProducts();
    };

    @UseGuards(AtGuard)
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Post('/')
    @HttpCode(HttpStatus.OK)
    async createProduct(
        @Body(new ValidationPipe()) data: CreateProductDto
    ): Promise<string> {
        return this.productService.createProduct(data);
    };

    @UseGuards(AtGuard)
    @Roles('USER', 'ADMIN')
    @UseGuards(RoleGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getProduct(
        @Param('id') id: string
    ): Promise<Product> {
        return this.productService.getProduct(id);
    };
}
