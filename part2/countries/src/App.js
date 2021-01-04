import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Country = ({ country }) => <div>{country.name}</div>;

const Language = ({ language }) => <li>{language}</li>;

const CountryData = ({ country }) => {
    return (
        <>
            <h2>{country.name}</h2>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => (
                    <Language
                        key={language.iso639_2}
                        language={language.name}
                    />
                ))}
            </ul>
            <img src={country.flag} alt="country flag" id="flag" />
        </>
    );
};

const Countries = ({ countries, filter }) => {
    const [showCountry, setShowCountry] = useState('');
    let filteredCountries;
    let targetCountry;
    const show = event => {
        targetCountry = countries.filter(country =>
            country.name.includes(event.target.value)
        );
        setShowCountry(showCountry);
    };
    // REWORK EVERYTHING!!!!!!
    if (showCountry) {
        filteredCountries = countries.filter(country =>
            country.name.includes(targetCountry)
        );
    } else {
        filteredCountries = countries.filter(country =>
            country.name.toLowerCase().includes(filter.toLowerCase())
        );
    }

    if (filteredCountries.length === 1) {
        return <CountryData country={filteredCountries[0]} />;
    } else if (showCountry) {
        return <CountryData country={showCountry[0]} />;
    } else if (filteredCountries.length <= 10) {
        return filteredCountries.map(country => (
            <>
                <Country key={country.name} country={country} />
                <button value={country.name} onClick={show}>
                    show
                </button>
            </>
        ));
    }
    return 'Too many matches, specify another filter';
};

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(res => {
            setCountries(res.data);
        });
    }, []);

    const handleFilterChange = event => {
        setFilter(event.target.value);
    };

    const clickToFilter = country => console.log(country);

    return (
        <>
            <h1>Countries</h1>
            <div>
                Filter countries:{' '}
                <input value={filter} onChange={handleFilterChange} />
            </div>
            <div>
                <Countries
                    key={countries.name}
                    countries={countries}
                    filter={filter}
                    clickToFilter={clickToFilter}
                />
            </div>
        </>
    );
};

export default App;
