/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from 'Interfaces/intefaces';

const initialState: CommonState = {
  logged: false,
};

const commonStateSlice = createSlice({
  name: 'commonState',
  initialState,
  reducers: {
    isLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
  },
});

export const { isLogged } = commonStateSlice.actions;

export default commonStateSlice.reducer;
