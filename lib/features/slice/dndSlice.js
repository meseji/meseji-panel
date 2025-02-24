import { createSlice } from '@reduxjs/toolkit';

export const dndSlice = createSlice({
  name: 'dnd',
  initialState: {
    type: null, // Stores the type of the node being dragged
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setType } = dndSlice.actions;
export default dndSlice.reducer;
