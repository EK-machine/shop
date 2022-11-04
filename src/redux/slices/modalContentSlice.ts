/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from 'ReduxSlices/initialState';

const modalContentSlice = createSlice({
  name: 'modalContentState',
  initialState: initialState.modalInitialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setModalLogin: (state) => {
      state.content = 'login';
    },
    setModalRegister: (state) => {
      state.content = 'register';
    },
    setModalProduct: (state) => {
      state.content = 'product';
    },
  },
});

export const { setModalLogin, setModalRegister, setModalProduct, setModalOpen } = modalContentSlice.actions;

export default modalContentSlice.reducer;
