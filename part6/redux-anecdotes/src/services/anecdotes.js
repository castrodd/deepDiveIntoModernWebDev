import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const fullAnecdote = asObject(anecdote)
  const response = await axios.post(baseUrl, fullAnecdote)
  return response.data
}

const modify = async (anecdote) => {
  const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
  return response.data
}

const anecdotesService = { getAll, create, modify }
export default anecdotesService