import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
})

client.query({ query: ALL_AUTHORS })
  .then((response) => {
    console.log('DATA', response.data)
  })

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
