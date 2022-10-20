import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, ADD_BIRTH_YEAR } from '../queries'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS, { pollInterval: 2000 })
  const [addBirthYear] = useMutation(ADD_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  if (!props.show || authors.loading) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const born = Number(birthYear)
    addBirthYear({ variables: { name, born } })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || '?'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add birth year</h3>
      <form onSubmit={submit}>
        <label>
          Name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.data.allAuthors.map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
        </label>
        <div>
          Birth year
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">Set birth year</button>
      </form>
    </div>
  )
}

export default Authors
