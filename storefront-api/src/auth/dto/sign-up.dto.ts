import { IsEmail, IsString } from "class-validator";

export class SignUpDto {
    @IsEmail()
    email: string;

    @IsString({
        message: "invalid name"
    })
    name: string;

    @IsString({
        message: "invalid password"
    })
    password: string
}