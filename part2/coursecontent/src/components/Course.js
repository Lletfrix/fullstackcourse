import React from 'react';


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

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
        </div>
    );
};

const Total = ({parts}) => {
    const total = (parts.map(part => part.exercises)).reduce((total, current) => total + current);
    return (
        <h3>total of {total} exercises</h3>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    );
};

export default Course;
