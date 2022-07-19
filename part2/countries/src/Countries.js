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
        let country = countries[0]
        return (
            <Country 
                name={country.name} 
                capital={country.capital}
                population={country.population}
                languages={country.languages}
                flag={country.flag}    
            />
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