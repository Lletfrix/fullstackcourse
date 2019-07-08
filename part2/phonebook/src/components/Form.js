import React from 'react';

const Form = ({submit, name, phone, namefunc, phonefunc}) => {
    return (
        <form onSubmit={submit}>
        <div>
            name: <input value={name} onChange={(event) => namefunc(event.target.value)}/>
            <br/>
            number: <input value={phone} onChange={(event) => phonefunc(event.target.value)}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    );
}

export default Form;
