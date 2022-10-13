/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorrsState } from 'Interfaces/intefaces';

const initialState: ErrorrsState = {
  errors: [],
  error: '',
};

const errorsSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
    setError: (state, action: PayloadAction<{ error: string; errors: string[] }>) => {
      state.errors = action.payload.errors;
      state.error = action.payload.error;
    },
    unsetAllErrors: (state) => {
      state.errors = initialState.errors;
      state.error = initialState.error;
    },
  },
});

export const { setErrors, setError, unsetAllErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
