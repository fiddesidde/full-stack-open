import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { hideNotice, votedNotice } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state =>
        state.anecdotes.sort((a, b) => b.votes - a.votes)
    );

    const filter = useSelector(state => state.filter);

    const dispatch = useDispatch();

    const vote = anecdote => {
        console.log('vote', anecdote.id);
        dispatch(voteAnecdote(anecdote.id));
        dispatch(votedNotice(anecdote));
        setTimeout(() => {
            dispatch(hideNotice());
        }, 5000);
    };

    const anecdotesToShow = anecdotes.filter(anecdote => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <>
            {anecdotesToShow.map(anecdote => (
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
