import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordleDto } from 'src/dto/create-wordle.dto';

@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get()
  findAll() {
    return this.wordService.findAll();
  }

  @Get('random')
  findRandomOne() {
    return this.wordService.findRandomeOne();
  }

  @Post()
  async createWord(@Body() body: CreateWordleDto) {
    try {
      return await this.wordService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Word already exists.');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteWordle(@Param('id') id: string) {
    const wordle = await this.wordService.delete(id);
    if (!wordle) throw new NotFoundException('Word not found');
    return wordle;
  }
}
