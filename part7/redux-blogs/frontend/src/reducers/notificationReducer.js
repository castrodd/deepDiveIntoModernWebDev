import { createSlice } from '@reduxjs/toolkit'

const initialNotification = null
let timeoutId = 0

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialNotification,
  reducers: {
    addNotification(state = initialNotification, action) {
      return action.payload
    },
    removeNotification(state = initialNotification, action) {
      return null
    }
  }
})

export const setNotification = (status, content, duration) => {
  return dispatch => {
    dispatch(addNotification({
      status: status,
      content: content
    }))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => dispatch(removeNotification()), duration * 1000)
  }
}


export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
