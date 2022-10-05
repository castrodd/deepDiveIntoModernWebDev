import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

const Store = configureStore({
  reducer: {
    notifications: notificationReducer
  }
})

export default Store