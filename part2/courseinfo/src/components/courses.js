import React from 'react'

//Added Courses to loop all courses
const Courses = ({ courses }) => {
    return (courses.map(course => <Course key={course.id} course={course} />));
};

//Takes care of a single course
const Course = ({ course }) => {
    const exercisesTotal = course.parts.reduce((totalExercises, part) => totalExercises + part.exercises, 0);
    return (
        <>
            <h2>{course.name}</h2>
            {course.parts.map((part) =>
            <p key={part.id}>{part.name} {part.exercises}</p>
            )}
            <b>total of {exercisesTotal} exercises</b>
        </>
    );
};

export default Courses;