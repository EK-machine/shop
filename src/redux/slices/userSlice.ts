/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, UsersState, UserCartItem, UserLikedItem, UserOrder } from '../../interfaces/intefaces';

const initialState: UsersState = {
  users: [],
  user: {} as UserProfile,
  userRequest: {} as UserProfile,
  avatarRequest: {} as { id: number; imgUrl: string },
  loginRequest: {} as { id: number; login: string },
  passwordRequest: {} as { id: number; password: string },
  addToCartRequest: {} as { id: number; cart: UserCartItem[] },
  deleteFromCartRequest: {} as { id: number; cart: UserCartItem[] },
  changeQuantityRequest: {} as { id: number; cart: UserCartItem[] },
  setLikeRequest: {} as { id: number; liked: UserLikedItem[] },
  unsetLikeRequest: {} as { id: number; liked: UserLikedItem[] },
  setOrderRequest: {} as { id: number; orders: UserOrder[] },
  deleteOrderRequest: {} as { id: number; orders: UserOrder[] },
  usersError: '',
  userError: '',
  createError: '',
  cartError: '',
  likedError: '',
  orderError: '',
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
    getUsersFailed: (state, action: PayloadAction<string>) => {
      state.usersError = action.payload;
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
      state.user.role = action.payload.role;
    },
    unsetUser: (state) => {
      state.users = initialState.users;
      state.usersError = initialState.userError;
      state.user = initialState.user;
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
      state.user.role = action.payload.role;
    },
    createUserFailed: (state, action: PayloadAction<string>) => {
      state.userRequest = initialState.userRequest;
      state.createError = action.payload;
    },
    setAvatarRequest: (state, action: PayloadAction<{ id: number; imgUrl: string }>) => {
      state.avatarRequest = action.payload;
    },
    setAvatarSuccess: (state, action: PayloadAction<{ imgUrl: string }>) => {
      state.avatarRequest = initialState.avatarRequest;
      state.user.imgUrl = action.payload.imgUrl;
    },
    setAvatarFailed: (state, action: PayloadAction<string>) => {
      state.avatarRequest = initialState.avatarRequest;
      state.userError = action.payload;
    },
    setLoginRequest: (state, action: PayloadAction<{ id: number; login: string }>) => {
      state.loginRequest = action.payload;
    },
    setLoginSuccess: (state, action: PayloadAction<{ login: string }>) => {
      state.loginRequest = initialState.loginRequest;
      state.user.login = action.payload.login;
    },
    setLoginFailed: (state, action: PayloadAction<string>) => {
      state.loginRequest = initialState.loginRequest;
      state.userError = action.payload;
    },
    setPasswordRequest: (state, action: PayloadAction<{ id: number; password: string }>) => {
      state.passwordRequest = action.payload;
    },
    setPasswordSuccess: (state, action: PayloadAction<{ password: string }>) => {
      state.passwordRequest = initialState.passwordRequest;
      state.user.password = action.payload.password;
    },
    setPasswordFailed: (state, action: PayloadAction<string>) => {
      state.passwordRequest = initialState.passwordRequest;
      state.userError = action.payload;
    },
    // cart
    addToCartRequest: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.addToCartRequest = action.payload;
    },
    addToCartSuccess: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.addToCartRequest = initialState.addToCartRequest;
      state.user.cart = action.payload.cart;
    },
    addToCartFailed: (state, action: PayloadAction<string>) => {
      state.addToCartRequest = initialState.addToCartRequest;
      state.cartError = action.payload;
    },
    deleteFromCartRequest: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.deleteFromCartRequest = action.payload;
    },
    deleterFromCartSuccess: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.deleteFromCartRequest = initialState.deleteFromCartRequest;
      state.user.cart = action.payload.cart;
    },
    deleterFromCartFailed: (state, action: PayloadAction<string>) => {
      state.deleteFromCartRequest = initialState.deleteFromCartRequest;
      state.cartError = action.payload;
    },
    changeQuantityRequest: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.changeQuantityRequest = action.payload;
    },
    changeQuantitySuccess: (state, action: PayloadAction<{ id: number; cart: UserCartItem[] }>) => {
      state.changeQuantityRequest = initialState.changeQuantityRequest;
      state.user.cart = action.payload.cart;
    },
    changeQuantityFailed: (state, action: PayloadAction<string>) => {
      state.changeQuantityRequest = initialState.changeQuantityRequest;
      state.cartError = action.payload;
    },
    // liked
    setLikeRequest: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[] }>) => {
      state.setLikeRequest = action.payload;
    },
    setLikeSuccess: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[] }>) => {
      state.setLikeRequest = initialState.setLikeRequest;
      state.user.liked = action.payload.liked;
    },
    setLikeFailed: (state, action: PayloadAction<string>) => {
      state.setLikeRequest = initialState.setLikeRequest;
      state.likedError = action.payload;
    },
    unsetLikeRequest: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[] }>) => {
      state.unsetLikeRequest = action.payload;
    },
    unsetLikeSuccess: (state, action: PayloadAction<{ id: number; liked: UserLikedItem[] }>) => {
      state.unsetLikeRequest = initialState.unsetLikeRequest;
      state.user.liked = action.payload.liked;
    },
    unsetLikeFailed: (state, action: PayloadAction<string>) => {
      state.unsetLikeRequest = initialState.unsetLikeRequest;
      state.likedError = action.payload;
    },
    // orders
    setOrderRequest: (state, action: PayloadAction<{ id: number; orders: UserOrder[] }>) => {
      state.setOrderRequest = action.payload;
    },
    setOrderSuccess: (state, action: PayloadAction<{ id: number; orders: UserOrder[] }>) => {
      state.setOrderRequest = initialState.setOrderRequest;
      state.user.orders = action.payload.orders;
      state.user.cart = initialState.usetCart;
    },
    setOrderFailed: (state, action: PayloadAction<string>) => {
      state.setLikeRequest = initialState.setLikeRequest;
      state.likedError = action.payload;
    },
    deleteOrderRequest: (state, action: PayloadAction<{ id: number; orders: UserOrder[] }>) => {
      state.deleteOrderRequest = action.payload;
    },
    deleteOrderSuccess: (state, action: PayloadAction<{ id: number; orders: UserOrder[] }>) => {
      state.deleteOrderRequest = initialState.setOrderRequest;
      state.user.orders = action.payload.orders;
    },
    deleteOrderFailed: (state, action: PayloadAction<string>) => {
      state.deleteOrderRequest = initialState.deleteOrderRequest;
      state.likedError = action.payload;
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
