import React from 'react';
import { useDispatch } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';
import { createdNotice, hideNotice } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createAnecdote = event => {
        event.preventDefault();
        console.log('EVENT TAREGEEEE:', event.target.anecdote.value);

        dispatch(create(event.target.anecdote.value));
        dispatch(createdNotice(event.target.anecdote.value));
        setTimeout(() => {
            dispatch(hideNotice());
        }, 5000);
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
