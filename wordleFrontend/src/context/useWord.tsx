import { useContext } from "react";
import { WordleContext } from "./WordleContext";

function useWord() {
    const context = useContext(WordleContext)
    if (!context) throw new Error('useWord must be used within a WordleProvider')
    return context;
}

export default useWord;