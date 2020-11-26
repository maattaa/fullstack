import React from 'react';
import {FC, CoursePart} from '../../types';

const Total: FC<{ parts: CoursePart[] }> = ({ parts }) => {
  const reducer = ((state: number, value: CoursePart) => state + value.exerciseCount);
  const total = parts.reduce(reducer, 0);

  return (
    <div>
      <p>
       Number of exercises {total}
      </p>
    </div>
  )
}

export default Total