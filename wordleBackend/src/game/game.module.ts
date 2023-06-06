import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wordle, WordleSchema } from 'src/schemas/wordle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wordle.name, schema: WordleSchema }]),
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
