import { createSlice } from '@reduxjs/toolkit'

const initialNotification = 'Initial notification'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialNotification,
  reducers: {
    addNotification(state = initialNotification, action) {
      return {...state, notification: action.payload}
    },
    removeNotification(state = initialNotification, action) {
      return {...state, notification: ''}
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer