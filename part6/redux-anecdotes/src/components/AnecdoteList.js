import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotice } from '../reducers/notificationReducer';

const AnecdoteList = props => {
    const vote = anecdote => {
        props.voteAnecdote(anecdote);
        props.setNotice(`You voted on "${anecdote.content}" !`, 5);
    };

    return (
        <>
            {props.anecdotes.map(anecdote => (
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

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdotes
            .filter(anecdote =>
                anecdote.content
                    .toLowerCase()
                    .includes(state.filter.toLowerCase())
            )
            .sort((a, b) => b.votes - a.votes),
    };
};

const mapDispatchToProps = {
    voteAnecdote,
    setNotice,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
