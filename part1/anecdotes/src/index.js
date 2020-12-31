import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ event, text }) => <button onClick={event}>{text}</button>;

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [vote, setVote] = useState(
        new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
    );

    const newAnecdote = () => {
        let index = Math.floor(Math.random() * anecdotes.length);
        while (index === selected) {
            index = Math.floor(Math.random() * anecdotes.length);
        }
        setSelected(index);
    };

    const addVote = () => {
        const voteCopy = [...vote];
        voteCopy[selected]++;
        setVote(voteCopy);
    };

    const maxValueIndex = vote.reduce(
        (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
        0
    );
    const maxVoteAnectode = anecdotes[maxValueIndex];
    const maxVoteAnectodeVotes = vote[maxValueIndex];

    return (
        <>
            <h1>Anecdotes</h1>
            <div>
                <p>{anecdotes[selected]}</p>
                <Button event={addVote} text="vote +1" />
                <Button event={newAnecdote} text="new anecdote" />
                <p>This anecdote has {vote[selected]} votes</p>
            </div>
            <h2>Anecdote with the most votes</h2>
            <p>{maxVoteAnectode}</p>
            <p>- has {maxVoteAnectodeVotes} votes</p>
        </>
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
