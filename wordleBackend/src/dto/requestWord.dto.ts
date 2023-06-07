import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class requestWord {
  @IsString()
  @IsNotEmpty()
  wordId: string;

  @IsString()
  @IsNotEmpty()
  updatedWord: string;

  @IsNotEmpty()
  @IsNumber()
  attempts: number;

  @IsNotEmpty()
  @IsNumber()
  attemptsCount: number;
}
