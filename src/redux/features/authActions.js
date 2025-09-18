import { loginUser, logoutUser } from './authSlice'

// validation logic
export const validateLogin = (mobile, mpin) => async (dispatch, getState) => {
  const { users } = getState().auth
  const user = users.find(person => person.mobile === mobile && person.mpin === mpin)

  if (user) {
    dispatch(loginUser(user))
    return { success: true, message: 'Login successful!' }
  }
  return { success: false, message: 'Invalid credentials!' }
}

export const performLogout = () => async (dispatch) => {
  dispatch(logoutUser())
  return { success: true }
}
