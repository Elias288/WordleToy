import useWord from "../context/useWord";
import WordleForm from "./WordleForm";
import WordleItem from "./WordleItem";

function Wordle() {
    const { resp } = useWord()

    return (
        <div className="p-4 w-[500px]">
            <h1
                className="w-full font-bold text-2xl text-center pb-4">
                Wordle Toy
            </h1>
            <div className="p-2 bg-zinc-700">
                {
                    resp.map((words, index) => {
                        return (
                            <div key={index} className="inline-flex w-full pb-1 text-white justify-center box-border gap-x-1">
                                {
                                    words.letters.map((letter, index) => {
                                        return (
                                            <WordleItem
                                                word={letter}
                                                key={index}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }

                <WordleForm />
                <p className="text-white">Intentos: {resp.length === 0 ? 0 : resp[resp.length - 1].attemptsCount + 1} de 5</p>
            </div>
        </div>
    );
}

export default Wordle;