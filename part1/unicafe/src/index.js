import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ event, text }) => <button onClick={event}>{text}</button>;

const Stastitic = ({ value, text, unit }) => {
    return (
        <>
            <p>
                {text} {value} {unit}
            </p>
        </>
    );
};

const Statistics = ({ good, bad, neutral }) => {
    const total = good + bad + neutral;
    const average = (bad * -1 + good * 1 + neutral * 0) / total;
    const positive = (good / total) * 100;

    if (good === 0 && bad === 0 && neutral === 0) {
        return 'Nothing here yet';
    }

    return (
        <>
            <Stastitic text="good" value={good} />
            <Stastitic text="neutral" value={neutral} />
            <Stastitic text="bad" value={bad} />
            <Stastitic text="all" value={total} />
            <Stastitic text="average" value={average} />
            <Stastitic text="positive" value={positive} unit="%" />
        </>
    );
};

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
                <Statistics good={good} bad={bad} neutral={neutral} />
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
