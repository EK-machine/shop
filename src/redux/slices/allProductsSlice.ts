/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType, AllProductsState } from '../../interfaces/intefaces';

const initialState: AllProductsState = {
  products: [],
  product: {} as ProductType,
};

const allProductsSlice = createSlice({
  name: 'userProfileState',
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductType>) => {
      state.product = action.payload;
    },
  },
});

export const { setAllProducts, setProduct } = allProductsSlice.actions;

export default allProductsSlice.reducer;
