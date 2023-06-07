import { ChangeEvent, FormEvent, useRef, useState } from "react"
import useWord from "../context/useWord"

function WordleForm() {
    const { resp, word, requestWord, restart } = useWord()
    const [attempts, setattempts] = useState<number>(4)
    const [attemptsCount, setattemptsCount] = useState<number>(0)
    const [updatedWord, setUpdatedWord] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
    })
    const ref1 = useRef<HTMLInputElement>(null);
    const ref2 = useRef<HTMLInputElement>(null);
    const ref3 = useRef<HTMLInputElement>(null);
    const ref4 = useRef<HTMLInputElement>(null);
    const ref5 = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const result = e.target.value.replace(/[^a-z]/gi, '');
        setUpdatedWord({ ...updatedWord, [e.target.name]: result })

        if (result != '') {
            e.target.select();
            if (updatedWord.input1 === '')
                e.target.name === 'input1' && ref2.current != null && (ref2.current as HTMLInputElement).focus()
            if (updatedWord.input2 === '')
                e.target.name === 'input2' && ref3.current != null && (ref3.current as HTMLInputElement).focus()
            if (updatedWord.input3 === '')
                e.target.name === 'input3' && ref4.current != null && (ref4.current as HTMLInputElement).focus()
            if (updatedWord.input4 === '')
                e.target.name === 'input4' && ref5.current != null && (ref5.current as HTMLInputElement).focus()
        }
    }

    const changeFocus = (e: React.FocusEvent<HTMLInputElement> & React.KeyboardEvent<HTMLInputElement>) => {
        e.target.select();
        if (e.key === "Backspace") {
            e.target.name === 'input2' && ref1.current != null && (ref1.current as HTMLInputElement).focus()
            e.target.name === 'input3' && ref2.current != null && (ref2.current as HTMLInputElement).focus()
            e.target.name === 'input4' && ref3.current != null && (ref3.current as HTMLInputElement).focus()
            e.target.name === 'input5' && ref4.current != null && (ref4.current as HTMLInputElement).focus()
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setattempts(attempts - 1)
        setattemptsCount(attemptsCount + 1)
        if (updatedWord.input1 !== '' && updatedWord.input2 !== '' && updatedWord.input3 !== '' && updatedWord.input4 !== '' && updatedWord.input5 !== '') {
            const sendUpdatedWord = `${updatedWord.input1}${updatedWord.input2}${updatedWord.input3}${updatedWord.input4}${updatedWord.input5}`

            requestWord({
                wordId: word.wordId,
                updatedWord: sendUpdatedWord,
                attempts,
                attemptsCount
            })

            setUpdatedWord({
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
            })
            ref1.current != null && (ref1.current as HTMLInputElement).focus()
        }
    }

    const restartAll = () => {
        setUpdatedWord({
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
        })
        setattempts(5)
        setattemptsCount(0)
        restart()
    }

    return (
        <>
            {
                resp.length > 0 && !resp[resp.length - 1].done || resp.length === 0 ? (

                    <form onSubmit={handleSubmit} >
                        <div
                            className="inline-flex w-full text-white bg-zinc-700 justify-center box-border gap-x-1"
                        >
                            <input
                                type="text"
                                value={updatedWord.input1}
                                className="bg-zinc-500 flex-auto text-center p-2 w-10 rounded-lg uppercase"
                                name="input1"
                                onChange={handleChange}
                                onKeyUp={changeFocus}
                                maxLength={1}
                                ref={ref1}
                                autoFocus
                            />
                            <input
                                type="text"
                                value={updatedWord.input2}
                                className="bg-zinc-500 flex-auto text-center p-2 w-10 rounded-lg uppercase"
                                name="input2"
                                onChange={handleChange}
                                onKeyUp={changeFocus}
                                maxLength={1}
                                ref={ref2}
                            />
                            <input
                                type="text"
                                value={updatedWord.input3}
                                className="bg-zinc-500 flex-auto text-center p-2 w-10 rounded-lg uppercase"
                                name="input3"
                                onChange={handleChange}
                                onKeyUp={changeFocus}
                                maxLength={1}
                                ref={ref3}
                            />
                            <input
                                type="text"
                                value={updatedWord.input4}
                                className="bg-zinc-500 flex-auto text-center p-2 w-10 rounded-lg uppercase"
                                name="input4"
                                onChange={handleChange}
                                onKeyUp={changeFocus}
                                maxLength={1}
                                ref={ref4}
                            />
                            <input
                                type="text"
                                value={updatedWord.input5}
                                className="bg-zinc-500 flex-auto text-center p-2 w-10 rounded-lg uppercase"
                                name="input5"
                                onChange={handleChange}
                                onKeyUp={changeFocus}
                                maxLength={1}
                                ref={ref5}
                            />
                        </div>
                        <button></button>
                    </form>
                ) : (
                    <>
                        <button
                            className="bg-blue-500 p-2 text-white rounded-md hover:bg-blue-700"
                            onClick={restartAll}
                        >
                            Restart
                        </button>
                    </>
                )
            }
        </>

    );
}

export default WordleForm;