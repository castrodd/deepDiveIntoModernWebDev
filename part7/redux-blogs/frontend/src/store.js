import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'

const Store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogsReducer
  }
})

export default Store