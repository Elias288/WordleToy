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
    if (arr.length !== wordToGuessArr.length) {
      throw new Error('Los arrays deben tener la misma longitud');
    }
    /** STATUS
     * 0 if it's not in the word
     * 1 if it's in the correct position
     * 2 if it's not in the correct position
     */

    let gameStatus = true;
    const resultado = [];
    const wordToGuessArrCopy = wordToGuessArr.slice();

    //* generado por chatgpt *//
    for (let i = 0; i < arr.length; i++) {
      const caracter = arr[i];
      let estado = 0;
      const caracterIndex = wordToGuessArrCopy.indexOf(caracter); // obtiene el indice del caracter

      if (caracterIndex !== -1) {
        // si el caracter está en wordToGuessArrCopy
        if (caracterIndex === i) {
          // si el indice del caracter es igual a i
          estado = 1; // está en el array y en la posicion correcta
        } else {
          estado = 2; // está en el array y no en la posicion correcta
        }

        wordToGuessArrCopy[caracterIndex] = null; // lo elimina
      } else if (arr.indexOf(caracter) < i) {
        // si no está en wordToGuessArrCopy
        estado = 0;
      }

      resultado.push({
        letter: caracter,
        status: estado,
      });
    }
    //* generado por chatgpt *//

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
