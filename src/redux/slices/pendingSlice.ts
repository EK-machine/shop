/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PendingState } from '../../interfaces/intefaces';

const initialState: PendingState = {
  pending: [
    { id: 0, pending: false },
    { id: 1, pending: false },
    { id: 2, pending: false },
    { id: 3, pending: false },
    { id: 4, pending: false },
    { id: 5, pending: false },
    { id: 6, pending: false },
    { id: 7, pending: false },
    { id: 8, pending: false },
    { id: 9, pending: false },
    { id: 10, pending: false },
    { id: 11, pending: false },
    { id: 12, pending: false },
    { id: 13, pending: false },
    { id: 14, pending: false },
    { id: 15, pending: false },
    { id: 16, pending: false },
    { id: 17, pending: false },
    { id: 18, pending: false },
    { id: 19, pending: false },
    { id: 20, pending: false },
  ],
};

const pendingSlice = createSlice({
  name: 'pendingState',
  initialState,
  reducers: {
    setPendingTrue: (state, action: PayloadAction<{ id: number; pending: boolean }>) => {
      const newpendings = state.pending.map((item) => (item.id === action.payload.id ? action.payload : item));
      state.pending = newpendings;
    },
    setPendingFalse: (state) => {
      state.pending = initialState.pending;
    },
  },
});

export const { setPendingTrue, setPendingFalse } = pendingSlice.actions;

export default pendingSlice.reducer;
