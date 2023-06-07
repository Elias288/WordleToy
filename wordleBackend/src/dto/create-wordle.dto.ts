import {
  IsLowercase,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWordleDto {
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  @MinLength(5)
  @MaxLength(5)
  word: string;
}
