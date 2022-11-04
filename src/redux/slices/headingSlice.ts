/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from 'ReduxSlices/initialState';

const headingSlice = createSlice({
  name: 'headingState',
  initialState: initialState.headingInitialState,
  reducers: {
    setHeading: (state, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
    setProductsHeading: (state, action: PayloadAction<{ category: string; query: string }>) => {
      const head = `${action.payload.category} products containing: ${action.payload.query}`;
      state.heading = head;
    },
  },
});

export const { setHeading, setProductsHeading } = headingSlice.actions;

export default headingSlice.reducer;
