import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const squtSlice = createSlice({
  name: 'squt',
  initialState,
  reducers: {
    plusCount: (state) => {
      state.count += 1;
    },
  },
});

export const { plusCount } = squtSlice.actions;

export default squtSlice.reducer;
