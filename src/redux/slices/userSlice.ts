/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, usersState } from '../../interfaces/intefaces';

const initialState: usersState = {
  users: [],
  userError: '',
  createUserError: '',
  user: {
    login: '',
    password: '',
    role: '',
    id: 0,
    imgUrl: '',
    cart: [],
    orders: [],
    liked: [],
  },
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
    setUserLogin: (state, action: PayloadAction<string>) => {
      state.user.login = action.payload;
    },
    setUserPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    setUserAvatar: (state, action: PayloadAction<string>) => {
      state.user.imgUrl = action.payload;
    },
    unsetUser: (state) => {
      state.users = initialState.users;
      state.userError = initialState.userError;
      state.user = initialState.user;
    },
    createUserRequest: (state) => {
      state.users = initialState.users;
    },
    createUserSuccess: (state, action: PayloadAction<{ users: UserProfile[]; newUser: UserProfile }>) => {
      state.users = action.payload.users;
      state.user = action.payload.newUser;
    },
    createUserFailed: (state, action: PayloadAction<string>) => {
      state.createUserError = action.payload;
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
  setUserLogin,
  setUserPassword,
  setUserAvatar,
  unsetUser,
  createUserRequest,
  createUserSuccess,
  createUserFailed,
} = userSlice.actions;

export default userSlice.reducer;
