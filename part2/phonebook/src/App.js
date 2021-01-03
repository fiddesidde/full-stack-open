import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Fredrik Mellberg', number: '123 123' },
        { name: 'Fred berg', number: '12332344123' },
        { name: 'Fik M', number: '56138135' },
        { name: 'fredrik mellberg', number: '8878' },
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
        return person.name.toLowerCase().includes(filter);
    });

    return (
        <>
            <h1>Phonebook</h1>
            <div>
                filter: <input value={filter} onChange={handleFilterChange} />
            </div>
            <h2>Add person</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                    <br />
                    number:{' '}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map(person => (
                    <Person key={person.name} person={person} />
                ))}
            </ul>
        </>
    );
};

export default App;
