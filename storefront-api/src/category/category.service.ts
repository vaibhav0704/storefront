import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getAllCategories(): Promise<Category[]> {
        return await this.prisma.category.findMany()
    };

    async createCategory(data: CreateCategoryDto): Promise<string> {
        await this.prisma.category.create({
            data: {
                name: data.name
            }
        })

        return "created successfully"
    };

    async getCategory(id: string): Promise<Category> {
        return this.prisma.category.findFirst({
            where: {
                id
            },
            include: {
                products: true
            }
        })
    }

    async deleteCategory(id: string): Promise<string> {
        await this.prisma.category.delete({
            where: {
                id
            }
        })

        return "deleted successfully"
    }

}
