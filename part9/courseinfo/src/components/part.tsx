import React from 'react';
import {FC, CoursePart} from '../../types';

const Part: FC<{ part: CoursePart }> = ({ part }) => {
  return (
    <p>{part.name} {part.exerciseCount}</p>
  );
};

export default Part