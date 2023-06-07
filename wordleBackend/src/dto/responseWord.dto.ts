import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class responseWord {
  @IsString()
  @IsNotEmpty()
  wordId: string;

  letters: letterStatus[];

  @IsNumber()
  @IsOptional()
  attempts: number;

  @IsBoolean()
  @IsOptional()
  done: boolean;
}

interface letterStatus {
  letter: string;
  status: number;
}
