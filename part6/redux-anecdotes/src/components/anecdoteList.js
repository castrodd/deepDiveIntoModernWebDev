import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
   return state.anecdotes
  })
  const dispatch = useDispatch()

  const vote = ({content, id}) => {
    dispatch(addVote(id))
    dispatch(addNotification(`Voted for "${content}"`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default AnecdoteList
