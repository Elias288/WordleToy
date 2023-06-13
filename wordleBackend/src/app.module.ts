import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/wordleDb'),
    WordModule,
  ],
})
export class AppModule {}
