/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../interfaces/intefaces';

const initialState: {
  users: UserProfile[];
  usersMessage: string;
  query: string;
  user: UserProfile;
  message: string;
} = {
  users: [],
  usersMessage: '',
  query: '',
  user: {} as UserProfile,
  message: '',
};

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    getUserRequest: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    getUserSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    getUserFailed: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    unsetUser: (state) => {
      state.query = initialState.query;
      state.user = initialState.user;
      state.message = initialState.message;
    },
  },
});

export const { getUserRequest, getUserSuccess, getUserFailed, unsetUser } = userSlice.actions;

export default userSlice.reducer;
