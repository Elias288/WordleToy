import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWordleDto } from 'src/dto/create-wordle.dto';
import { Word } from 'src/schemas/wordle.schema';

@Injectable()
export class WordService {
  constructor(@InjectModel(Word.name) private wordleModel: Model<Word>) {}

  findAll() {
    return this.wordleModel.find();
  }

  findOne(id: string) {
    return this.wordleModel.findById(id);
  }

  async findRandomeOne() {
    const randomWord = await this.wordleModel.aggregate([
      { $sample: { size: 1 } },
    ]);
    return { wordId: randomWord[0]._id };
  }

  async create(createWord: CreateWordleDto) {
    const newWord = new this.wordleModel(createWord);
    return await newWord.save();
  }

  async delete(id: string) {
    return this.wordleModel.findByIdAndDelete(id);
  }
}
