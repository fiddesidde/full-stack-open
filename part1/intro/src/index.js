import React from 'react';
import ReactDOM from 'react-dom';

const Hello = prop => {
    return (
        <div>
            <p>
                Hello {prop.name}, you are {prop.age} years old
            </p>
        </div>
    );
};

const App = () => {
    const name = 'Peter';
    const age = 10;
    return (
        <>
            <h1>Greetings</h1>
            <Hello name="George" age={26 + 10} />
            <Hello name={name} age={age} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
