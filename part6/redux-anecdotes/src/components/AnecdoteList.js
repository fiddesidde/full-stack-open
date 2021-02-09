import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotice } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state =>
        state.anecdotes.sort((a, b) => b.votes - a.votes)
    );

    const filter = useSelector(state => state.filter);

    const dispatch = useDispatch();

    const vote = anecdote => {
        dispatch(voteAnecdote(anecdote));
        dispatch(setNotice(`You voted on "${anecdote.content}" !`, 5));
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
                        has {anecdote.votes}{' '}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AnecdoteList;
