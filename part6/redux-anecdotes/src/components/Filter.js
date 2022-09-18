import { useDispatch } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const changeFilter = (event) => {
    event.preventDefault()
    const filter = event.target.value
    dispatch(updateFilter(filter))
  }

  return (
    <div>
      <input onChange={changeFilter}  name='filter' />
    </div>
  )
}

export default Filter
