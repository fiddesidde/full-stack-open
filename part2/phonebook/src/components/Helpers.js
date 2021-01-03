import React from 'react';

const Person = ({ person }) => {
    return (
        <li>
            {person.name}: {person.number}
        </li>
    );
};

const Persons = ({ persons }) => {
    return (
        <ul>
            {persons.map(person => (
                <Person key={person.name} person={person} />
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

export default Persons;
export { Filter, Form };
