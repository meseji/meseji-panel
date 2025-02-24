'useclient'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
