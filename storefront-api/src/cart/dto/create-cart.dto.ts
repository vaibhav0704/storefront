import { IsString } from "class-validator";

export class CreateCartDto {
    @IsString({
        message: 'invalid produdctId'
    })
    productId: string;
}