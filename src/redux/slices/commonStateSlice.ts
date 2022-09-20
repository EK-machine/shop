/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from '../../interfaces/intefaces';

const initialState: CommonState = {
  loading: false,
  logged: false,
};

const commonStateSlice = createSlice({
  name: 'commonState',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    isLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
  },
});

export const { isLoading, isLogged } = commonStateSlice.actions;

export default commonStateSlice.reducer;
