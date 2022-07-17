const Filter = (props) => {
    return (
        <div>
            search: <input value={props.value} onChange={props.onChange}/>
        </div>
    )
}

export default Filter