/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from 'ReduxSlices/initialState';

const pendingSlice = createSlice({
  name: 'pendingState',
  initialState: initialState.pendingInitialState,
  reducers: {
    setPendingTrue: (state, action: PayloadAction<{ id: number; pending: boolean }>) => {
      const newpendings = state.pending.map((item) => (item.id === action.payload.id ? action.payload : item));
      state.pending = newpendings;
    },
    setPendingFalse: (state) => {
      state.pending = initialState.pendingInitialState.pending;
    },
  },
});

export const { setPendingTrue, setPendingFalse } = pendingSlice.actions;

export default pendingSlice.reducer;
