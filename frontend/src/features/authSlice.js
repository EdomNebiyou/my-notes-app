import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
    token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user=action.payload.user
      localStorage.setItem('user',JSON.stringify(action.payload.user))
      state.token=action.payload.token
      localStorage.setItem('token',JSON.stringify(action.payload.token))
    },
    logout: (state) => {
      state.user=null,
      localStorage.removeItem('user')
      state.token=null,
      localStorage.removeItem('token')
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
