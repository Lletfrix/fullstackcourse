import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;
const Statistic = ({text, val, after}) => <tr><td>{text}</td><td>{val} {after}</td></tr>
const Statistics = ({good, neutral, bad, all}) => {
    if (all <= 0){
        return (<p>No feedback given</p>);
    }
    return(
        <table>
            <tbody>
                <Statistic text="good" val={good}/>
                <Statistic text="neutral" val={neutral}/>
                <Statistic text="bad" val={bad}/>
                <Statistic text="average" val={(good-bad)/all}/>
                <Statistic text="positive" val={100*good/all} after="%"/>
            </tbody>
        </table>
    );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {setGood(good + 1);};
  const handleNeutral = () => {setNeutral(neutral + 1);};
  const handleBad = () => {setBad(bad + 1);};
  let all = good + neutral + bad;

  return (
    <div>
        <h1>give feedback</h1>
        <Button onClick={handleGood} text="good"/>
        <Button onClick={handleNeutral} text="neutral"/>
        <Button onClick={handleBad} text="bad"/>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
