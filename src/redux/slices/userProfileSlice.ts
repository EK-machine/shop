/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../interfaces/intefaces';

const initialState = {
  login: '',
  password: '',
  role: '',
  id: 0,
  imgUrl: '',
  cart: [],
  orders: [],
  liked: [],
};

const userProfileSlice = createSlice({
  name: 'userProfileState',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.imgUrl = action.payload.imgUrl;
      state.cart = action.payload.cart as [];
      state.orders = action.payload.orders as [];
      state.liked = action.payload.liked as [];
    },
    unsetUser: (state) => {
      state.login = initialState.login;
      state.password = initialState.password;
      state.role = initialState.role;
      state.id = initialState.id;
      state.imgUrl = initialState.imgUrl;
      state.cart = initialState.cart;
      state.orders = initialState.orders;
      state.liked = initialState.liked;
    },
    setLogin: (state, action: PayloadAction<UserProfile>) => {
      state.login = action.payload.login;
    },
    setPassword: (state, action: PayloadAction<UserProfile>) => {
      state.password = action.payload.password;
    },
    setRole: (state, action: PayloadAction<UserProfile>) => {
      state.role = action.payload.role;
    },
    setId: (state, action: PayloadAction<UserProfile>) => {
      state.id = action.payload.id;
    },
    setImgUrl: (state, action: PayloadAction<UserProfile>) => {
      state.imgUrl = action.payload.imgUrl;
    },
    setCart: (state, action: PayloadAction<UserProfile>) => {
      state.cart = action.payload.cart as [];
    },
    setOrders: (state, action: PayloadAction<UserProfile>) => {
      state.orders = action.payload.orders as [];
    },
    setLiked: (state, action: PayloadAction<UserProfile>) => {
      state.liked = action.payload.liked as [];
    },
  },
});

export const { setUser, unsetUser, setLogin, setPassword, setRole, setId, setImgUrl, setCart, setOrders, setLiked } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
