import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { WordModule } from 'src/word/word.module';

@Module({
  imports: [WordModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
