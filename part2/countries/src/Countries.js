import Country from './Country'

const Countries = ({countries, onChange}) => {
    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches. Specify another filter.</p>
            </div>
        )
    }

    if (countries.length > 1) {
        const countriesList = countries.map((country) => {
        return (
            <p key={`${country.name}${country.capital}`}>
                {country.name}
                <button 
                    value={encodeURIComponent(JSON.stringify(country))} 
                    onClick={onChange}>
                        Show
                </button>
            </p>
        )})

        return (
            <div>
                {countriesList}
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
            <p>No country data. Please refresh the page.</p>
        </div>
    )
}

export default Countries