import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Token } from './types/token.type';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    @HttpCode(HttpStatus.OK)
    async signup(
        @Body(new ValidationPipe()) data: SignUpDto
    ): Promise<string> {
        return await this.authService.signup(data);
    };

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(
        @Body(new ValidationPipe()) data: SignInDto
    ): Promise<Token> {
        return await this.authService.signin(data);
    }
}
