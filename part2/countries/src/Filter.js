const Filter = ({value, onChange}) => {
    return (
        <div>
            find countries: <input value={value} onChange={onChange}/>
            <button value={''} onClick={onChange}>Clear</button>
        </div>
    )
}

export default Filter