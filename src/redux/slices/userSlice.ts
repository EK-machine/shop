/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, UserCartItem, UserLikedItem, UserOrder } from 'Interfaces/intefaces';
import initialState from 'ReduxSlices/initialState';

const userSlice = createSlice({
  name: 'userState',
  initialState: initialState.userInitialState,
  reducers: {
    getUsersRequest: (state) => {
      state.users = initialState.userInitialState.users;
    },
    getUsersSuccess: (state, action: PayloadAction<UserProfile[]>) => {
      state.users = action.payload;
    },
    getUsersFailed: (state) => {
      state.users = initialState.userInitialState.users;
    },
    setUsers: (state, action: PayloadAction<UserProfile[]>) => {
      state.users = action.payload;
    },
    unsetUsers: (state) => {
      state.users = initialState.userInitialState.users;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user.cart = action.payload.cart;
      state.user.id = action.payload.id;
      state.user.imgUrl = action.payload.imgUrl;
      state.user.liked = action.payload.liked;
      state.user.login = action.payload.login;
      state.user.orders = action.payload.orders;
      state.user.password = action.payload.password;
    },
    createUserRequest: (state, action: PayloadAction<UserProfile>) => {
      state.userRequest = action.payload;
    },
    createUserSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.userRequest = initialState.userInitialState.userRequest;
      state.user.cart = action.payload.cart;
      state.user.id = action.payload.id;
      state.user.imgUrl = action.payload.imgUrl;
      state.user.liked = action.payload.liked;
      state.user.login = action.payload.login;
      state.user.orders = action.payload.orders;
      state.user.password = action.payload.password;
    },
    createUserFailed: (state) => {
      state.userRequest = initialState.userInitialState.userRequest;
    },
    setAvatarRequest: (state, action: PayloadAction<{ id: number; imgUrl: string; prodId: number }>) => {
      state.avatarRequest = action.payload;
    },
    setAvatarSuccess: (state, action: PayloadAction<{ imgUrl: string }>) => {
      state.avatarRequest = initialState.userInitialState.avatarRequest;
      state.user.imgUrl = action.payload.imgUrl;
    },
    setAvatarFailed: (state) => {
      state.avatarRequest = initialState.userInitialState.avatarRequest;
    },
    setLoginRequest: (state, action: PayloadAction<{ id: number; login: string; prodId: number }>) => {
      state.loginRequest = action.payload;
    },
    setLoginSuccess: (state, action: PayloadAction<{ login: string }>) => {
      state.loginRequest = initialState.userInitialState.loginRequest;
      state.user.login = action.payload.login;
    },
    setLoginFailed: (state) => {
      state.loginRequest = initialState.userInitialState.loginRequest;
    },
    setPasswordRequest: (state, action: PayloadAction<{ id: number; password: string; prodId: number }>) => {
      state.passwordRequest = action.payload;
    },
    setPasswordSuccess: (state, action: PayloadAction<{ password: string }>) => {
      state.passwordRequest = initialState.userInitialState.passwordRequest;
      state.user.password = action.payload.password;
    },
    setPasswordFailed: (state) => {
      state.passwordRequest = initialState.userInitialState.passwordRequest;
    },
    // cart
    addToCartRequest: (
      state,
      action: PayloadAction<{ id: number; cart: UserCartItem[]; title: string; prodId: number }>,
    ) => {
      state.addToCartRequest = action.payload;
    },
    addToCartSuccess: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.addToCartRequest = initialState.userInitialState.addToCartRequest;
      state.user.cart = action.payload.cart;
    },
    addToCartFailed: (state) => {
      state.addToCartRequest = initialState.userInitialState.addToCartRequest;
    },
    deleteFromCartRequest: (
      state,
      action: PayloadAction<{ id: number; cart: UserCartItem[]; title: string; prodId: number }>,
    ) => {
      state.deleteFromCartRequest = action.payload;
    },
    deleterFromCartSuccess: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.deleteFromCartRequest = initialState.userInitialState.deleteFromCartRequest;
      state.user.cart = action.payload.cart;
    },
    deleterFromCartFailed: (state) => {
      state.deleteFromCartRequest = initialState.userInitialState.deleteFromCartRequest;
    },
    changeQuantityRequest: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.changeQuantityRequest = action.payload;
    },
    changeQuantitySuccess: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.changeQuantityRequest = initialState.userInitialState.changeQuantityRequest;
      state.user.cart = action.payload.cart;
    },
    changeQuantityFailed: (state) => {
      state.changeQuantityRequest = initialState.userInitialState.changeQuantityRequest;
    },
    // liked
    setLikeRequest: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[]; title: string }>) => {
      state.setLikeRequest = action.payload;
    },
    setLikeSuccess: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[] }>) => {
      state.setLikeRequest = initialState.userInitialState.setLikeRequest;
      state.user.liked = action.payload.liked;
    },
    setLikeFailed: (state) => {
      state.setLikeRequest = initialState.userInitialState.setLikeRequest;
    },
    unsetLikeRequest: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[]; title: string }>) => {
      state.unsetLikeRequest = action.payload;
    },
    unsetLikeSuccess: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[] }>) => {
      state.unsetLikeRequest = initialState.userInitialState.unsetLikeRequest;
      state.user.liked = action.payload.liked;
    },
    unsetLikeFailed: (state) => {
      state.unsetLikeRequest = initialState.userInitialState.unsetLikeRequest;
    },
    // orders
    setOrderRequest: (state, action: PayloadAction<{ id: number; orders: UserOrder[]; prodId: number }>) => {
      state.setOrderRequest = action.payload;
    },
    setOrderSuccess: (state, action: PayloadAction<{ id: number; orders: UserOrder[] }>) => {
      state.setOrderRequest = initialState.userInitialState.setOrderRequest;
      state.user.orders = action.payload.orders;
      state.user.cart = initialState.userInitialState.usetCart;
    },
    setOrderFailed: (state) => {
      state.setLikeRequest = initialState.userInitialState.setLikeRequest;
    },
    deleteOrderRequest: (state, action: PayloadAction<{ id: number; orders: UserOrder[]; prodId: number }>) => {
      state.deleteOrderRequest = action.payload;
    },
    deleteOrderSuccess: (state, action: PayloadAction<{ id: number; orders: UserOrder[] }>) => {
      state.deleteOrderRequest = initialState.userInitialState.setOrderRequest;
      state.user.orders = action.payload.orders;
    },
    deleteOrderFailed: (state) => {
      state.deleteOrderRequest = initialState.userInitialState.deleteOrderRequest;
    },
    unsetUser: (state) => {
      state.users = initialState.userInitialState.users;
      state.user = initialState.userInitialState.user;
      state.userRequest = initialState.userInitialState.userRequest;
      state.avatarRequest = initialState.userInitialState.avatarRequest;
      state.loginRequest = initialState.userInitialState.loginRequest;
      state.passwordRequest = initialState.userInitialState.passwordRequest;
      state.addToCartRequest = initialState.userInitialState.addToCartRequest;
      state.deleteFromCartRequest = initialState.userInitialState.deleteFromCartRequest;
      state.changeQuantityRequest = initialState.userInitialState.changeQuantityRequest;
      state.setLikeRequest = initialState.userInitialState.unsetLikeRequest;
      state.unsetLikeRequest = initialState.userInitialState.unsetLikeRequest;
      state.setOrderRequest = initialState.userInitialState.setOrderRequest;
      state.deleteOrderRequest = initialState.userInitialState.deleteOrderRequest;
      state.usetCart = initialState.userInitialState.usetCart;
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
  // cart
  addToCartRequest,
  addToCartSuccess,
  addToCartFailed,
  deleteFromCartRequest,
  deleterFromCartSuccess,
  deleterFromCartFailed,
  changeQuantityRequest,
  changeQuantitySuccess,
  changeQuantityFailed,
  // liked
  setLikeRequest,
  setLikeSuccess,
  setLikeFailed,
  unsetLikeRequest,
  unsetLikeSuccess,
  unsetLikeFailed,
  // orders
  setOrderRequest,
  setOrderSuccess,
  setOrderFailed,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailed,
} = userSlice.actions;

export default userSlice.reducer;
