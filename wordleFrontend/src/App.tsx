import Wordle from "./components/Wordle"
import { WordleProvider } from "./context/WordleContext"

function App() {
  return (
    <div className="flex items-center justify-center">
      <WordleProvider>
        <Wordle />
      </WordleProvider>
    </div>
  )
}

export default App
