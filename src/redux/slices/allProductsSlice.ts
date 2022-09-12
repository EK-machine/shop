/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../interface/intefaces';

const initialState = {
  products: [
    {
      id: 0,
      title: '',
      price: 0,
      category: '',
      description: '',
      image: '',
      rating: {
        rate: 0,
        count: 0,
      },
    },
  ],
  product: {
    id: 0,
    title: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  },
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
