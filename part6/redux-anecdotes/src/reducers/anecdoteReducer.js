import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.',
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state = initialState, action) {
      let newState = state.map(anecdote => {
        if (anecdote.id === action.payload) {
          return {...anecdote, votes: anecdote.votes + 1}
        } 
        return anecdote
      })
      return newState
    },
    createAnecdote(state = initialState, action) {
      const newAnecdote = asObject(action.payload)
      return [...state, newAnecdote]
    }
  }
})

export const { addVote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
