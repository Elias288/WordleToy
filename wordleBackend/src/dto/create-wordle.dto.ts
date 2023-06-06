import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWordleDto {
    @IsString()
    @IsNotEmpty()
    word: string;
}