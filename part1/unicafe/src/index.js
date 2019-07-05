import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [ counter, setCounter ] = useState(0)

    const setVal = (value) => () => setCounter(value);

    return (
        <div>
            <div>{counter}</div>
            <button onClick={setVal(counter + 1)}>
                plus
            </button>
            <button onClick={setVal(0)}>
                zero
            </button>
        </div>
    );
};

/* Passing state to child components */

ReactDOM.render(<App />, document.getElementById('root'));
