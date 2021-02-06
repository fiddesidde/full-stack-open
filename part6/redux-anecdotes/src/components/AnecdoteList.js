import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { hideNotice, showNotice } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state =>
        state.anecdotes.sort((a, b) => b.votes - a.votes)
    );

    const dispatch = useDispatch();

    const vote = anecdote => {
        console.log('vote', anecdote.id);
        dispatch(voteAnecdote(anecdote.id));
        dispatch(showNotice(anecdote.content));
        setTimeout(() => {
            dispatch(hideNotice());
        }, 3000);
    };

    return (
        <>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AnecdoteList;
