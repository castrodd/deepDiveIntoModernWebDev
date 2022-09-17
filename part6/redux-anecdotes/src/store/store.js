import { configureStore } from '@reduxjs/toolkit'
import reducer from '../reducers/anecdoteReducer'

const Store = configureStore({reducer})

export default Store
