import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.title}</h1>
    );
};

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    );
};

const Content = (props) => {
    return (
        <div>
            <Part part={props.p[0].name} exercises={props.p[0].exercises}/>
            <Part part={props.p[1].name} exercises={props.p[1].exercises}/>
            <Part part={props.p[2].name} exercises={props.p[2].exercises}/>
            </div>
    );
};

const Total = (props) => {
    const p = props.parts;
    return (
        <p>Number of exercises {p[0].exercises + p[1].exercises + p[2].exercises}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
        ]
    };

  return (
    <div>
      <Header title={course.name}/>
      <Content p={course.parts}/>
      <Total parts={course.parts}/>
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
