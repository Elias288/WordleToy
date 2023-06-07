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
            {
                resp.map((words, index) => {
                    return (
                        <div key={index} className="inline-flex w-full  text-white bg-zinc-700 px-1 pt-1 justify-center box-border gap-x-1">
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
        </div>
    );
}

export default Wordle;