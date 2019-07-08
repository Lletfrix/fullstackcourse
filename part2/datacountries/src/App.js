import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({country}) => {
    const [ showMore, setShowMore ] = useState(false);
    if (showMore){
        return(
            <div>
            <h1>{country.name}</h1>
            <button onClick={() => setShowMore(!showMore)}>{showMore ? 'close' : 'show' }</button>
            <div>
                capital {country.capital}
                <br/>
                population {country.population}
            </div>
            <h2>languages</h2>
            <ul>
                {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag' height='90 pt'/>
        </div>
        );
    }

    return (
        <div>
            {country.name}
            <button onClick={() => setShowMore(!showMore)}>{showMore ? 'close' : 'show' }</button>
        </div>
    );
};

const Countries = ({countries, input}) =>{
    if(!input) return <p>Write something to start searching...</p>;

    if (countries.length > 10){
        return (<p> Too many matches, specify another filter.</p>);
    }else if (countries.length === 0){
        return (<p> There are no countries to show.</p>);
    }else if (countries.length === 1){
        return <Country country={countries[0]}/>;
    }

    return (
        <div>
            {countries.map(country => <Country country={country} key={country.numericCode}/>)}
        </div>
    );
};

const App = () => {
    //Vars and State
    const [input, setInput] = useState('');
    const [countries, setCountries] = useState([]);

    const countriesToShow = input ?
        countries.filter(country => country.name.toLowerCase().includes(input.toLowerCase())) :
        countries;

    const inputHandler = (event) => {
        const val = event.target.value;
        setInput(val);
    }
    //Fetch
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then( response =>{
                setCountries(response.data);
            });
    }, []);
    //Render
    return(
        <div>
            find countries <input value={input} onChange={inputHandler}/>
        <Countries countries={countriesToShow} input={input}/>
        </div>

    );
};

export default App;
