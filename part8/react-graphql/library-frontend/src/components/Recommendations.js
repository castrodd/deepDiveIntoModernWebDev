import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ME } from '../queries'
import Books from './Books'

const Recommendations = (props) => {
  const genres = useQuery(ME, { pollInterval: 1000 })
  const [ favoriteGenre, setFavoriteGenre ] = useState(null)

  useEffect(() => {
    if (genres.data && genres.data.me) {
      setFavoriteGenre(genres.data.me.genres[0])
    } else {
      setFavoriteGenre(null)
    } // eslint-disable-next-line
  }, [genres.data])

  if (!props.show) {
    return null
  }

  if (favoriteGenre === null) {
    return (
      <h4>Must be logged in to view this page!</h4>
    )
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <p>Books in your favorite genre: &nbsp;
        <strong>{favoriteGenre}</strong></p>

      <Books 
        show={true} 
        defaultGenre={favoriteGenre}
        showGenreFilters={false} />
    </div>
  )
}

export default Recommendations