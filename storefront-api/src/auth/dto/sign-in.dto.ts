import { IsEmail, IsString } from "class-validator";

export class SignInDto {
    @IsEmail()
    email: string;

    @IsString({
        message: "invalid password"
    })
    password: string;
}