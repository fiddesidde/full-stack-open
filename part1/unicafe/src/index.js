import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ event, text }) => <button onClick={event}>{text}</button>;

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGood = () => {
        setGood(good + 1);
    };
    const handleNeutral = () => {
        setNeutral(neutral + 1);
    };
    const handleBad = () => {
        setBad(bad + 1);
    };

    const total = good + bad + neutral;

    return (
        <>
            <h1>Unicafe</h1>
            <div>
                <h2>Tell us how we did</h2>
                <Button event={handleGood} text="good" />
                <Button event={handleNeutral} text="neutral" />
                <Button event={handleBad} text="bad" />
            </div>
            <div>
                <h2>Stats</h2>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {total}</p>
                <p>average {(bad * -1 + good * 1 + neutral * 0) / total}</p>
                <p>positive {(good / total) * 100} %</p>
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
