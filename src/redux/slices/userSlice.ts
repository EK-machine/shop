/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, UsersState } from '../../interfaces/intefaces';

const initialState: UsersState = {
  users: [],
  userError: '',
  createUserError: '',
  user: {} as UserProfile,
  userRequest: {} as UserProfile,
  avatarRequest: {} as { id: number; imgUrl: string },
  loginRequest: {} as { id: number; login: string },
  passwordRequest: {} as { id: number; password: string },
};

const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    getUsersRequest: (state) => {
      state.users = initialState.users;
    },
    getUsersSuccess: (state, action: PayloadAction<UserProfile[]>) => {
      state.users = action.payload;
    },
    getUsersFailed: (state, action: PayloadAction<string>) => {
      state.userError = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserProfile[]>) => {
      state.users = action.payload;
    },
    unsetUsers: (state) => {
      state.users = initialState.users;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.users = initialState.users;
      state.userError = initialState.userError;
      state.user = initialState.user;
    },
    createUserRequest: (state, action: PayloadAction<UserProfile>) => {
      state.userRequest = action.payload;
    },
    createUserSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.userRequest = initialState.userRequest;
      state.user = action.payload;
    },
    createUserFailed: (state, action: PayloadAction<string>) => {
      state.userRequest = initialState.userRequest;
      state.createUserError = action.payload;
    },
    setAvatarRequest: (state, action: PayloadAction<{ id: number; imgUrl: string }>) => {
      state.avatarRequest = action.payload;
    },
    setAvatarSuccess: (state, action: PayloadAction<{ imgUrl: string }>) => {
      state.user.imgUrl = action.payload.imgUrl;
    },
    setAvatarFailed: (state, action: PayloadAction<string>) => {
      state.userError = action.payload;
    },
    setLoginRequest: (state, action: PayloadAction<{ id: number; login: string }>) => {
      state.loginRequest = action.payload;
    },
    setLoginSuccess: (state, action: PayloadAction<{ login: string }>) => {
      state.user.login = action.payload.login;
    },
    setLoginFailed: (state, action: PayloadAction<string>) => {
      state.userError = action.payload;
    },
    setPasswordRequest: (state, action: PayloadAction<{ id: number; password: string }>) => {
      state.passwordRequest = action.payload;
    },
    setPasswordSuccess: (state, action: PayloadAction<{ password: string }>) => {
      state.user.password = action.payload.password;
    },
    setPasswordFailed: (state, action: PayloadAction<string>) => {
      state.userError = action.payload;
    },
  },
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailed,
  setUsers,
  unsetUsers,
  setUser,
  unsetUser,
  createUserRequest,
  createUserSuccess,
  createUserFailed,
  setAvatarRequest,
  setAvatarSuccess,
  setAvatarFailed,
  setLoginRequest,
  setLoginSuccess,
  setLoginFailed,
  setPasswordRequest,
  setPasswordSuccess,
  setPasswordFailed,
} = userSlice.actions;

export default userSlice.reducer;
