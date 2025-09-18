import { createSlice } from '@reduxjs/toolkit'

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    searchHistory: []
  },
  reducers: {
    addWeatherSearch: (state, action) => {
      state.searchHistory.unshift(action.payload)
    },
    loadWeatherHistory: (state, action) => {
      state.searchHistory = action.payload
    },
    clearWeatherHistory: (state) => {
      state.searchHistory = []
    }
  }
})

export const { addWeatherSearch, loadWeatherHistory, clearWeatherHistory } = weatherSlice.actions
export default weatherSlice.reducer
