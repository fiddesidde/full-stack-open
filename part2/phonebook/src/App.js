import React, { useState, useEffect } from 'react';
import Persons, { Form, Filter } from './components/Helpers';
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    // useEffect(() => {
    //     axios.get('http://localhost:3001/persons').then(res => {
    //         setPersons(res.data);
    //     });
    // }, []);

    const getPersons = () => {
        personService
            .getAll()
            .then(currentPersons => setPersons(currentPersons));
    };

    useEffect(getPersons, []);

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

        personService.post(personObj).then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            setNewName('');
            setNewNumber('');
        });
    };

    const deletePerson = id => {
        personService.destroy(id).then(() => {
            setPersons(persons.filter(person => person.id !== id));
        });
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
            <Persons persons={personsToShow} deletePerson={deletePerson} />
        </>
    );
};

export default App;
