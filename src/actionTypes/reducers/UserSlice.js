// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { username: '', },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    clearUser: (state) => {
      state.username = ''; // Set username to an empty string or null
    },
  },
});

export const { setUsername,clearUser } = userSlice.actions;
export default userSlice.reducer;
