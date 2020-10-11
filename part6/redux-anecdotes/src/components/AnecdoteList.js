import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
      <div>
        {sortedAnecdotes.map(anec => <Anecdote
          key={anec.id}
          anecdote={anec}
          handleClick={() => dispatch(voteAnecdote(anec.id))}
        />
        )}
      </div>
  )
}

export default Anecdotes