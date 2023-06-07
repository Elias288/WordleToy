import { Injectable } from '@nestjs/common';
import { requestWord } from 'src/dto/requestWord.dto';
import { responseWord } from 'src/dto/responseWord.dto';
import { WordService } from 'src/word/word.service';

@Injectable()
export class GameService {
  constructor(private wordService: WordService) {}

  async requestWord(consult: requestWord): Promise<responseWord> {
    const wordToGuess = await this.wordService.findOne(consult.wordId);
    const arr = [...consult.updatedWord.split('')];
    const wordToGuessArr = [...wordToGuess.word];
    /** STATUS
     * 0 if it's not in the word
     * 1 if it's in the correct position
     * 2 if it's not in the correct position
     */
    const letters = [];
    let gameStatus = true;
    for (let i = 0; i < arr.length; i++) {
      const letter = {
        letter: arr[i],
        status:
          wordToGuessArr[i] === arr[i]
            ? 1
            : wordToGuessArr.includes(arr[i])
            ? 2
            : 0,
      };
      // gameStatus = letter.status !== 0 && letter.status !== 2
      letters.push(letter);
    }

    gameStatus = !letters.some(
      (letter) => letter.status === 0 || letter.status === 2,
    );

    return {
      wordId: consult.wordId,
      letters,
      attempts: consult.attempts,
      done: gameStatus,
    };
  }
}
