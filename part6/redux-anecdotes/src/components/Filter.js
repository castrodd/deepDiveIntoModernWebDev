import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const changeFilter = (event) => {
    event.preventDefault()
    const filter = event.target.value
    props.updateFilter(filter)
  }

  return (
    <div>
      <input onChange={changeFilter}  name='filter' />
    </div>
  )
}

const mapDispatchToProps = {
  updateFilter
}

export default connect(null, mapDispatchToProps)(Filter)
