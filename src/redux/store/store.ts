import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '../slices/commonStateSlice';
import userProfileReducer from '../slices/userProfileSlice';
import modalContentReducer from '../slices/modalContentSlice';
import allProductsReducer from '../slices/allProductsSlice';

const store = configureStore({
  reducer: {
    common: commonReducer,
    user: userProfileReducer,
    modal: modalContentReducer,
    products: allProductsReducer,
  },
});

export default store;
