import { IsLowercase, IsNotEmpty, IsString } from 'class-validator';

export class CreateWordleDto {
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  word: string;
}
