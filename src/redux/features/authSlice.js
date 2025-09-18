import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: [],
    currentUser: null,
    isLoggedIn: false
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload)
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload
      state.isLoggedIn = true
    },
    logoutUser: (state) => {
      state.currentUser = null
      state.isLoggedIn = false
    }
  }
})

export const { registerUser, loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer

