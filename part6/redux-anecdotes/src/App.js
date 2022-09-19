import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { populateAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll()
      .then(anecdotes => dispatch(populateAnecdotes(anecdotes)))
  })

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
