import React, { useState, useEffect } from 'react';
import Persons, {
    Form,
    Filter,
    Notification,
    ErrorMessage,
} from './components/Helpers';
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notice, setNotice] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const getPersons = () => {
        personService
            .getAll()
            .then(currentPersons => setPersons(currentPersons));
    };
    useEffect(getPersons, []);

    const updatePersonNumber = () => {
        const person = persons.find(person => person.name === newName);
        const changedPerson = { ...person, number: newNumber };
        personService
            .update(changedPerson.id, changedPerson)
            .then(returnedPerson => {
                setPersons(
                    persons.map(person =>
                        person.id !== returnedPerson.id
                            ? person
                            : returnedPerson
                    )
                );
                setNotice(`'${returnedPerson.name}' was updated`);
                setTimeout(() => setNotice(null), 5000);
            })
            .catch(err => {
                console.log(err);

                setErrorMessage(
                    `'${changedPerson.name}' has already been removed from the server`
                );
                setTimeout(() => setErrorMessage(null), 5000);
                setPersons(
                    persons.filter(person => person.id !== changedPerson.id)
                );
            });
    };

    const addPerson = event => {
        event.preventDefault();

        if (persons.filter(person => person.name === newName).length > 0) {
            const result = window.confirm(
                `${newName} is already in the phonebook! Update phone number?`
            );
            if (result === true) {
                updatePersonNumber();
            }
            setNewName('');
            setNewNumber('');
            return null;
        }

        const personObj = {
            name: newName,
            number: newNumber,
        };

        personService
            .post(personObj)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setNewNumber('');
                setNotice(`'${returnedPerson.name}' was created`);
                setTimeout(() => setNotice(null), 5000);
            })
            .catch(error => {
                setErrorMessage(error.response.data.error);
                setTimeout(() => setErrorMessage(null), 5000);
            });
    };

    const deletePerson = id => {
        const name = persons.find(person => person.id === id).name;
        if (window.confirm(`Delete ${name}?`)) {
            personService.destroy(id).then(() => {
                setPersons(persons.filter(person => person.id !== id));
            });
        }
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
            <Notification message={notice} />
            <ErrorMessage message={errorMessage} />
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
