import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text, votes, best = false}) => {
    if(best === true){
        if(votes === 0){
            return <div>No voting has ocurred yet</div>
        }
    }
    return (<div>{text}<br/>has {votes} votes</div>);
};

//    Generates a random integer in the range [min, max)
function randInt(min, max) {
    return (Math.floor(Math.random()*(max-min)+min));
};

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [voting, setVoting] = useState(Array(props.anecdotes.length).fill(0));
    const [best, setBest] = useState(0);

    const handleNext = () => setSelected(randInt(0, props.anecdotes.length));
    const handleVote = () => {
        const newVoting = voting.slice();
        newVoting[selected]++;
        setVoting(newVoting);
        if (newVoting[selected] > newVoting[best]){
            setBest(selected);
        }
    };
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote text={props.anecdotes[selected]} votes={voting[selected]}/>
            <button onClick={handleVote}>vote</button>
            <button onClick={handleNext}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <Anecdote text={props.anecdotes[best]} votes={voting[best]} best={true}/>
        </div>
    );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
