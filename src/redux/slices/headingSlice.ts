/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  heading: '',
};

const headingSlice = createSlice({
  name: 'headingState',
  initialState,
  reducers: {
    setHeading: (state, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
  },
});

export const { setHeading } = headingSlice.actions;

export default headingSlice.reducer;
