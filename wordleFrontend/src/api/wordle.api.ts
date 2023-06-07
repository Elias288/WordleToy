import { RandomWord } from "../intefaces/word.inteface"

const API = 'http://localhost:3000/api'

export const getRandomWordRequest = () => fetch(`${API}/word/random`)

export const postWordRequest = (updatedWord: RandomWord) =>
    fetch(`${API}/game/requestWord`, {
        method: 'POST',
        body: JSON.stringify(updatedWord),
        headers: {
            'Content-Type': 'application/json'
        }
    })