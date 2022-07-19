import Country from './Country'

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches. Specify another filter.</p>
            </div>
        )
    }

    if (countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    }

    return (
        <div>
            {countries.map(country => 
                <p key={`${country.name}${country.capital}`}>{country.name}</p>
            )}
        </div>
    )
}

export default Countries