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
    createAnecdote(state, action) {
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

export const { addVote, createAnecdote, populateAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
