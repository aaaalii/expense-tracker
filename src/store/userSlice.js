import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  password: '',
  auth: false,
  currency: 'Rs',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { username, password, auth, currency } = action.payload;
      if (username !== undefined) state.username = username;
      if (password !== undefined) state.password = password;
      if (auth !== undefined) state.auth = auth;
      if (currency !== undefined) state.currency = currency;
    },
    resetUser: (state, action) => {
      state.username = '';
      state.password = '';
      state.auth = false;
      state.currency = 'Rs';
    }
  },
})

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;