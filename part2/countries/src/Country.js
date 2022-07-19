const Country = ({name, capital, population, languages, flag}) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital && capital.length ? capital[0] : "Unknown"}</p>
            <p>Population: {population}</p>
            <h2>Languages</h2>
            <ul>
                {languages && Object.keys(languages).length 
                    ? Object.keys(languages).map(lang => 
                        <li key={lang}>{languages[lang]}</li>)
                    : <li>No known languages</li>}
            </ul>
            <span style={{fontSize: '126px'}}>
                {flag}
            </span>
        </div>
    )
}

export default Country