import { IsString } from "class-validator";

export class RemoveCartItemDto {
    @IsString({
        message: 'invalid productId'
    })
    productId: string;
}