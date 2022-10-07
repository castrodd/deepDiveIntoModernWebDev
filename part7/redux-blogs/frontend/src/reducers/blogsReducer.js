import { createSlice } from '@reduxjs/toolkit'

const initialBlogs = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: initialBlogs,
  reducers: {
    updateBlogs(state = initialBlogs, action) {
      return action.payload
    }
  }
})

export const setBlogs = (blogs) => {
  return dispatch => {
    dispatch(updateBlogs(blogs))
  }
}


export const { updateBlogs } = blogsSlice.actions
export default blogsSlice.reducer
