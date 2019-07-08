import React from 'react';

const Contact = ({name, number}) => <p>{name} | {number}</p>;

const Contacts = ({contacts}) =>
    <div>
        {contacts.map(person => <Contact name={person.name} number={person.number} key={person.name}/>)}
    </div>;

export default Contacts;
