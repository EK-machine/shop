/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: '',
  password: '',
  role: '',
  id: 0,
};

const userProfileSlice = createSlice({
  name: 'userProfileState',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.login = action.payload;
      state.password = action.payload;
      state.role = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setLogin, setPassword, setRole, getUser } = userProfileSlice.actions;

export default userProfileSlice.reducer;
