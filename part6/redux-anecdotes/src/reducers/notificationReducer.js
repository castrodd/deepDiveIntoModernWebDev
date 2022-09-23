import { createSlice } from '@reduxjs/toolkit'

const initialNotification = ''
let timeoutId = 0

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialNotification,
  reducers: {
    addNotification(state = initialNotification, action) {
      return action.payload
    },
    removeNotification(state = initialNotification, action) {
      return ''
    }
  }
})

export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch(addNotification(`${message}`))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => dispatch(removeNotification()), duration*1000)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
