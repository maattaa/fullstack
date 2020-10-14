import React from 'react'
import { connect } from 'react-redux'
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

const Anecdotes = (props) => {

  const anecdotes = props.anecdotes.filter(a =>
    a.content.toLowerCase().includes(props.filter.toLowerCase()))

  const sortedAnecdotes = [...anecdotes]
    .sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anec => <Anecdote
        key={anec.id}
        anecdote={anec}
        handleClick={() => {
          props.voteAnecdote(anec.id)
          props.notificationSet(`You voted for '${anec.content}'`, 5)
        }}
      />
      )}
    </div>
  )
}

const mapDispatchToProps = {
  voteAnecdote,
  notificationSet
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes