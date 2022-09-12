/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  isOpen: false,
};

const modalContentSlice = createSlice({
  name: 'modalContentState',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
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
