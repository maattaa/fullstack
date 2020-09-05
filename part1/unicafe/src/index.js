import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const SetFeedback = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

//total of feedbacks
const total = (a, b, c) => (a + b + c)

//on Average good=1, neutral =0, bad = -1, so (good - bad) should do
const Statistics = ({good, neutral, bad}) => {  

  let stats = <p>No feedback given</p>; 
  if (good || neutral || bad) {
    stats = (
      <>
        <p><Statistic text="good" value={good} /></p>
        <p><Statistic text="neutral" value={neutral} /></p>
        <p><Statistic text="bad" value={bad} /></p>
        <p><Statistic text="all" value={good+neutral+bad} /> </p>
        <p><Statistic text="average" value={(good - bad) / total(good, neutral, bad)} /></p>
        <p><Statistic text="positive" value={(good / total(good, neutral, bad))*100} /> %</p>
    </> );
  }

  return (
      <>
        <h1>statistics</h1>
        {stats}
      </>
    );
}

const Statistic = ({text, value}) => {
  return(
    <>
      {text} {value}
    </>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, 
  document.getElementById('root')
)