import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdotes = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: anecdotes,
  reducers: {
    addVote(state = anecdotes, action) {
      let newState = state.map(anecdote => {
        if (anecdote.id === action.payload) {
          return {...anecdote, votes: anecdote.votes + 1}
        } 
        return anecdote
      })
      return newState
    },
    createAnecdote(state = anecdotes, action) {
      const newAnecdote = asObject(action.payload)
      return [...state, newAnecdote]
    },
    populateAnecdotes(state = anecdotes, action) {
      return action.payload
    }
  }
})

export const { addVote, createAnecdote, populateAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
