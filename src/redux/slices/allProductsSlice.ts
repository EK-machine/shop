/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, AllProductsState } from '../../interfaces/intefaces';

const initialState: AllProductsState = {
  productsRequest: [],
  products: [],
  displayProducts: [],
  debounceProductsRequest: '',
  productsError: '',
  product: {} as ProductType,
};

const allProductsSlice = createSlice({
  name: 'userProfileState',
  initialState,
  reducers: {
    allProductsRequest: (state) => {
      state.productsRequest = initialState.productsRequest;
    },
    setAllProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.productsRequest = initialState.productsRequest;
      state.products = action.payload;
      state.displayProducts = action.payload;
    },
    allProductsFailed: (state, action: PayloadAction<string>) => {
      state.productsRequest = initialState.productsRequest;
      state.productsError = action.payload;
    },
    debounceProductsRequest: (state, action: PayloadAction<string>) => {
      state.debounceProductsRequest = action.payload;
    },
    debounceProductsSuccess: (state, action: PayloadAction<ProductType[]>) => {
      state.debounceProductsRequest = initialState.debounceProductsRequest;
      state.displayProducts = action.payload;
    },
    debounceProductsFailed: (state, action: PayloadAction<string>) => {
      state.debounceProductsRequest = initialState.debounceProductsRequest;
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
