import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

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
      <Login 
        show={page === 'login'}
        setToken={setToken} 
        setError={setErrorMessage}
        setPage={setPage} />
    </div>
  )
}

export default App
