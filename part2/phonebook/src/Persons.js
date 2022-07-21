const Persons = ({persons}) => {
    if (persons && persons.length) {
        return (
            <div>
                {persons.map(person => 
                    <p key={person.name}>{person.name} {person.number}</p>
                )}
            </div>
        )
    }
}

export default Persons