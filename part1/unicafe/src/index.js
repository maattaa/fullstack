import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const SetFeedback = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)
const GetFeedback = ({feedback, number}) => (<p>{feedback} {number}</p>)

//total required a lot
const total = (a, b, c) => (a + b + c)

const TotalFeedback = ({good, neutral, bad}) => (<p>all {total(good, neutral, bad)} </p>)
const Positive = ({good, neutral, bad}) => (<p>positive {(good / total(good, neutral, bad))*100} %</p>)

//on Average good=1, neutral =0, bad = -1, so (good - bad) should do
const Average = ({good, neutral, bad}) => (<p>average {(good - bad) / total(good, neutral, bad)}</p>)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <SetFeedback handleClick={() => setGood(good +1)} text = "good" />
      <SetFeedback handleClick={() => setNeutral(neutral + 1)} text = "neutral" />
      <SetFeedback handleClick={() => setBad(bad + 1)} text = "bad" />
      <h1>statistics</h1>
      <GetFeedback feedback="good" number={good} />
      <GetFeedback feedback="neutral" number={neutral} />
      <GetFeedback feedback="bad" number={bad} />
      <TotalFeedback good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, 
  document.getElementById('root')
)