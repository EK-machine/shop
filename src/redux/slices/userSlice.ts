/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, UsersState, UserCartItem, UserLikedItem, UserOrder } from '../../interfaces/intefaces';

const initialState: UsersState = {
  users: [],
  user: {} as UserProfile,
  userRequest: {} as UserProfile,
  avatarRequest: {} as { id: number; imgUrl: string; prodId: number },
  loginRequest: {} as { id: number; login: string; prodId: number },
  passwordRequest: {} as { id: number; password: string; prodId: number },
  addToCartRequest: {} as { id: number; cart: UserCartItem[]; title: string; prodId: number },
  deleteFromCartRequest: {} as { id: number; cart: UserCartItem[]; title: string; prodId: number },
  changeQuantityRequest: {} as { id: number; cart: UserCartItem[] },
  setLikeRequest: {} as { id: number; liked: UserLikedItem[]; title: string },
  unsetLikeRequest: {} as { id: number; liked: UserLikedItem[]; title: string },
  setOrderRequest: {} as { id: number; orders: UserOrder[]; prodId: number },
  deleteOrderRequest: {} as { id: number; orders: UserOrder[]; prodId: number },
  usetCart: [],
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
    getUsersFailed: (state) => {
      state.users = initialState.users;
    },
    setUsers: (state, action: PayloadAction<UserProfile[]>) => {
      state.users = action.payload;
    },
    unsetUsers: (state) => {
      state.users = initialState.users;
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
      state.userRequest = initialState.userRequest;
      state.user.cart = action.payload.cart;
      state.user.id = action.payload.id;
      state.user.imgUrl = action.payload.imgUrl;
      state.user.liked = action.payload.liked;
      state.user.login = action.payload.login;
      state.user.orders = action.payload.orders;
      state.user.password = action.payload.password;
    },
    createUserFailed: (state) => {
      state.userRequest = initialState.userRequest;
    },
    setAvatarRequest: (state, action: PayloadAction<{ id: number; imgUrl: string; prodId: number }>) => {
      state.avatarRequest = action.payload;
    },
    setAvatarSuccess: (state, action: PayloadAction<{ imgUrl: string }>) => {
      state.avatarRequest = initialState.avatarRequest;
      state.user.imgUrl = action.payload.imgUrl;
    },
    setAvatarFailed: (state) => {
      state.avatarRequest = initialState.avatarRequest;
    },
    setLoginRequest: (state, action: PayloadAction<{ id: number; login: string; prodId: number }>) => {
      state.loginRequest = action.payload;
    },
    setLoginSuccess: (state, action: PayloadAction<{ login: string }>) => {
      state.loginRequest = initialState.loginRequest;
      state.user.login = action.payload.login;
    },
    setLoginFailed: (state) => {
      state.loginRequest = initialState.loginRequest;
    },
    setPasswordRequest: (state, action: PayloadAction<{ id: number; password: string; prodId: number }>) => {
      state.passwordRequest = action.payload;
    },
    setPasswordSuccess: (state, action: PayloadAction<{ password: string }>) => {
      state.passwordRequest = initialState.passwordRequest;
      state.user.password = action.payload.password;
    },
    setPasswordFailed: (state) => {
      state.passwordRequest = initialState.passwordRequest;
    },
    // cart
    addToCartRequest: (
      state,
      action: PayloadAction<{ id: number; cart: UserCartItem[]; title: string; prodId: number }>,
    ) => {
      state.addToCartRequest = action.payload;
    },
    addToCartSuccess: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.addToCartRequest = initialState.addToCartRequest;
      state.user.cart = action.payload.cart;
    },
    addToCartFailed: (state) => {
      state.addToCartRequest = initialState.addToCartRequest;
    },
    deleteFromCartRequest: (
      state,
      action: PayloadAction<{ id: number; cart: UserCartItem[]; title: string; prodId: number }>,
    ) => {
      state.deleteFromCartRequest = action.payload;
    },
    deleterFromCartSuccess: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.deleteFromCartRequest = initialState.deleteFromCartRequest;
      state.user.cart = action.payload.cart;
    },
    deleterFromCartFailed: (state) => {
      state.deleteFromCartRequest = initialState.deleteFromCartRequest;
    },
    changeQuantityRequest: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.changeQuantityRequest = action.payload;
    },
    changeQuantitySuccess: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.changeQuantityRequest = initialState.changeQuantityRequest;
      state.user.cart = action.payload.cart;
    },
    changeQuantityFailed: (state) => {
      state.changeQuantityRequest = initialState.changeQuantityRequest;
    },
    // liked
    setLikeRequest: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[]; title: string }>) => {
      state.setLikeRequest = action.payload;
    },
    setLikeSuccess: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[] }>) => {
      state.setLikeRequest = initialState.setLikeRequest;
      state.user.liked = action.payload.liked;
    },
    setLikeFailed: (state) => {
      state.setLikeRequest = initialState.setLikeRequest;
    },
    unsetLikeRequest: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[]; title: string }>) => {
      state.unsetLikeRequest = action.payload;
    },
    unsetLikeSuccess: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[] }>) => {
      state.unsetLikeRequest = initialState.unsetLikeRequest;
      state.user.liked = action.payload.liked;
    },
    unsetLikeFailed: (state) => {
      state.unsetLikeRequest = initialState.unsetLikeRequest;
    },
    // orders
    setOrderRequest: (state, action: PayloadAction<{ id: number; orders: UserOrder[]; prodId: number }>) => {
      state.setOrderRequest = action.payload;
    },
    setOrderSuccess: (state, action: PayloadAction<{ id: number; orders: UserOrder[] }>) => {
      state.setOrderRequest = initialState.setOrderRequest;
      state.user.orders = action.payload.orders;
      state.user.cart = initialState.usetCart;
    },
    setOrderFailed: (state) => {
      state.setLikeRequest = initialState.setLikeRequest;
    },
    deleteOrderRequest: (state, action: PayloadAction<{ id: number; orders: UserOrder[]; prodId: number }>) => {
      state.deleteOrderRequest = action.payload;
    },
    deleteOrderSuccess: (state, action: PayloadAction<{ id: number; orders: UserOrder[] }>) => {
      state.deleteOrderRequest = initialState.setOrderRequest;
      state.user.orders = action.payload.orders;
    },
    deleteOrderFailed: (state) => {
      state.deleteOrderRequest = initialState.deleteOrderRequest;
    },
    unsetUser: (state) => {
      state.users = initialState.users;
      state.user = initialState.user;
      state.userRequest = initialState.userRequest;
      state.avatarRequest = initialState.avatarRequest;
      state.loginRequest = initialState.loginRequest;
      state.passwordRequest = initialState.passwordRequest;
      state.addToCartRequest = initialState.addToCartRequest;
      state.deleteFromCartRequest = initialState.deleteFromCartRequest;
      state.changeQuantityRequest = initialState.changeQuantityRequest;
      state.setLikeRequest = initialState.unsetLikeRequest;
      state.unsetLikeRequest = initialState.unsetLikeRequest;
      state.setOrderRequest = initialState.setOrderRequest;
      state.deleteOrderRequest = initialState.deleteOrderRequest;
      state.usetCart = initialState.usetCart;
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
