/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  logged: false,
};

const commonStateSlice = createSlice({
  name: 'commonState',
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.loading = action.payload;
    },
    isLogged: (state, action) => {
      state.logged = action.payload;
    },
  },
});

export const { isLoading, isLogged } = commonStateSlice.actions;

export default commonStateSlice.reducer;
