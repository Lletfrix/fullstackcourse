import React, { useState } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
    // Variables and state:
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [ newName, setNewName ] = useState('');
    const [ newPhone, setNewPhone ] = useState('');
    const [ filter, setFilter ] = useState('');
    const visiblePersons = filter ? persons.filter(person => person.name.startsWith(filter)) : persons;

    const handlerForm = (event) => {
        event.preventDefault();
        const newPerson = {name : newName, number: newPhone};
        if (persons.map(person => person.name).includes(newPerson.name)){
            alert( newPerson.name + ' is already added to phonebook');
            return;
        }
        if (!newPerson.number || !newPerson.name){
            alert('Name and number cannot be blank');
            return;
        }
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewPhone('');
    };
    
    // Rendering
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} filtfunc={setFilter}/>
            <h2>Add a new one:</h2>
            <Form name={newName} phone={newPhone} submit={handlerForm} namefunc={setNewName} phonefunc={setNewPhone}/>
            <h2>Numbers</h2>
            <Contacts contacts={visiblePersons}/>
        </div>
    )
}

export default App
