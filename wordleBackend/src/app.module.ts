import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    GameModule,
    MongooseModule.forRoot('mongodb://localhost:27017/wordleDb'),
    WordModule,
  ],
})
export class AppModule {}
