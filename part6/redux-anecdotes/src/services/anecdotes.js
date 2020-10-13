import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const object = { 
    content: anecdote,
    votes: 0
   }
  console.log(object)
  const response = await axios.post(baseUrl, object)
  console.log(response)
  return response.data
}

const vote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  console.log('haettu anecdote', anecdote)
  const voteIncrease = {
    votes: anecdote.data.votes + 1
  }
  console.log('vote increase', voteIncrease)
  const response = await axios.patch(`${baseUrl}/${id}`, voteIncrease)
  console.log('response', response)
  return response.data
}

export default {
  getAll,
  createNew,
  vote
}