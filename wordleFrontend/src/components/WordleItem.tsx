import { Letter } from "../intefaces/word.inteface";

interface Props {
    word: Letter
}

function WordleItem({ word }: Props) {
    return (
        word.status === 0 ? (
            <div
                className="bg-zinc-500 flex-auto text-center p-2 w-10 rounded-lg uppercase">
                {word.letter}
            </div>
        ) : (
            word.status === 1 ? (
                <div
                    className="bg-green-500 flex-auto text-center p-2 w-10 rounded-lg uppercase">
                    {word.letter}
                </div>
            ) : (
                <div
                    className="bg-yellow-500 flex-auto text-center p-2 w-10 rounded-lg uppercase">
                    {word.letter}
                </div>
            )
        )
    );
}

export default WordleItem;