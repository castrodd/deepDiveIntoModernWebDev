const Persons = ({persons, removePerson}) => {
    if (persons && persons.length) {
        return (
            <div>
                {persons.map(person => 
                    <p key={person.name}>
                        {person.name} {person.number}
                        <button value={person.id} onClick={removePerson}>
                            Delete
                        </button>
                    </p>
                )}
            </div>
        )
    }
}

export default Persons