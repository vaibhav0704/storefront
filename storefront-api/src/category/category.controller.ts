import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @UseGuards(AtGuard)
    @Roles('USER', 'ADMIN')
    @UseGuards(RoleGuard)
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getAllCategories(): Promise<Category[]> {
        return this.categoryService.getAllCategories();
    };

    @UseGuards(AtGuard)
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Post('/')
    @HttpCode(HttpStatus.OK)
    async createCategory(
        @Body(new ValidationPipe()) data: CreateCategoryDto
    ): Promise<string> {
        return this.categoryService.createCategory(data);
    };

    @UseGuards(AtGuard)
    @Roles('USER', 'ADMIN')
    @UseGuards(RoleGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getCategory(
        @Param('id') id: string
    ): Promise<Category> {
        return this.categoryService.getCategory(id);
    };

    @UseGuards(AtGuard)
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async deleteCategory(
        @Param('id') id: string
    ): Promise<string> {
        return this.categoryService.deleteCategory(id);
    };
}
