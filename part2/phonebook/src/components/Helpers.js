import React from 'react';

const Person = ({ person, deletePerson }) => {
    return (
        <li>
            {person.name}: {person.number}{' '}
            <button onClick={deletePerson}>Delete</button>
        </li>
    );
};

const Persons = ({ persons, deletePerson }) => {
    return (
        <ul>
            {persons.map(person => (
                <Person
                    key={person.name}
                    person={person}
                    deletePerson={() => deletePerson(person.id)}
                />
            ))}
        </ul>
    );
};

const Filter = props => {
    return (
        <div>
            filter: <input value={props.filter} onChange={props.handle} />
        </div>
    );
};

const Form = props => {
    return (
        <form onSubmit={props.submit}>
            <div>
                name: <input value={props.name} onChange={props.handleName} />
                <br />
                number:{' '}
                <input value={props.number} onChange={props.handleNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

const Notification = ({ message }) => {
    if (message === null) return null;

    return <div className="notice">{message}</div>;
};

const ErrorMessage = ({ message }) => {
    if (message === null) return null;

    return <div className="error">{message}</div>;
};

export default Persons;
export { Filter, Form, Notification, ErrorMessage };
