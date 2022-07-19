import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        let names = response.data.map(country => country.name.common)
        setCountries(names.sort())
        console.log(`OK -- ${response.data.length} countries fetched.`)
      })
  }, [])

  const addFilter = (event) => setFilter(event.target.value)

  const filteredCountries =
    (filter !== '')
      ? countries.filter(c => c.toLowerCase().startsWith(filter.toLowerCase()))
      : countries

  return (
    <div>
      <Filter value={filter} onChange={addFilter} />
      <h3>Numbers</h3>
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
