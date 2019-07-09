import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({capital}) => {
    //State
    const [info, setInfo] = useState({temp_c:0, icon:'', wind:''});
    //Fetch
    useEffect(() => {
        axios
            .get('http://api.apixu.com/v1/current.json?key=d7b966bd0ca6455abd8104353190907&q='+capital)
            .then(response =>{
                const data = response.data.current;
                const newInfo = {
                    temp_c: data.temp_c,
                    icon: data.condition.icon,
                    wind: data.wind_kph + ' direction ' + data.wind_dir
                };
                setInfo(newInfo);
            });
    }, [capital]);
    //Render
    return(
        <div>
            <strong>temperature:</strong> {info.temp_c} Celsius
            <br/>
            <img alt='weather icon' src={info.icon}/>
            <br/>
            <strong>wind:</strong> {info.wind}
        </div>
    );
}

const Country = ({country, unique=false}) => {
    //State
    const [ showMore, setShowMore ] = useState(false);
    //Render conditionally
    if (showMore !== unique){
        return(
            <div>
                <h1>{country.name}</h1>
                <button onClick={() => setShowMore(!showMore)}>{showMore !== unique ? 'close' : 'show' }</button>
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
                <div>
                    <h2>Weather in {country.capital}</h2>
                    <Weather capital={country.capital}/>
                </div>
            </div>
        );
    }

    return (
        <div>
            {country.name}
            <button onClick={() => setShowMore(!showMore)}>{showMore !== unique ? 'close' : 'show' }</button>
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
        return <Country country={countries[0]} unique={true}/>;
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
