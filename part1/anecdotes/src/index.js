import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ event, text }) => <button onClick={event}>{text}</button>;

const App = props => {
    const [selected, setSelected] = useState(0);
    const [vote, setVote] = useState(
        new Array(props.anecdotes.length + 1)
            .join('0')
            .split('')
            .map(parseFloat)
    );

    const newAnecdote = () => {
        let index = Math.floor(Math.random() * 6);
        while (index === selected) {
            index = Math.floor(Math.random() * 6);
        }
        setSelected(index);
    };

    const addVote = () => {
        const voteCopy = [...vote];
        voteCopy[selected]++;
        setVote(voteCopy);
    };

    return (
        <div>
            {props.anecdotes[selected]}
            <p>
                <Button event={addVote} text="vote +1" />
                <Button event={newAnecdote} text="new anecdote" />
            </p>
            <p>This anecdote has {vote[selected]} votes</p>
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
