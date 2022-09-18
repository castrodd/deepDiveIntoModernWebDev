import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
   console.log("STATE", state) 
   return state.anecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  console.log("Should be anecdotes?", anecdotes)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => a.votes > b.votes ? -1 : 1)

  return (
    <div>
      {
        sortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default AnecdoteList
