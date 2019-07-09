import React, { useState, useEffect } from 'react';

import Contacts from './components/Contacts';
import Filter from './components/Filter';
import Form from './components/Form';
import contactService from './services/contacts'

const App = () => {
    // Variables and state:
    const [persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newPhone, setNewPhone ] = useState('');
    const [ filter, setFilter ] = useState('');
    const visiblePersons = filter ? persons.filter(person => person.name.startsWith(filter)) : persons;

    const handlerForm = (event) => {
        event.preventDefault();
        const newPerson = {name : newName, number: newPhone};

        if (!newPerson.number || !newPerson.name){
            alert('Name and number cannot be blank');
            return;
        }

        if (persons.map(person => person.name).includes(newPerson.name)){
            if (!window.confirm( newPerson.name + ' is already added to phonebook, replace old number?')){
                return;
            }
            const toUpdate = persons.find(p => p.name === newPerson.name);
            contactService
                .update(toUpdate.id, newPerson)
                .then(newPer => {
                    setPersons(persons.map(p => p.name !== newPer.name ? p : newPer));
                    setNewName('');
                    setNewPhone('');
                })
                .catch(() => alert('User couldn\'t be added'));
            return;
        }

        contactService
            .add(newPerson)
            .then(newPer =>{
                setPersons(persons.concat(newPer));
                setNewName('');
                setNewPhone('');
            })
            .catch(() => alert('User couldn\'t be added'));
    };

    const delAction = name => {
        const toDelete = persons.find(p => p.name === name);
        if (!window.confirm('Delete '+toDelete.name+'?')){
            return;
        }
        contactService
            .del(toDelete.id)
            .then(
                setPersons(persons.filter(p => p.id !== toDelete.id))
            );
    };

    //Fetch data from sv
    useEffect(() => {
        contactService.getAll().then(ppl => setPersons(ppl));
    },[]);

    // Rendering
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} filtfunc={setFilter}/>
            <h2>Add a new one:</h2>
            <Form name={newName} phone={newPhone} submit={handlerForm} namefunc={setNewName} phonefunc={setNewPhone}/>
            <h2>Numbers</h2>
            <Contacts contacts={visiblePersons} del={delAction}/>
        </div>
    )
}

export default App
