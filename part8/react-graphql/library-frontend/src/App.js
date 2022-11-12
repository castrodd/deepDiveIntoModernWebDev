import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommend</button>

        {token 
          ? <button onClick={() => logout()}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      {errorMessage && <p>{errorMessage}</p>}

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook 
        show={page === 'add'}
        setError={setErrorMessage}
        setPage={setPage} />
      <Recommendations show={page === 'recommendations'} />
      <Login 
        show={page === 'login'}
        setToken={setToken} 
        setError={setErrorMessage}
        setPage={setPage} />
    </div>
  )
}

export default App
