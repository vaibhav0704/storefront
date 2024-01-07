import { Type } from "class-transformer";
import { IsInt, IsString, ValidateNested } from "class-validator";
import { ImageDto } from "src/common/dto/image.dto";

export class CreateProductDto {
    @IsString({
        message: "invalid name"
    })
    name: string;

    @IsInt({
        message: "invalid price"
    })
    price: number;

    @IsString({
        message: "invalid description"
    })
    description: string;

    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    image: ImageDto;

    @IsString({
        message: 'invalid categoryId'
    })
    categoryId: string;
}