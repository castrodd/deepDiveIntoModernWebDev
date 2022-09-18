import { createSlice } from '@reduxjs/toolkit'

const initialFilter = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilter,
  reducers: {
    updateFilter(state = initialFilter, action) {
      return action.payload
    }
  }
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer
