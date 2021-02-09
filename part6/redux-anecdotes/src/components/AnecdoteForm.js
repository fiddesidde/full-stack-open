import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createdNotice, hideNotice } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async event => {
        event.preventDefault();

        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';

        try {
            const createdAnecdote = await anecdoteService.createAnecdote(
                content
            );
            dispatch(createAnecdote(createdAnecdote));
            dispatch(createdNotice(createdAnecdote.content));
            setTimeout(() => {
                dispatch(hideNotice());
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;
