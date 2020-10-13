import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('anecdote state now: ', state)
  console.log('anecdote action', action)
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
    }
    case 'ADD': {
      return [...state, action.data]
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default:
      return state
  }
}

export default anecdoteReducer