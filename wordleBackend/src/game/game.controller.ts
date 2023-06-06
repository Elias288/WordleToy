import { Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateWordleDto } from 'src/dto/create-wordle.dto';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) { }

    @Get()
    findAll() {
        return this.gameService.findAll()
    }

    @Get('random')
    findRandomOne() {
        return this.gameService.findRandomeOne()
    }

    @Post()
    async create(@Body() body: CreateWordleDto) {
        try {
            return await this.gameService.create(body)
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Word already exists.')
            }
            throw error
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteWordle(@Param('id') id: string) {
        const wordle = await this.gameService.delete(id)
        if (!wordle) throw new NotFoundException('Word not found');
        return wordle
    }
}
