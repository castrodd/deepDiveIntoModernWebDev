import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdotes = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: anecdotes,
  reducers: {
    addVote(state, action) {
      let newState = state.map(anecdote => {
        if (anecdote.id === action.payload) {
          return {...anecdote, votes: anecdote.votes + 1}
        } 
        return anecdote
      })
      return newState
    },
    addAnecdote(state, action) {
        state.push(action.payload)
    },
    populateAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(populateAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdotesService.create(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const modifyVote = anecdote => {
  return async dispatch => {
    await anecdotesService.modify(anecdote)
    dispatch(addVote(anecdote.id))
  }
}

export const { addVote, addAnecdote, populateAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
