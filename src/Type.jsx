import "./Type.css";
import Meter from './Meter';
import { useState } from "react";

export default function Type() {
    const [data, setData] = useState("");
    const [isvisible, setIsvisible] = useState(true);
    const [time, setTime] = useState(1);
    const [wpm, setWpm] = useState(0);
    const [percent, setPercent] = useState(0);

    function handleTimeChange(event) {
        setTime(parseInt(event.target.value));
    }

    function process() {
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo atque nisi debitis expedita obcaecati culpa quasi necessitatibus dolorum quas fuga nostrum rerum temporibus incidunt dicta quisquam, eaque aut quis iste!";
        let text = "";
        if (time === 1) {
            text = lorem;
        } else if (time === 5) {
            text = lorem + lorem;
        } else if (time === 10) {
            text = lorem + lorem + lorem;
        } else if (time === 15) {
            text = lorem + lorem + lorem + lorem;
        } else {
            text = lorem + lorem + lorem + lorem + lorem;
        }
        setData(text);
        setIsvisible(true);
    }

    function test() {
        setIsvisible(false);
        setTimeout(() => {
            finishTyping();
        }, time * 60000);//time * 60000 , because it take miliseconds not min.
    }

    function finishTyping() {
        const typeInput = document.querySelector("input");
        const typedData = typeInput ? typeInput.value : "";
        setData("end");
        setIsvisible(true)

        const max_words = data.trim().split(/\s+/).length;
        const typedDataWords = typedData.trim().split(/\s+/).length;
        const calculatedWpm = (typedDataWords / time);
        const calculatedPercent = (typedDataWords / max_words);

        setPercent(calculatedPercent);
        setWpm(calculatedWpm);
        const f = document.querySelector('footer')
        f.classList.toggle('display')
    }

    return (
        <div>
            <h1>The Typing Test</h1>
            {data === "" && (
                <div className="main_div">
                    <main>
                        <label htmlFor="time">Enter Time:</label>
                        <select name="time" id="time" onChange={handleTimeChange}>
                            <option value="1">1 min.</option>
                            <option value="5">5 min.</option>
                            <option value="10">10 min.</option>
                            <option value="15">15 min.</option>
                            <option value="20">20 min.</option>
                        </select>
                    </main>
                    <button onClick={process}>Click To start!</button>
                </div>
            )}
            <center>
                {data !== "" && data !== "end" && <p id="data">{data}</p>}

                {isvisible && data !== "" && data !== "end" &&
                    <button id="start" onClick={test}>Start 😀</button>}

                {isvisible === false && <input type="text" />}
            </center>
            <footer className="display">
                <Meter value={percent} />
                <h2>Completed!</h2>
                <h3>WPM is:- {wpm.toFixed(2)}</h3>
            </footer>
        </div>
    );
}


