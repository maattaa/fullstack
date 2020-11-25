import React, { PropsWithChildren, ReactElement, ValidationMap, WeakValidationMap } from "react";
import ReactDOM from "react-dom";


type FC<P = unknown> = FunctionComponent<P>;

interface FunctionComponent<P = unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: PropsWithChildren<P>, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

interface CourseName {
  courseName: string;
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Header: FC<CourseName> = (props) => {
  return <h1>{props.courseName}</h1>
}

const Part: FC<{ part: CoursePart }> = ({ part }) => {
  return (
    <p>{part.name} {part.exerciseCount}</p>
  );
};

const Content: FC<{ parts: CoursePart[] }> = ({ parts }) => {
  parts.forEach(c => console.log(c))
  return (
    <div>
      {parts.map(p => <Part key={p.name} part={p} />)}
    </div>
  );
};

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

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));