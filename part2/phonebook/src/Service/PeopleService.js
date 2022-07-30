import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const get = id => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
  
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
  
const update = (id, newObject) => {
    console.log(newObject)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    if (window.confirm(`Are you sure you want to delete this user?`)) {
        const request = axios.delete(`${baseUrl}/${id}`)
        return request.then(response => response.data)
    }
}
  
const PeopleService = { getAll, get, create, update, remove }

export default PeopleService