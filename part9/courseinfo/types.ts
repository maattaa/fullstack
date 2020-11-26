import { PropsWithChildren, ReactElement, ValidationMap, WeakValidationMap } from 'react';

export type FC<P = unknown> = FunctionComponent<P>;

export interface FunctionComponent<P = unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: PropsWithChildren<P>, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export interface CourseName {
  courseName: string;
}

 interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

 interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface OwnCoursePart extends CoursePartDescription {
  name: "Special type of course";
  rating: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | OwnCoursePart;
