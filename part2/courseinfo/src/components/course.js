import React from 'react';

const Header = ({ course }) => {
    return (
        <>
            <h1>{course}</h1>
        </>
    );
};

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part, id) => (
                <Part key={id} part={part} />
            ))}
        </>
    );
};

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <>
            <b>Number of exercises {total}</b>
        </>
    );
};

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

export default Course;
