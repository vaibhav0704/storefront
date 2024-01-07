import { IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({
        message: "invalid name"
    })
    name: string;
}