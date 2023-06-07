/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useState } from "react";
import { RandomWord, SendWord, Word } from "../intefaces/word.inteface";
import { getRandomWordRequest, postWordRequest } from "../api/wordle.api";

interface Props {
    children: React.ReactNode,
}

interface WordleContextValues {
    word: RandomWord
    resp: Word[]
    requestWord: (word: SendWord) => void
    restart: () => void
}

export const WordleContext = createContext<WordleContextValues>({
    word: { wordId: '' },
    resp: [],
    requestWord: () => { },
    restart: () => { },
})

export const WordleProvider: React.FC<Props> = ({ children }) => {
    const [word, setWord] = useState<RandomWord>({ wordId: '' })
    const [resp, setResp] = useState<Word[]>([])

    useEffect(() => {
        getRandomWordRequest()
            .then(res => res.json())
            .then(data => setWord(data))
    }, [])

    const restart = () => {
        getRandomWordRequest()
            .then(res => res.json())
            .then(data => setWord(data))
        setResp([])
    }

    const requestWord = async (word: SendWord) => {
        const res = await postWordRequest(word);
        const data = await res.json();
        setResp([...resp, data]);
    }

    return (
        <WordleContext.Provider
            value={{
                word,
                resp,
                requestWord,
                restart
            }}
        >
            {children}
        </WordleContext.Provider>
    )
}