import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWordleDto } from 'src/dto/create-wordle.dto';
import { Wordle } from 'src/schemas/wordle.schema';

@Injectable()
export class GameService {
    constructor(@InjectModel(Wordle.name) private wordleModel: Model<Wordle>) { }

    findAll() {
        return this.wordleModel.find()
    }

    findRandomeOne() {
        return this.wordleModel.aggregate([
            { $sample: { size: 1 } }
        ])
    }

    async create(createWord: CreateWordleDto) {
        const newWord = new this.wordleModel(createWord);
        return await newWord.save();
    }

    async delete(id: string) {
        return this.wordleModel.findByIdAndDelete(id);
    }
}
