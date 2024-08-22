import "./App.css"
import React, { useState } from "react"
import BingoBall from "./BingoBall";


function App() {
    const numbersCalled = useState();
    return (
        <div className="container">
            <BingoBall numbersCalled={numbersCalled}/>
            </div>
    )
}

export default App;