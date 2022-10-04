import { createSlice } from '@reduxjs/toolkit'

const initialNotification = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotification,
  reducers: {
    addNotification(state, action) {
      return action.payload
    }
  }
})

export const { addNotification } = notificationSlice.actions
export default notificationSlice.reducer