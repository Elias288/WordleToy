export interface Word {
    wordId: string;
    updatedWord: string;
    attempts: number;
    attemptsCount: number;
    letters: Array<Letter>;
    done: boolean;
}

export interface Letter {
    letter: string;
    status: number;
}

export type SendWord = Omit<Word, 'letters' | 'done' >
export type RandomWord =  Omit<Word, 'updatedWord' | 'letters' | 'done' | 'attempts' | 'attemptsCount' >