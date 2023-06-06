import { Body, Controller, Post } from '@nestjs/common';
import { GameService,} from './game.service';
import { requestWord } from 'src/dto/requestWord.dto';
import { responseWord } from 'src/dto/responseWord.dto';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) { }

    @Post('requestWord')
    async submitWord(@Body() body: requestWord): Promise<responseWord> {
        return await this.gameService.requestWord(body)
    }
}
