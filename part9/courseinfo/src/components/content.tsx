import React from 'react';
import {FC, CoursePart} from '../../types';
import Part from './part';

const Content: FC<{ parts: CoursePart[] }> = ({ parts }) => {
  parts.forEach(c => console.log(c))
  return (
    <div>
      {parts.map(p => <Part key={p.name} part={p} />)}
    </div>
  );
};

export default Content