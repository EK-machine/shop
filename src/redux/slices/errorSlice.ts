/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from 'ReduxSlices/initialState';

const errorsSlice = createSlice({
  name: 'userState',
  initialState: initialState.errorInitialState,
  reducers: {
    setErrors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
    setError: (state, action: PayloadAction<{ error: string; errors: string[] }>) => {
      state.errors = action.payload.errors;
      state.error = action.payload.error;
    },
    unsetAllErrors: (state) => {
      state.errors = initialState.errorInitialState.errors;
      state.error = initialState.errorInitialState.error;
    },
  },
});

export const { setErrors, setError, unsetAllErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
