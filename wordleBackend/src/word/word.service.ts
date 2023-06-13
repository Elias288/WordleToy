import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWordleDto } from 'src/dto/create-wordle.dto';
import { requestWord } from 'src/dto/requestWord.dto';
import { responseWord } from 'src/dto/responseWord.dto';
import { Word } from 'src/schemas/word.schema';

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

  /*
   * STATUS
   * 0 if it's not in the word
   * 1 if it's in the correct position
   * 2 if it's not in the correct position
   */
  async requestWord(consult: requestWord): Promise<responseWord> {
    const wordToGuess = await this.findOne(consult.wordId);
    const arr = [...consult.updatedWord.split('')];
    const wordToGuessArr = [...wordToGuess.word];

    if (arr.length !== wordToGuessArr.length) {
      throw new Error('Los arrays deben tener la misma longitud');
    }

    let gameStatus = true;
    const resultado = [];
    const wordToGuessArrCopy = wordToGuessArr.slice();

    arr.forEach((caracter, i) => {
      let estado = 0;
      const caracterIndex = wordToGuessArrCopy.indexOf(caracter); // obtiene el indice del caracter

      if (caracterIndex !== -1) {
        estado = caracterIndex === i ? 1 : 2;
        wordToGuessArrCopy[caracterIndex] = null; // lo elimina
      } else {
        estado = 0;
      }

      resultado.push({
        letter: caracter,
        status: estado,
      });
    });

    gameStatus =
      !resultado.some((letter) => letter.status === 0 || letter.status === 2) ||
      consult.attempts === 0;

    return {
      wordId: consult.wordId,
      letters: resultado,
      attempts: consult.attempts,
      attemptsCount: consult.attemptsCount,
      done: gameStatus,
    };
  }
}
