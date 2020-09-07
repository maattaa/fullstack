import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
  );

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  //maxVotes is the number of anecdote that has the most votes
  const [maxVotes, setMaxVotes] = useState(0);

  //event handler to update votes
  const addVote =() => {
    const newVotes = [...votes]
    newVotes[selected]+=1
    setVotes(newVotes)
    maxVote()
  };

  //check if current anecdote has more votes than the previous most voted
  const maxVote = () => {
    if (votes[selected] >= votes[maxVotes]) (
      setMaxVotes(selected)
    );
  };

  const nextAnecdote = () => setSelected(Math.floor(Math.random() * (anecdotes.length)));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={() => addVote()} text = "vote" />
      <Button handleClick={() => nextAnecdote()} text = "next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={props.anecdotes[maxVotes]} votes={votes[maxVotes]} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);