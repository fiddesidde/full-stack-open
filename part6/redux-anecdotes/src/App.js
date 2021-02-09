import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { useDispatch } from 'react-redux';
import { initAnecdotes } from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdotes';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const anecdotes = await anecdoteService.getAll();
                dispatch(initAnecdotes(anecdotes));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
