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

export interface CoursePart {
  name: string;
  exerciseCount: number;
}