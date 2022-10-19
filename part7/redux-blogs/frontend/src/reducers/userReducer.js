import { createSlice } from '@reduxjs/toolkit'

const initialUser = null

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    updateUser(state = initialUser, action) {
      return action.payload
    }
  }
})

export const setUser = (user) => {
  return dispatch => {
    dispatch(updateUser(user))
  }
}

export const { updateUser } = userSlice.actions
export default userSlice.reducer