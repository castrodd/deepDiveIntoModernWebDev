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
        let countries = response.data.map(country => {
          let scopedCountry = {
            name: country.name.common,
            capital: country.capital,
            population: country.population,
            languages: country.languages,
            flag: country.flag
          }

          return scopedCountry
        })
        setCountries(countries.sort(country => country.name))
        console.log(`OK -- ${response.data.length} countries fetched.`)
      })
  }, [])

  const addFilter = (event) => setFilter(event.target.value)

  const filteredCountries =
    (filter !== '')
      ? countries.filter(c => c.name.toLowerCase().startsWith(filter.toLowerCase()))
      : countries

  return (
    <div>
      <Filter value={filter} onChange={addFilter} />
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
