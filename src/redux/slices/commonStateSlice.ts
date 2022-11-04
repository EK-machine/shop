/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from 'ReduxSlices/initialState';

const commonStateSlice = createSlice({
  name: 'commonState',
  initialState: initialState.commonInitialState,
  reducers: {
    isLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
  },
});

export const { isLogged } = commonStateSlice.actions;

export default commonStateSlice.reducer;
