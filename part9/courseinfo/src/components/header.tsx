import React from 'react';
import {FC, CourseName} from '../../types';

const Header: FC<CourseName> = (props) => {
  return <h1>{props.courseName}</h1>
}

export default Header