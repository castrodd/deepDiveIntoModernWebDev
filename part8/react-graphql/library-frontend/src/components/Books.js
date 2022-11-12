import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS, { pollInterval: 2000 })
  const [ genreFilter, setGenreFilter ] = useState('')
  let allGenres = []

  useEffect(() => {
    if (props.defaultGenre) {
      setGenreFilter(props.defaultGenre)
    } // eslint-disable-next-line
  }, [])

  if (!props.show || books.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks
            .filter(book => {
              if (!genreFilter) return true

              if (book.genres.includes(genreFilter)) return true

              return false
            })
            .map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {books.data.allBooks.forEach(book => {
          book.genres.forEach(genre => {
            if (!allGenres.includes(genre)) allGenres.push(genre)
          })
      })}
        
      
      {props.showGenreFilters && allGenres.map(genre => (
        <button onClick={() => setGenreFilter(genre)}>{genre}</button>
      ))}

      {props.showGenreFilters && 
        <button onClick={() => setGenreFilter('')}>all genres</button>}
    </div>
  )
}

Books.defaultProps = {
  defaultGenre: null,
  showGenreFilters: true
}

export default Books
