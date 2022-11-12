import { useQuery } from '@apollo/client'
import { ME } from '../queries'
import Books from './Books'

const Recommendations = (props) => {
  const genres = useQuery(ME, { pollInterval: 2000 })

  if (!props.show || genres.loading) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <p>Books in your favorite genre: &nbsp;
        <strong>{genres.data.me.genres[0]}</strong></p>

      <Books 
        show={true} 
        defaultGenre={genres.data.me.genres[0]}
        showGenreFilters={false} />
    </div>
  )
}

export default Recommendations