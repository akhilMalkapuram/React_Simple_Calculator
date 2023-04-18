import Keypad from "./components/Keypad"

import './App.css'
import { useState } from "react"

function App() {


      let [input, setInput] = useState("")
      function handleClick(value) {

            setInput(input + value)

      }
      function calculate(value) {

            let outputVal = eval(input)
            setInput(outputVal)

      }
      function handleClear() {

            setInput("")

      }

      return (
            <div className="container">
                  <h1>React Simple Calculator</h1>
                  <div className="caculator">
                        <input type="text" value={input} className="output" readOnly />
                        <Keypad handleClick={handleClick} handleClear={handleClear} calculate={calculate}></Keypad>

                  </div>

            </div>
      )
}

export default App