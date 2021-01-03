import React, { useState } from 'react';
import Persons, { Form, Filter } from './components/Helpers';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Fredrik Mellberg', number: '123 123' },
        { name: 'Bertram Tran', number: '555 123' },
        { name: 'Steven Gerrard', number: '123-785 64' },
        { name: 'Lisa Kudrow', number: '555 234 55' },
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const addPerson = event => {
        event.preventDefault();

        if (persons.filter(e => e.name === newName).length > 0) {
            setNewName('');
            return alert(`${newName} is already in the phonebook!`);
        }

        const personObj = {
            name: newName,
            number: newNumber,
        };
        setPersons(persons.concat(personObj));
        setNewName('');
        setNewNumber('');
    };

    const handleNameChange = event => {
        setNewName(event.target.value);
    };
    const handleNumberChange = event => {
        setNewNumber(event.target.value);
    };
    const handleFilterChange = event => {
        setFilter(event.target.value);
    };

    const personsToShow = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <>
            <h1>Phonebook</h1>
            <Filter filter={filter} handle={handleFilterChange} />
            <h2>Add person</h2>
            <Form
                submit={addPerson}
                name={newName}
                number={newNumber}
                handleName={handleNameChange}
                handleNumber={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </>
    );
};

export default App;
