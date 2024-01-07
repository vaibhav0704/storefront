import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.prisma.product.findMany()
    };

    async createProduct(data: CreateProductDto): Promise<string> {
        await this.prisma.product.create({
            data
        })

        return 'successfully created'
    };

    async getProduct(id: string): Promise<Product> {
        return this.prisma.product.findFirst({ where: { id, } })
    };
}
