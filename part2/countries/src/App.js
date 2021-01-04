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

const Countries = ({ countries }) => {
    // const [showCountry, setShowCountry] = useState([]);

    // const show = event => {
    //     let targetCountry = event.target.value;

    //     filteredCountries = countries.filter(country =>
    //         country.name.includes(targetCountry)
    //     );
    //     setShowCountry([targetCountry]);
    //     console.log('filteredC 1', filteredCountries);
    //     console.log('showCountry 1', showCountry);
    // };
    // REWORK EVERYTHING!!!!!!

    if (countries.length === 1) {
        return <CountryData country={countries[0]} />;
    } else if (countries.length <= 10) {
        return countries.map(country => (
            <Country key={country.name} country={country} />
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

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
    );

    // const clickToFilter = country => console.log(country);

    return (
        <>
            <h1>Countries</h1>
            <div>
                Filter countries:{' '}
                <input value={filter} onChange={handleFilterChange} />
            </div>
            <div>
                <Countries
                    key={filteredCountries.name}
                    countries={filteredCountries}
                    // clickToFilter={clickToFilter}
                />
            </div>
        </>
    );
};

export default App;
