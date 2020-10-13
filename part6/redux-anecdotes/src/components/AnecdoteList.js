import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return (
      state.anecdotes.filter(a => 
        a.content.toLowerCase().includes(state.filter.toLowerCase()))
    )
  })
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
      <div>
        {sortedAnecdotes.map(anec => <Anecdote
          key={anec.id}
          anecdote={anec}
          handleClick={() => {
            dispatch(voteAnecdote(anec.id))
            dispatch(notificationSet(`You voted for '${anec.content}'`, 5))
          }}
        />
        )}
      </div>
  )
}

export default Anecdotes