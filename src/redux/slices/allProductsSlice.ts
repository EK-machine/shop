/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from 'Interfaces/intefaces';
import initialState from 'ReduxSlices/initialState';

const allProductsSlice = createSlice({
  name: 'userProfileState',
  initialState: initialState.allProductsInitialState,
  reducers: {
    allProductsRequest: (state) => {
      state.productsRequest = initialState.allProductsInitialState.productsRequest;
    },
    setAllProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.productsRequest = initialState.allProductsInitialState.productsRequest;
      state.products = action.payload;
      state.displayProducts = action.payload;
    },
    allProductsFailed: (state, action: PayloadAction<string>) => {
      state.productsRequest = initialState.allProductsInitialState.productsRequest;
      state.productsError = action.payload;
    },
    debounceProductsRequest: (state, action: PayloadAction<string>) => {
      state.debounceProductsRequest = action.payload;
    },
    debounceProductsSuccess: (state, action: PayloadAction<ProductType[]>) => {
      state.debounceProductsRequest = initialState.allProductsInitialState.debounceProductsRequest;
      state.displayProducts = action.payload;
    },
    debounceProductsFailed: (state, action: PayloadAction<string>) => {
      state.debounceProductsRequest = initialState.allProductsInitialState.debounceProductsRequest;
      state.productsError = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductType>) => {
      state.product = action.payload;
    },
  },
});

export const {
  allProductsRequest,
  setAllProducts,
  allProductsFailed,
  debounceProductsRequest,
  debounceProductsSuccess,
  debounceProductsFailed,
  setProduct,
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
