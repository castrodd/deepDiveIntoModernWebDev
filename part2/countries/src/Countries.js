const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches. Specify another filter.</p>
            </div>
        )
    }
    return (
        <div>
            {countries.map(country => 
                <p key={country}>{country}</p>
            )}
        </div>
    )
}

export default Countries