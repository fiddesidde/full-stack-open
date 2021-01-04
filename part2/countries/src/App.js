import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Country = ({ country, handleFilterChange }) => {
    return (
        <div>
            {country.name}{' '}
            <button value={country.name} onClick={handleFilterChange}>
                Show
            </button>
        </div>
    );
};

const Language = ({ language }) => <li>{language}</li>;

const CountryData = ({ country }) => {
    const [weatherData, setWeatherData] = useState({});
    useEffect(() => {
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
            )
            .then(res => setWeatherData(res.data));
    }, []);
    console.log('wData', weatherData);

    if (weatherData.current) {
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
                <h2>Weather in {country.name}</h2>
                <div>
                    <p> Temperature: {weatherData.current.temperature} C</p>
                    <img
                        src={weatherData.current.weather_icons[0]}
                        alt="weather symbol"
                    />
                    <p>
                        Wind: {weatherData.current.wind_speed} m/s{' '}
                        {weatherData.current.wind_dir}
                    </p>
                </div>
            </>
        );
    } else {
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
                <h2>Weather in {country.name}</h2>
                <div>Loading ..</div>
            </>
        );
    }
};

const Countries = ({ countries, handleFilterChange }) => {
    if (countries.length === 1) {
        return <CountryData country={countries[0]} />;
    } else if (countries.length <= 10) {
        return countries.map(country => (
            <Country
                key={country.name}
                country={country}
                handleFilterChange={handleFilterChange}
            />
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
                    handleFilterChange={handleFilterChange}
                />
            </div>
        </>
    );
};

export default App;
