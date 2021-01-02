import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Fredrik Mellberg' }]);
    const [newName, setNewName] = useState('');

    const addName = event => {
        event.preventDefault();

        if (persons.filter(e => e.name === newName).length > 0) {
            setNewName('');
            return alert(`${newName} is already in the phonebook!`);
        }

        const personObj = {
            name: newName,
        };
        setPersons(persons.concat(personObj));
        setNewName('');
    };

    const handleNameChange = event => {
        setNewName(event.target.value);
    };

    return (
        <>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => (
                    <Person key={person.name} person={person} />
                ))}
            </ul>
        </>
    );
};

export default App;
