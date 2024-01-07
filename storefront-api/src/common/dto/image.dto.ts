import { IsString } from "class-validator";

export class ImageDto {
    @IsString({
        message: "invalid alt"
    })
    alt: string;

    @IsString({
        message: 'invlaid src'
    })
    src: string
}