import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AtGuard } from 'src/common/guards/at.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { User } from './types/user.type';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @UseGuards(AtGuard)
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Get('/')
    @HttpCode(HttpStatus.OK)
    async listUsers(): Promise<User[]> {
        return await this.userService.listUser();
    }
}
