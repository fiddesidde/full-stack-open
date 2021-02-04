import React from 'react';
import { useDispatch } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createAnecdote = event => {
        event.preventDefault();
        console.log(event.target.anecdote.value);

        dispatch(create(event.target.anecdote.value));
        event.target.anecdote.value = '';
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;
