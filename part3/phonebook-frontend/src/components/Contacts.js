import React from 'react';

const Contact = ({name, number, del}) => {
    return(
        <div>
            {name} | {number}
            <button onClick={() => del(name)}>delete</button>
        </div>
    );
};

const Contacts = ({contacts, del}) =>
    <div>
        {contacts.map(person => <Contact name={person.name} number={person.number} del={del} key={person.name}/>)}
    </div>;

export default Contacts;
