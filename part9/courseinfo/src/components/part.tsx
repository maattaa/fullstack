import React from 'react';
import { FC, CoursePart } from '../../types';

const Part: FC<{ part: CoursePart }> = ({ part }) => {


  switch (part.name) {
    case "Fundamentals":
      return (
        <p>{part.name} {part.exerciseCount} {part.description} </p>
      )
    case "Using props to pass data":
      return (
        <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
      )
    case "Deeper type usage":
      return (
        <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
      )
    case "Special type of course":
      return (
        <p>{part.name} {part.exerciseCount} {part.description} {part.rating} </p>
      )
    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part